export const BigDataBlog1Meta = {
  title: "Solving Schema Drift in AWS Glue Using Glue Catalog Schema",
  description: "How to fix missing fields and schema drift in AWS Glue jobs by leveraging the Glue Catalog schema. A practical solution for robust, production-grade ETL.",
  date: "2024-06-01",
  readTime: "5 min read",
  tags: ["AWS Glue", "Big Data", "ETL", "Schema Drift", "Spark"],
};

export default function BigDataBlog1() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2e] to-[#23284a] py-12">
      <div className="w-full max-w-5xl bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl shadow-xl p-10 text-zinc-100 font-sans text-lg leading-relaxed space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
          Solving Schema Drift in AWS Glue Using Glue Catalog Schema
        </h1>
        <p>
          While working on one of our daily message log pipelines in AWS Glue, I ran into a frustrating but common issue: <span className="font-semibold text-blue-300">missing fields causing Spark jobs to fail.</span>
        </p>
        <p>
          This is a blog about how I fixed it using an option that's rarely talked about — <span className="bg-zinc-800 px-1 rounded text-blue-300">useCatalogSchema</span>. If you're dealing with inconsistent data and want to avoid brittle workarounds, this might help.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">The Problem</h2>
        <p>
          Our Glue job processes logs stored in S3. It's a daily batch pipeline, so every day a new file lands.
        </p>
        <p>
          Now, here's the tricky part:
        </p>
        <blockquote className="border-l-4 border-blue-400 pl-4 italic text-blue-200">Some days, a certain field like <span className="bg-zinc-800 px-1 rounded text-blue-300">readings</span> might be completely missing from the data.</blockquote>
        <p>
          And when that happens, Spark just doesn't include that column in the schema. So if your script has a line like <span className="bg-zinc-800 px-1 rounded text-blue-300">col("readings")</span>, it blows up with a column-not-found error.
        </p>
        <p>I had two bad options:</p>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>Manually check every field before referencing it</li>
          <li>Wrap everything in <span className="bg-zinc-800 px-1 rounded text-blue-300">try</span>/<span className="bg-zinc-800 px-1 rounded text-blue-300">except</span> blocks</li>
        </ul>
        <p>Both are clunky and error-prone.</p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">What I Wanted</h2>
        <p>
          What I really wanted was this:
        </p>
        <blockquote className="border-l-4 border-blue-400 pl-4 italic text-blue-200">Use the schema I already have defined in the AWS Glue Data Catalog.</blockquote>
        <p>This would solve everything:</p>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>Always have a consistent schema</li>
          <li>Missing fields just show up as <span className="bg-zinc-800 px-1 rounded text-blue-300">null</span></li>
          <li>No need to touch the script when data shape changes</li>
        </ul>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">The Solution</h2>
        <p>
          After a lot of searching and reading, I finally found the answer. You can tell Glue to use the catalog schema when creating a Spark DataFrame:
        </p>
        <pre className="bg-zinc-900 rounded p-4 text-base overflow-x-auto text-blue-200 mb-4"><code>{`df = glueContext.create_data_frame.from_catalog(
    database="your_database",
    table_name="your_table",
    transformation_ctx="your_context",
    additional_options={
        "useSparkDataSource": True,
        "useCatalogSchema": True
    }
)`}</code></pre>
        <p>The magic is in:</p>
        <pre className="bg-zinc-900 rounded p-4 text-base overflow-x-auto text-blue-200 mb-4"><code>{`"useCatalogSchema": True`}</code></pre>
        <p>
          This makes Glue apply the schema from your Glue Catalog table, not infer it from today's file.
        </p>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Why This Matters</h2>
        <p>
          In big data pipelines, you can't assume the data will always have all the fields. Especially if it comes from event logs, sensors, or user activity.
        </p>
        <p>By locking the schema from the Glue Catalog, you:</p>
        <ul className="list-disc list-inside ml-6 space-y-1">
          <li>Prevent random schema changes from breaking your job</li>
          <li>Make your ETL code cleaner and more predictable</li>
          <li>Align your data lake with Redshift/Spectrum expectations</li>
        </ul>
        <hr className="border-zinc-700" />
        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Final Thoughts</h2>
        <p>
          This small setting saved me from a lot of pain. And honestly, it wasn't easy to find. It deserves to be talked about more.
        </p>
        <p>
          If you're using AWS Glue with semi-structured data, try <span className="bg-zinc-800 px-1 rounded text-blue-300">useCatalogSchema</span>. It just might save your next pipeline run.
        </p>
        <p>
          Let me know if you've run into similar issues — I'd love to compare notes.
        </p>
      </div>
    </div>
  );
}