import { useState } from 'react'
import { Html } from '@react-three/drei'
import { sfx } from '../../utils/audio'

interface InteractivePhoneProps {
  isFocused: boolean
  onClick: () => void
}

export function InteractivePhone({ isFocused, onClick }: InteractivePhoneProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <group
      position={[0.75, 1.055, 0.28]}
      rotation={[-Math.PI / 2, 0, 0.15]}
      onClick={(e) => {
        e.stopPropagation()
        sfx.playClick()
        onClick()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      {/* Phone Body (Titanium / Slate) */}
      <mesh castShadow>
        <boxGeometry args={[0.16, 0.32, 0.015]} />
        <meshStandardMaterial
          color={hovered || isFocused ? '#10b981' : '#334155'}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Phone Screen Glass */}
      <mesh position={[0, 0, 0.009]}>
        <planeGeometry args={[0.145, 0.3]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>

      {/* Screen Glowing Notification Banner */}
      <group position={[0, 0.06, 0.01]}>
        <mesh>
          <planeGeometry args={[0.13, 0.06]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
        {/* Contact icon / indicator */}
        <mesh position={[-0.04, 0, 0.001]}>
          <circleGeometry args={[0.014, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Floating 3D Click Hint Label */}
      {!isFocused && (
        <Html position={[0, 0.28, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
          <div
            className={`px-2.5 py-1 rounded-full font-mono text-xs whitespace-nowrap transition-all duration-300 shadow-md border ${
              hovered
                ? 'bg-emerald-600 text-white border-emerald-400 scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'bg-white/90 text-slate-800 border-slate-200 floating-hint backdrop-blur-sm'
            }`}
          >
            <div className="flex items-center gap-1 font-medium">
              <span>📱</span>
              <span>Phone (Contact Ali)</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
