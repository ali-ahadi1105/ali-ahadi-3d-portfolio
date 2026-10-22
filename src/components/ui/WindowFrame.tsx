import React, { useState } from 'react'
import { Minus, Square, X, RotateCcw } from 'lucide-react'
import { sfx } from '../../utils/audio'

interface WindowFrameProps {
  id: string
  title: string
  icon?: React.ReactNode
  isOpen: boolean
  isFocused: boolean
  defaultSize?: { width: string; height: string }
  onClose: () => void
  onFocus: () => void
  children: React.ReactNode
}

export function WindowFrame({
  title,
  icon,
  isOpen,
  isFocused,
  onClose,
  onFocus,
  children
}: WindowFrameProps) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  if (!isOpen) return null

  if (isMinimized) {
    return null // Minimized state is handled by the Dock
  }

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    sfx.playClick()
    setIsMinimized(true)
  }

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation()
    sfx.playClick()
    setIsMaximized(!isMaximized)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    sfx.playClick()
    onClose()
  }

  return (
    <div
      onClick={onFocus}
      className={`fixed transition-all duration-200 flex flex-col rounded-lg overflow-hidden backdrop-blur-xl border ${
        isMaximized
          ? 'top-12 left-2 right-2 bottom-16 z-30'
          : 'top-16 left-1/2 -translate-x-1/2 w-[95vw] sm:w-[90vw] md:w-[780px] lg:w-[860px] max-h-[80vh] z-20'
      } ${
        isFocused
          ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.18)] bg-[#0c121e]/90'
          : 'border-slate-800/80 shadow-xl bg-[#090e18]/85 opacity-90'
      }`}
    >
      {/* Title Bar */}
      <div
        className={`px-3 py-2 flex items-center justify-between border-b cursor-grab select-none ${
          isFocused
            ? 'bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 border-cyan-800/40 text-cyan-200'
            : 'bg-slate-950/80 border-slate-800 text-slate-400'
        }`}
      >
        <div className="flex items-center gap-2 font-mono text-xs font-semibold">
          {icon && <span className="text-cyan-400">{icon}</span>}
          <span>{title}</span>
        </div>

        {/* Window Action Buttons [ - □ × ] */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleMinimize}
            title="Minimize"
            className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            onClick={handleMaximize}
            title={isMaximized ? 'Restore' : 'Maximize'}
            className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            {isMaximized ? <RotateCcw className="w-2.5 h-2.5" /> : <Square className="w-2.5 h-2.5" />}
          </button>
          <button
            onClick={handleClose}
            title="Close"
            className="w-5 h-5 rounded flex items-center justify-center bg-red-950/60 hover:bg-red-600 border border-red-800/50 hover:border-red-500 text-red-300 hover:text-white transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Window Body Content */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed custom-scrollbar">
        {children}
      </div>
    </div>
  )
}
