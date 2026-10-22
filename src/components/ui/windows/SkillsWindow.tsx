import { useState } from 'react'
import { Server, Layers, Database, Activity, Cpu } from 'lucide-react'
import { RESUME_DATA } from '../../../data/resumeData'

export function SkillsWindow() {
  const [filter, setFilter] = useState<'All' | 'Production' | 'Advanced'>('All')

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server':
        return <Server className="w-4 h-4 text-sky-600" />
      case 'Layers':
        return <Layers className="w-4 h-4 text-blue-600" />
      case 'Database':
        return <Database className="w-4 h-4 text-red-600" />
      case 'Activity':
        return <Activity className="w-4 h-4 text-emerald-600" />
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-purple-600" />
      default:
        return <Server className="w-4 h-4 text-sky-600" />
    }
  }

  return (
    <div className="space-y-6 text-slate-800">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
        <div className="text-xs text-slate-500 font-mono font-medium">
          Technical Stack & Engineering Competencies
        </div>
        <div className="flex gap-1.5 font-mono text-xs">
          {(['All', 'Production', 'Advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilter(lvl)}
              className={`px-3 py-1 rounded-xl transition-all ${
                filter === lvl
                  ? 'bg-sky-600 text-white font-semibold shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RESUME_DATA.skillCategories.map((category, idx) => {
          const filteredSkills = category.skills.filter(
            (s) => filter === 'All' || s.level === filter
          )

          if (filteredSkills.length === 0) return null

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
            >
              <div className="flex items-center gap-2 font-mono">
                {getIcon(category.icon)}
                <h3 className="font-bold text-sm text-slate-900">{category.title}</h3>
              </div>

              <p className="text-slate-500 text-xs">{category.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {filteredSkills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 ${
                      skill.level === 'Production'
                        ? 'bg-sky-50 text-sky-900 border border-sky-200 font-semibold'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span>{skill.name}</span>
                    {skill.tag && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/80 text-slate-600 font-medium">
                        {skill.tag}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
