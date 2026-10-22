import { Volume2, VolumeX, Download } from 'lucide-react'
import type { CameraPreset } from '../3d/CameraController'
import { RESUME_DATA } from '../../data/resumeData'
import { sfx } from '../../utils/audio'

interface HeaderNavProps {
  currentPreset: CameraPreset
  onSelectPreset: (preset: CameraPreset) => void
  soundEnabled: boolean
  onToggleSound: () => void
}

export function HeaderNav({
  currentPreset,
  onSelectPreset,
  soundEnabled,
  onToggleSound
}: HeaderNavProps) {
  const handlePreset = (preset: CameraPreset) => {
    sfx.playClick()
    onSelectPreset(preset)
  }

  const handlePrint = () => {
    sfx.playSuccess()
    window.print()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
      {/* Left: Branding & Status Badge */}
      <div className="flex items-center gap-3 p-1.5 px-3 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-sm pointer-events-auto">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <div className="font-mono text-xs">
          <span className="font-bold text-slate-900 tracking-wide">
            {RESUME_DATA.personal.name}
          </span>
          <span className="hidden sm:inline text-slate-500"> • Backend Developer</span>
        </div>
        <span className="hidden md:inline px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-mono font-medium">
          🌅 Sunset Golden Hour
        </span>
      </div>

      {/* Middle: 3D Camera / Location Selector */}
      <nav className="flex items-center gap-1 p-1 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-sm pointer-events-auto">
        <button
          onClick={() => handlePreset('room')}
          className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
            currentPreset === 'room'
              ? 'bg-amber-100 text-amber-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>🏠 Room</span>
        </button>

        <button
          onClick={() => handlePreset('monitor')}
          className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
            currentPreset === 'monitor'
              ? 'bg-sky-100 text-sky-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>🖥️ Workstation</span>
        </button>

        <button
          onClick={() => handlePreset('phone')}
          className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
            currentPreset === 'phone'
              ? 'bg-emerald-100 text-emerald-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>📱 Phone</span>
        </button>

        <button
          onClick={() => handlePreset('card')}
          className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
            currentPreset === 'card'
              ? 'bg-amber-100 text-amber-900 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>🪪 ID Card</span>
        </button>
      </nav>

      {/* Right: Quick Tools */}
      <div className="flex items-center gap-2 p-1 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-sm pointer-events-auto">
        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Sounds' : 'Enable Soft Room Audio'}
          className={`p-2 rounded-xl transition-all ${
            soundEnabled
              ? 'bg-amber-100 text-amber-900'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Print CV Button */}
        <button
          onClick={handlePrint}
          title="Print or Export CV as PDF"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-medium transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Resume</span>
        </button>
      </div>
    </header>
  )
}
