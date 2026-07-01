import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 py-12 px-4">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl p-10 text-zinc-100 font-sans space-y-8">
        <div className="flex flex-col items-center">
          {/* Avatar illustration */}
          <div className="mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
              <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 19.125a7.5 7.5 0 0115 0A17.933 17.933 0 0112 21c-2.676 0-5.216-.584-7.499-1.875z" /></svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-2 text-center">Contact Me</h1>
          <p className="text-zinc-400 text-center mb-4 max-w-md">Have a question, an interesting problem, or just want to say hi? Drop a note below and I'll get back to you.</p>
          <div className="w-16 h-0.5 rounded-full bg-blue-600 mb-6" />
        </div>
        <form action="https://formspree.io/f/xpwreayj" method="POST" className="space-y-5">
          <Input name="name" className="bg-zinc-950 border border-zinc-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-3 text-base" placeholder="Name" />
          <Input name="email" type="email" className="bg-zinc-950 border border-zinc-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-3 text-base" placeholder="Email" />
          <Input name="subject" className="bg-zinc-950 border border-zinc-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-3 text-base" placeholder="Subject" />
          <textarea name="message" className="bg-zinc-950 border border-zinc-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-3 text-base min-h-[120px] resize-none w-full" placeholder="Message" />
          <Button type="submit" className="w-full mt-1 bg-blue-600 hover:bg-blue-500 text-white font-medium text-base px-6 py-3 rounded-lg transition-colors">Send Message</Button>
        </form>
      </div>
    </div>
  )
}
