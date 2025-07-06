import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Resume() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2e] to-[#23284a] py-12">
      <div className="w-full max-w-5xl bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl shadow-xl p-10 text-zinc-100 font-sans space-y-10">
        {/* Header */}
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl font-bold text-blue-400">Amod Shanker</h1>
          <h2 className="text-xl font-semibold text-blue-200">Data & AI Engineer</h2>
          <div className="flex flex-wrap gap-4 text-blue-300 text-sm mt-2">
            <span><a href="https://github.com/amod981" className="hover:text-blue-400 underline">Github</a></span>
            <span><a href="https://www.linkedin.com/in/amod-shanker-20a0a1187/" className="hover:text-blue-400 underline">LinkedIn</a></span>
            <span><a href="https://leetcode.com/amod981/" className="hover:text-blue-400 underline">LeetCode</a></span>
            <span><a href="https://www.hackerrank.com/amod981" className="hover:text-blue-400 underline">HackerRank</a></span>
          </div>
        </div>
        {/* Work Experience */}
        <div>
          <h3 className="text-2xl font-bold text-blue-300 mb-4">Work Experience</h3>
          <div className="space-y-6">
            <Card className="bg-[#20244a]/80 border border-blue-400/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-blue-200">Generated Health Limited <span className="text-sm text-blue-400 font-normal">(Sep 2023 - Current, London, UK)</span></CardTitle>
                <div className="text-blue-400 font-semibold">Data & AI Engineer</div>
              </CardHeader>
              <CardContent className="text-blue-100 space-y-2">
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Designed and deployed an AI-driven solution using DynamoDB, TypeScript, Node.js, and OpenAI, improving patient intent interpretation accuracy by 83% and reducing processing errors.</li>
                  <li>Built a Retrieval-Augmented Generation (RAG) framework using Pinecone, OpenAI embeddings, and LangChain, achieving a 92% success rate in generating accurate FAQ responses.</li>
                  <li>Enhanced legacy code documentation by detailing execution plans and standardizing logging, reducing debugging time by over 50%.</li>
                  <li>Enhanced and optimized ETL pipelines for migrating MongoDB database records to a data warehouse, achieving 99.9% reliability and reducing processing time by 40% using AWS ETL tools.</li>
                  <li>Improved the star schema implementation in Amazon Redshift, reducing average query response time by 35% and enhancing reporting with Apache Superset visuals.</li>
                  <li><span className="font-semibold text-blue-300">Achievement:</span> Engineered and implemented AI from the ground up, transforming Florence into a cutting-edge AI-powered system, achieving an 86% boost in intent interpretation accuracy.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-[#20244a]/80 border border-blue-400/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-blue-200">AB InBev <span className="text-sm text-blue-400 font-normal">(Jun 2023 - Aug 2023, London, UK)</span></CardTitle>
                <div className="text-blue-400 font-semibold">Data Science Intern (Capstone Project with Imperial)</div>
              </CardHeader>
              <CardContent className="text-blue-100 space-y-2">
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Developed a machine learning model to predict new customer purchase probability from initial 6-month purchase patterns in UK and French markets, achieving 83% test accuracy.</li>
                  <li>Conducted inferential analysis to identify key market drivers, improving purchase pattern predictions by 20%.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-[#20244a]/80 border border-blue-400/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-blue-200">Ola Cabs <span className="text-sm text-blue-400 font-normal">(Jul 2019 - Aug 2022, Bangalore, India)</span></CardTitle>
                <div className="text-blue-400 font-semibold">Analytics Engineer</div>
              </CardHeader>
              <CardContent className="text-blue-100 space-y-2">
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Designed and implemented end-to-end data processing pipelines, achieving 98% SLA compliance and over 99% data accuracy through rigorous validation and stakeholder collaboration.</li>
                  <li>Enhanced ETL pipelines by analyzing Presto SQL execution plans and optimizing mapper and reducer logic, achieving a 50% improvement in average query performance for near real-time processing queries.</li>
                  <li>Built a PySpark-based distributed application to analyze customer data, generating features such as engagement and capacity for a dataset of 1.2 million users, improving model accuracy by 15%.</li>
                  <li>Developed a lineage tool using Oozie CLI commands, Bash, and Python to track dependencies of production tables, reducing dependency identification time by 80%.</li>
                  <li><span className="font-semibold text-blue-300">Achievement:</span> Recognized among the most valued performer in Ola Cabs for consecutive years in 2021 and 2022.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Skills */}
        <div>
          <h3 className="text-2xl font-bold text-blue-300 mb-4">Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-blue-200 mb-2">Programming & Scripting</h4>
              <div className="flex flex-wrap gap-3 text-blue-200 text-base">
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Python</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">SQL</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">JavaScript</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">TypeScript</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">R</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Bash</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Regex</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Git</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-200 mb-2">Data & ML</h4>
              <div className="flex flex-wrap gap-3 text-blue-200 text-base">
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Spark</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">PyTorch</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Scikit-learn</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">OpenAI</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">LangChain</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Pandas</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">NumPy</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Pinecone</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">PySpark</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Hadoop</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Kafka</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Excel</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-200 mb-2">Cloud & Storage</h4>
              <div className="flex flex-wrap gap-3 text-blue-200 text-base">
                <span className="bg-blue-800/60 rounded-full px-4 py-1">AWS</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">MongoDB</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">PostgreSQL</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Serverless</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Docker</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Kubernetes</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-200 mb-2">Focus Areas</h4>
              <div className="flex flex-wrap gap-3 text-blue-200 text-base">
                <span className="bg-blue-800/60 rounded-full px-4 py-1">NLP</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">LLMs</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">Distributed Data Processing</span>
                <span className="bg-blue-800/60 rounded-full px-4 py-1">System Design</span>
              </div>
            </div>
          </div>
        </div>
        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold text-blue-300 mb-4">Certifications</h3>
          <ul className="list-disc list-inside ml-4 text-blue-100 space-y-1">
            <li><span className="font-semibold text-blue-200">AWS Data Engineer Associate</span> – Amazon Web Services, August 2024</li>
            <li><span className="font-semibold text-blue-200">Advanced SQL</span> – HackerRank, November 2022</li>
          </ul>
        </div>
        {/* Education */}
        <div>
          <h3 className="text-2xl font-bold text-blue-300 mb-4">Education</h3>
          <Card className="bg-[#20244a]/80 border border-blue-400/20 shadow-lg mb-4">
            <CardHeader>
              <CardTitle className="text-lg text-blue-200">Imperial College Business School <span className="text-sm text-blue-400 font-normal">(Sep 2022 – Sep 2023, London, UK)</span></CardTitle>
            </CardHeader>
            <CardContent className="text-blue-100">
              MSc Business Analytics<br />
              Graduated with Distinction (77%) in the MSBA program
            </CardContent>
          </Card>
          <Card className="bg-[#20244a]/80 border border-blue-400/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-blue-200">Indian Institute of Technology Madras <span className="text-sm text-blue-400 font-normal">(Jul 2015 - May 2019, Chennai, India)</span></CardTitle>
            </CardHeader>
            <CardContent className="text-blue-100">
              Bachelor of Technology in Civil Engineering<br />
              Graduated with a CGPA of 8.46/10<br />
              Awarded with the Merit-Cum Means scholarship
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-center pt-8">
        <Button 
          className="bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-lg px-8 py-3 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition"
        >
          Download Resume
        </Button>
      </div>
    </div>
  )
}