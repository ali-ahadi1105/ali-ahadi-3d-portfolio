import { useState, useEffect } from 'react'
import { Scene3D } from './components/3d/Scene3D'
import type { CameraPreset } from './components/3d/CameraController'
import { HeaderNav } from './components/ui/HeaderNav'
import { MonitorWorkstationView } from './components/ui/views/MonitorWorkstationView'
import { PhoneContactView } from './components/ui/views/PhoneContactView'
import { CardBioView } from './components/ui/views/CardBioView'
import { sfx } from './utils/audio'

export function App() {
  const [currentPreset, setCurrentPreset] = useState<CameraPreset>('room')
  const [soundEnabled, setSoundEnabled] = useState(false)

  const handleSelectPreset = (preset: CameraPreset) => {
    sfx.playClick()
    setCurrentPreset(preset)
  }

  const handleToggleSound = () => {
    const isNowOn = sfx.toggle()
    setSoundEnabled(isNowOn)
  }

  // Keyboard shortcut: Escape returns to Room view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentPreset !== 'room') {
        sfx.playClick()
        setCurrentPreset('room')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPreset])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f4efe6] select-none text-slate-800">
      {/* Warm Afternoon Sunlight Gradient Vignette */}
      <div className="fixed inset-0 pointer-events-none warm-sunlight z-10" />

      {/* Top Navigation Bar */}
      <HeaderNav
        currentPreset={currentPreset}
        onSelectPreset={handleSelectPreset}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* 3D Sunlit Programmer Room Canvas */}
      <Scene3D
        preset={currentPreset}
        onSelectPreset={handleSelectPreset}
      />

      {/* --- FOCUSED INTERACTIVE VIEWS --- */}
      {/* 1. Computer / Monitor Workstation View */}
      {currentPreset === 'monitor' && (
        <MonitorWorkstationView onBackToRoom={() => handleSelectPreset('room')} />
      )}

      {/* 2. Smartphone Contact View */}
      {currentPreset === 'phone' && (
        <PhoneContactView onBackToRoom={() => handleSelectPreset('room')} />
      )}

      {/* 3. Developer ID Card & Bio View */}
      {currentPreset === 'card' && (
        <CardBioView onBackToRoom={() => handleSelectPreset('room')} />
      )}

      {/* --- BOTTOM FLOATING EXPLORATION PILL (Visible in Room View) --- */}
      {currentPreset === 'room' && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-lg text-xs font-mono text-slate-600">
            <span className="flex items-center gap-1.5">
              <span>🖱️</span>
              <span className="hidden sm:inline">Drag to look around</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-2">
              <button
                onClick={() => handleSelectPreset('monitor')}
                className="hover:text-sky-600 hover:underline flex items-center gap-1"
              >
                <span>🖥️</span>
                <span>Computer</span>
              </button>
              <button
                onClick={() => handleSelectPreset('phone')}
                className="hover:text-emerald-600 hover:underline flex items-center gap-1"
              >
                <span>📱</span>
                <span>Phone</span>
              </button>
              <button
                onClick={() => handleSelectPreset('card')}
                className="hover:text-amber-600 hover:underline flex items-center gap-1"
              >
                <span>🪪</span>
                <span>ID Card</span>
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
