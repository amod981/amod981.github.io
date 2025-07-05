import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2e] to-[#23284a] py-12">
      <div className="w-full max-w-xl bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl shadow-xl p-10 text-zinc-100 font-sans space-y-8">
        <div className="flex flex-col items-center">
          {/* Avatar illustration */}
          <div className="mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 19.125a7.5 7.5 0 0115 0A17.933 17.933 0 0112 21c-2.676 0-5.216-.584-7.499-1.875z" /></svg>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 text-center">Contact Me</h1>
          <p className="text-blue-200 text-center mb-4 max-w-md">Have a question, project, or just want to say hi? Fill out the form below and I'll get back to you soon!</p>
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 mb-6" />
        </div>
        <form action="https://formspree.io/f/xpwreayj" method="POST" className="space-y-6">
          <Input name="name" className="bg-zinc-800 border border-blue-400/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-zinc-100 placeholder-zinc-400 rounded-lg px-4 py-3 text-lg" placeholder="Name" />
          <Input name="email" type="email" className="bg-zinc-800 border border-blue-400/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-zinc-100 placeholder-zinc-400 rounded-lg px-4 py-3 text-lg" placeholder="Email" />
          <Input name="subject" className="bg-zinc-800 border border-blue-400/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-zinc-100 placeholder-zinc-400 rounded-lg px-4 py-3 text-lg" placeholder="Subject" />
          <textarea name="message" className="bg-zinc-800 border border-blue-400/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-zinc-100 placeholder-zinc-400 rounded-lg px-4 py-3 text-lg min-h-[120px] resize-none w-full" placeholder="Message" />
          <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-lg px-6 py-3 rounded-lg shadow hover:from-blue-600 hover:to-violet-600 transition">Submit</Button>
        </form>
      </div>
    </div>
  )
}