export const BigDataBlog2Meta = {
  title: "Running Apache Hudi on AWS Glue 5.0: Lessons from Production",
  description: "How I used Apache Hudi on AWS Glue 5.0 to solve incremental upserts, schema evolution, and partitioning in a real-world S3 data lake. Practical configs and hard-won lessons included.",
  date: "2024-06-01",
  readTime: "7 min read",
  tags: ["Apache Hudi", "AWS Glue", "Big Data", "ETL", "S3"],
};

export default function BigDataBlog2() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2e] to-[#23284a] py-12">
      <div className="w-full max-w-5xl bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl shadow-xl p-10 text-zinc-100 font-sans text-lg leading-relaxed space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
          Running Apache Hudi on AWS Glue 5.0: Lessons from Production
        </h1>
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">💡 Why I Chose Apache Hudi</h2>
        <p>
          We had a practical problem: records created months ago were being updated in our MongoDB-based source system. These were production events, sometimes months old, that needed to be efficiently updated in our S3 data lake.
        </p>
        <p>
          Our existing approach was crude — we would delete partitions by date and rewrite the entire partition if any record changed. This was:
        </p>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>Inefficient (rewriting thousands of records for one change)</li>
          <li>Expensive (S3 I/O and Glue compute)</li>
          <li>Fragile (error-prone and not scalable)</li>
        </ul>
        <p>
          I needed a mature, incremental processing layer — one that could track individual records, apply updates intelligently, and avoid reprocessing the entire dataset. That led me to Apache Hudi.
        </p>
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">🛠 Why Glue 5.0?</h2>
        <p>
          Glue 4.0 had limited support for many Hudi options — notably around catalog integration, serializer setup, and schema reconciliation. After experimentation, I upgraded to AWS Glue 5.0, which comes with:
        </p>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>Apache Spark 3.4.1</li>
          <li>Python 3.10</li>
          <li>Better support for Hudi's COPY_ON_WRITE operations</li>
          <li>Reliable serializer setup via KryoSerializer and HoodieSparkKryoRegistrar</li>
        </ul>
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">🧠 Key Hudi Configuration Decisions (and Why They Matter)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-blue-400/20 mb-4">
            <thead>
              <tr className="bg-blue-900/60 text-blue-200">
                <th className="px-3 py-2 border-b border-blue-400/20">Configuration Key</th>
                <th className="px-3 py-2 border-b border-blue-400/20">My Choice</th>
                <th className="px-3 py-2 border-b border-blue-400/20">Why I Chose It</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-3 py-2">hoodie.table.name</td><td className="px-3 py-2">hudi_events_table</td><td className="px-3 py-2">Clear and descriptive</td></tr>
              <tr><td className="px-3 py-2">hoodie.datasource.write.recordkey.field</td><td className="px-3 py-2">event_id</td><td className="px-3 py-2">Uniquely identifies each row (previously _id)</td></tr>
              <tr><td className="px-3 py-2">hoodie.datasource.write.precombine.field</td><td className="px-3 py-2">updated_at</td><td className="px-3 py-2">Ensures latest version of the record is kept</td></tr>
              <tr><td className="px-3 py-2">hoodie.datasource.write.operation</td><td className="px-3 py-2">upsert</td><td className="px-3 py-2">Allows partial updates instead of rewriting everything</td></tr>
              <tr><td className="px-3 py-2">hoodie.datasource.write.table.type</td><td className="px-3 py-2">COPY_ON_WRITE</td><td className="px-3 py-2">Athena-friendly; better read performance</td></tr>
              <tr><td className="px-3 py-2">hoodie.cleaner.policy</td><td className="px-3 py-2">KEEP_LATEST_FILE_VERSIONS</td><td className="px-3 py-2">Avoids duplication from repeated writes (learned this the hard way!)</td></tr>
              <tr><td className="px-3 py-2">hoodie.datasource.write.reconcile.schema</td><td className="px-3 py-2">true</td><td className="px-3 py-2">Schema evolution: allows new fields without rewriting existing partitions</td></tr>
              <tr><td className="px-3 py-2">hoodie.datasource.write.partitionpath.field</td><td className="px-3 py-2">partition_date</td><td className="px-3 py-2">Optimized for Athena + minimizes files scanned for queries and updates</td></tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">⚙️ Representative Script (Generalized)</h2>
        <p>Here’s a simplified and generalized version of the script I deployed using Glue 5.0:</p>
        <pre className="bg-zinc-900 rounded p-4 text-base overflow-x-auto text-blue-200 mb-4"><code>{`from pyspark import SparkConf
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
from pyspark.sql.functions import col, to_date

# Configure Hudi with necessary Spark extensions
conf = SparkConf()
conf.set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
conf.set("spark.kryo.registrator", "org.apache.spark.HoodieSparkKryoRegistrar")
conf.set("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.hudi.catalog.HoodieCatalog")
conf.set("spark.sql.extensions", "org.apache.spark.sql.hudi.HoodieSparkSessionExtension")

sc = SparkContext.getOrCreate(conf=conf)
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)

# Load data (from S3 in JSON format)
original_df = glueContext.create_dynamic_frame.from_options(
    connection_type="s3",
    format="json",
    connection_options={"paths": ["s3://your-bucket/path/"], "recurse": True}
).toDF()

# Add partition column
df = original_df.withColumn("partition_date", to_date("createdat"))

# Configure Hudi options
hudi_options = {
    "hoodie.table.name": "hudi_events_table",
    "hoodie.datasource.write.recordkey.field": "event_id",
    "hoodie.datasource.write.precombine.field": "updated_at",
    "hoodie.datasource.write.operation": "upsert",
    "hoodie.datasource.write.table.type": "COPY_ON_WRITE",
    "hoodie.datasource.write.payload.class": "org.apache.hudi.common.model.OverwriteWithLatestAvroPayload",
    "hoodie.datasource.write.reconcile.schema": "true",
    "hoodie.write.set.null.for.missing.columns": "true",
    "hoodie.clean.automatic": "true",
    "hoodie.clean.async": "false",
    "hoodie.cleaner.policy": "KEEP_LATEST_FILE_VERSIONS",
    "hoodie.cleaner.fileversions.retained": "1",
    "hoodie.cleaner.parallelism": "20",
    "hoodie.datasource.write.partitionpath.field": "partition_date",
    "hoodie.datasource.write.keygenerator.class": "org.apache.hudi.keygen.SimpleKeyGenerator",
    "path": "s3a://your-bucket/hudi/events"
}

# Perform the upsert
df.write.format("hudi") \
    .options(**hudi_options) \
    .mode("append") \
    .save()`}</code></pre>
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">🔍 Lessons Learned (The Hard Way)</h2>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>Re-running the script caused duplication: Until I enabled KEEP_LATEST_FILE_VERSIONS in the cleaner config, each run duplicated the files due to COPY_ON_WRITE behavior.</li>
          <li>Precombine field is not optional: I initially assumed upsert would always apply the newer data — turns out, Hudi uses the precombine field to determine recency. If two records have the same key and the same timestamp, the result is nondeterministic.</li>
          <li>Schema evolution works — but only if configured: Without reconcile.schema, I got cryptic errors when a new column appeared.</li>
          <li>Partitioning is a superpower: By partitioning on createdat (as partition_date), I ensured only relevant partitions were scanned and written — massively reducing IO.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">🚀 Conclusion</h2>
        <p>
          Getting Hudi working on Glue 5.0 wasn’t just about plugging in the right API — it required:
        </p>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>Deep understanding of incremental data patterns</li>
          <li>Experimentation with partitioning and cleaner policies</li>
          <li>Reading between the lines of documentation and Spark error logs</li>
        </ul>
        <p>
          This post is not just about using Hudi — it’s about how to think when you’re engineering large-scale data pipelines.
        </p>
        <p>
          If you're evaluating Hudi for your lakehouse needs — especially on Glue — I hope this guide gives you a head start that I didn’t have.
        </p>
      </div>
    </div>
  );
}