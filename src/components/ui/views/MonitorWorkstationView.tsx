import { useState } from 'react'
import { Briefcase, Layers, Wrench, Cpu, Terminal, ArrowLeft, X } from 'lucide-react'
import { ExperienceWindow } from '../windows/ExperienceWindow'
import { ArchitectureWindow } from '../windows/ArchitectureWindow'
import { SkillsWindow } from '../windows/SkillsWindow'
import { AiAgentsWindow } from '../windows/AiAgentsWindow'
import { TerminalWindow } from '../windows/TerminalWindow'
import { sfx } from '../../../utils/audio'

interface MonitorWorkstationViewProps {
  onBackToRoom: () => void
}

type TabType = 'experience' | 'architecture' | 'skills' | 'ai' | 'terminal'

export function MonitorWorkstationView({ onBackToRoom }: MonitorWorkstationViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('experience')

  const tabs: { id: TabType; label: string; icon: typeof Briefcase }[] = [
    { id: 'experience', label: '01 Experience', icon: Briefcase },
    { id: 'architecture', label: '02 PKI Architecture', icon: Layers },
    { id: 'skills', label: '03 Skills Matrix', icon: Wrench },
    { id: 'ai', label: '04 AI Agents & MCP', icon: Cpu },
    { id: 'terminal', label: '05 Bash Terminal', icon: Terminal }
  ]

  const handleTabChange = (tab: TabType) => {
    sfx.playClick()
    setActiveTab(tab)
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/25 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-5xl h-[88vh] bg-white border border-slate-300 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-800">
        {/* Monitor Screen Frame Top Bar (macOS Studio Light Aesthetic) */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-2 mr-2">
              <button
                onClick={() => {
                  sfx.playClick()
                  onBackToRoom()
                }}
                className="w-3.5 h-3.5 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer"
                title="Close Workstation (ESC)"
              />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400" />
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
            </div>

            <button
              onClick={() => {
                sfx.playClick()
                onBackToRoom()
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 text-xs font-mono font-semibold transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>‹ Back to Room (ESC)</span>
            </button>
            <span className="hidden md:inline text-xs font-mono text-slate-500">
              Ali Ahadi Workstation • PKI RA Node
            </span>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-[55vw]">
            {tabs.map((t) => {
              const Icon = t.icon
              const isActive = activeTab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => handleTabChange(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-sky-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              )
            })}
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              sfx.playClick()
              onBackToRoom()
            }}
            className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Content Display (Clean Light Canvas) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 custom-scrollbar bg-[#faf8f5]">
          {activeTab === 'experience' && <ExperienceWindow />}
          {activeTab === 'architecture' && <ArchitectureWindow />}
          {activeTab === 'skills' && <SkillsWindow />}
          {activeTab === 'ai' && <AiAgentsWindow />}
          {activeTab === 'terminal' && <TerminalWindow />}
        </div>
      </div>
    </div>
  )
}
