import { Briefcase, CheckCircle2, Server, Activity, GitBranch } from 'lucide-react'
import { RESUME_DATA } from '../../../data/resumeData'

export function ExperienceWindow() {
  const exp = RESUME_DATA.experience[0]

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-mono">
              {exp.role}
            </h2>
            <p className="text-sky-700 text-xs sm:text-sm font-semibold">
              {exp.company} • {exp.location}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800">
            {exp.period}
          </span>
        </div>

        {/* Highlight KPI chips */}
        <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 font-medium">
            <Server className="w-3.5 h-3.5 text-sky-600" />
            7,000–9,000 Daily Active Users
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            PKI Registration Authority (RA)
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-800 font-medium">
            <GitBranch className="w-3.5 h-3.5 text-purple-600" />
            GitLab CI/CD & Bash Automation
          </span>
        </div>
      </div>

      {/* Production Responsibilities & Accomplishments */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold font-mono flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-sky-600" /> Key Engineering Deliverables
        </h3>

        <div className="grid grid-cols-1 gap-2.5">
          {exp.highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-all flex items-start gap-3 text-xs sm:text-sm leading-relaxed"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Employed */}
      <div className="space-y-2">
        <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold font-mono">
          Production Technologies Used:
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {exp.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-mono font-medium shadow-2xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
