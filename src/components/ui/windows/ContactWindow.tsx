import React, { useState } from 'react'
import { Mail, Phone, MapPin, Copy, Check, Send } from 'lucide-react'
import { RESUME_DATA } from '../../../data/resumeData'
import { sfx } from '../../../utils/audio'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export function ContactWindow() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    sfx.playSuccess()
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    sfx.playSuccess()
    setSent(true)

    // Open mailto client as fallback
    const subject = encodeURIComponent(`Inquiry from ${formData.name} regarding Backend Role`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:${RESUME_DATA.personal.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="space-y-6">
      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Email */}
        <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-cyan-950/80 text-cyan-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-mono">Email Address</div>
              <a
                href={`mailto:${RESUME_DATA.personal.email}`}
                className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-cyan-300 transition-colors"
              >
                {RESUME_DATA.personal.email}
              </a>
            </div>
          </div>
          <button
            onClick={() => handleCopy(RESUME_DATA.personal.email, 'email')}
            title="Copy Email"
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            {copiedKey === 'email' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Phone */}
        <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-emerald-950/80 text-emerald-400">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-mono">Phone / Telegram</div>
              <a
                href={`tel:${RESUME_DATA.personal.phone}`}
                className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-emerald-300 transition-colors"
              >
                {RESUME_DATA.personal.phone}
              </a>
            </div>
          </div>
          <button
            onClick={() => handleCopy(RESUME_DATA.personal.phone, 'phone')}
            title="Copy Phone"
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            {copiedKey === 'phone' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* LinkedIn */}
        <a
          href={RESUME_DATA.personal.linkedin}
          target="_blank"
          rel="noreferrer"
          className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center gap-3 group"
        >
          <div className="p-2 rounded bg-blue-950/80 text-blue-400 group-hover:scale-105 transition-transform">
            <LinkedInIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">LinkedIn Profile</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-cyan-300">
              {RESUME_DATA.personal.linkedinHandle}
            </div>
          </div>
        </a>

        {/* GitHub */}
        <a
          href={RESUME_DATA.personal.github}
          target="_blank"
          rel="noreferrer"
          className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center gap-3 group"
        >
          <div className="p-2 rounded bg-slate-800 text-slate-300 group-hover:scale-105 transition-transform">
            <GitHubIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">GitHub Profile</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-cyan-300">
              {RESUME_DATA.personal.githubHandle}
            </div>
          </div>
        </a>
      </div>

      {/* Location & Status Bar */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-400" />
          <span>Location: {RESUME_DATA.personal.location} (Remote / Hybrid Ready)</span>
        </div>
        <div className="text-emerald-400 font-semibold">● Open to New Opportunities</div>
      </div>

      {/* Quick Message Dispatch Form */}
      <form onSubmit={handleSendMessage} className="space-y-3 pt-2">
        <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
          Direct Transmission to Ali Ahadi
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your Name / Company"
            className="px-3 py-2 rounded bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Your Email"
            className="px-3 py-2 rounded bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <textarea
          required
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Message regarding backend engineering, microservices, or consulting..."
          className="w-full px-3 py-2 rounded bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />

        <button
          type="submit"
          className="w-full py-2.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{sent ? 'Message Prepared in Mail Client!' : 'Transmit Message'}</span>
        </button>
      </form>
    </div>
  )
}
