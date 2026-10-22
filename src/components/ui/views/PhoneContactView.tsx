import React, { useState } from 'react'
import { Phone, Mail, MapPin, Copy, Check, Send, ArrowLeft, X } from 'lucide-react'
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

interface PhoneContactViewProps {
  onBackToRoom: () => void
}

export function PhoneContactView({ onBackToRoom }: PhoneContactViewProps) {
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

    const subject = encodeURIComponent(`Contact from ${formData.name} regarding Backend Role`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:${RESUME_DATA.personal.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/25 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm sm:max-w-md bg-white border-4 border-slate-300 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col text-slate-800 max-h-[92vh]">
        {/* Dynamic Island / Speaker Notch */}
        <div className="w-full pt-3 pb-2 px-6 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-600 font-semibold">18:30</span>
          <div className="w-20 h-4 bg-slate-900 rounded-full" />
          <span className="text-[11px] font-mono text-emerald-700 font-semibold">5G 100%</span>
        </div>

        {/* Back Button Bar */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              sfx.playClick()
              onBackToRoom()
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 hover:text-emerald-800 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>‹ Back to Room (ESC)</span>
          </button>
          <button
            onClick={() => {
              sfx.playClick()
              onBackToRoom()
            }}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Smartphone Screen Body (Clean Modern Light Aesthetic) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar text-xs bg-[#faf8f5]">
          {/* Contact Profile Header */}
          <div className="text-center space-y-1.5 py-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
              AA
            </div>
            <h2 className="text-base font-bold text-slate-900 font-mono">
              {RESUME_DATA.personal.name}
            </h2>
            <p className="text-emerald-700 font-mono text-xs font-semibold">
              Backend Developer • Mashhad, Iran
            </p>
          </div>

          {/* Quick Direct Actions */}
          <div className="grid grid-cols-2 gap-2">
            {/* Call / Phone */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <Phone className="w-4 h-4" />
                </span>
                <button
                  onClick={() => handleCopy(RESUME_DATA.personal.phone, 'phone')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {copiedKey === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium">Phone / Telegram</span>
                <a
                  href={`tel:${RESUME_DATA.personal.phone}`}
                  className="block font-bold text-slate-900 hover:text-emerald-700 font-mono text-xs"
                >
                  {RESUME_DATA.personal.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-100">
                  <Mail className="w-4 h-4" />
                </span>
                <button
                  onClick={() => handleCopy(RESUME_DATA.personal.email, 'email')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium">Email Address</span>
                <a
                  href={`mailto:${RESUME_DATA.personal.email}`}
                  className="block font-bold text-slate-900 hover:text-sky-700 font-mono text-xs truncate"
                >
                  {RESUME_DATA.personal.email}
                </a>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="space-y-2">
            <a
              href={RESUME_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-2xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <LinkedInIcon className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-bold text-slate-900 text-xs">LinkedIn</div>
                  <div className="text-[11px] text-slate-500 font-mono">{RESUME_DATA.personal.linkedinHandle}</div>
                </div>
              </div>
              <span className="text-xs text-blue-600 font-mono font-medium">Open →</span>
            </a>

            <a
              href={RESUME_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 shadow-2xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
                  <GitHubIcon className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-bold text-slate-900 text-xs">GitHub</div>
                  <div className="text-[11px] text-slate-500 font-mono">{RESUME_DATA.personal.githubHandle}</div>
                </div>
              </div>
              <span className="text-xs text-slate-600 font-mono font-medium">Open →</span>
            </a>
          </div>

          {/* Location info */}
          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-red-500 shrink-0" />
            <span className="text-xs font-medium">Mashhad, Iran • Remote / Hybrid Ready</span>
          </div>

          {/* Send SMS/Message Form */}
          <form onSubmit={handleSendMessage} className="space-y-2.5 pt-3 border-t border-slate-200">
            <span className="text-xs font-mono text-slate-700 font-bold block">
              Instant Direct Message:
            </span>
            <input
              type="text"
              required
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 shadow-2xs"
            />
            <input
              type="email"
              required
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 shadow-2xs"
            />
            <textarea
              required
              rows={2}
              placeholder="Your project opportunity or inquiry..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 shadow-2xs"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-mono text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{sent ? 'Dispatched to Mail Client!' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
