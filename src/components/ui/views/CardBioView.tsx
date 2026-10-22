import { ArrowLeft, X, GraduationCap, Globe, BookOpen, Download, ShieldCheck, Heart } from 'lucide-react'
import { RESUME_DATA } from '../../../data/resumeData'
import { sfx } from '../../../utils/audio'

interface CardBioViewProps {
  onBackToRoom: () => void
}

export function CardBioView({ onBackToRoom }: CardBioViewProps) {
  const handlePrint = () => {
    sfx.playSuccess()
    window.print()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-800 max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              sfx.playClick()
              onBackToRoom()
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>‹ Back to Room (ESC)</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-mono font-medium transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print / Save CV</span>
          </button>

          <button
            onClick={() => {
              sfx.playClick()
              onBackToRoom()
            }}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 custom-scrollbar text-xs sm:text-sm leading-relaxed">
          {/* Official Developer ID Card Layout (Light Executive Badge) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-white via-amber-50/50 to-sky-50/50 border border-amber-200 text-slate-800 shadow-sm relative overflow-hidden space-y-4">
            {/* Background watermark */}
            <div className="absolute -right-6 -bottom-6 text-amber-500/10 text-9xl font-black select-none pointer-events-none">
              PKI
            </div>

            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-sky-500 flex items-center justify-center text-white text-xl font-black shadow-md">
                  AA
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold font-mono tracking-wide text-slate-900">
                    {RESUME_DATA.personal.name}
                  </h1>
                  <p className="text-sky-700 font-mono text-xs font-bold">
                    {RESUME_DATA.personal.role}
                  </p>
                  <p className="text-slate-500 text-[11px] font-mono">
                    {RESUME_DATA.personal.location}
                  </p>
                </div>
              </div>

              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                VERIFIED DEV
              </span>
            </div>

            {/* Quick Badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono relative z-10">
              <span className="px-3 py-1 rounded-xl bg-white text-slate-700 border border-slate-200 shadow-2xs font-medium">
                3 Years Production Experience
              </span>
              <span className="px-3 py-1 rounded-xl bg-white text-slate-700 border border-slate-200 shadow-2xs font-medium">
                7k–9k Daily Active Users (PKI RA)
              </span>
              <span className="px-3 py-1 rounded-xl bg-white text-slate-700 border border-slate-200 shadow-2xs font-medium">
                Redis In-Memory Staging
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-600" /> Professional Summary
            </h3>
            <p className="text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
              {RESUME_DATA.summary}
            </p>
          </div>

          {/* Education & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Education */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600">
                <GraduationCap className="w-4 h-4 text-sky-600" />
                <span>Education</span>
              </div>
              <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                {RESUME_DATA.personal.education.degree}
              </p>
              <p className="text-slate-500 text-xs">
                {RESUME_DATA.personal.education.university} ({RESUME_DATA.personal.education.year})
              </p>
            </div>

            {/* Languages */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>Languages</span>
              </div>
              <div className="space-y-1 text-xs">
                {RESUME_DATA.personal.languages.map((lang, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span className="font-medium">{lang.name}:</span>
                    <span className="text-slate-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-red-500" /> Core Interests & Specializations
            </h3>
            <div className="flex flex-wrap gap-2">
              {RESUME_DATA.personal.interests.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
