import { useState } from 'react'
import { Html } from '@react-three/drei'
import { sfx } from '../../utils/audio'

interface InteractiveCardProps {
  isFocused: boolean
  onClick: () => void
}

export function InteractiveCard({ isFocused, onClick }: InteractiveCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <group
      position={[-0.65, 1.055, 0.28]}
      rotation={[-Math.PI / 2, 0, -0.12]}
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
      {/* Leather/Moleskine Notebook Base */}
      <mesh position={[-0.05, 0, -0.005]} castShadow>
        <boxGeometry args={[0.34, 0.44, 0.02]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.8}
        />
      </mesh>
      {/* Notebook Paper Pages */}
      <mesh position={[-0.05, 0, 0.006]}>
        <planeGeometry args={[0.31, 0.41]} />
        <meshStandardMaterial color="#fafaf9" roughness={0.9} />
      </mesh>

      {/* --- BUSINESS / ID BADGE CARD (Stacked on the notebook) --- */}
      <group position={[0.04, 0.02, 0.016]}>
        {/* Card Body */}
        <mesh castShadow>
          <boxGeometry args={[0.24, 0.15, 0.004]} />
          <meshStandardMaterial
            color={hovered || isFocused ? '#f59e0b' : '#ffffff'}
            roughness={0.3}
          />
        </mesh>

        {/* Lanyard Clip Hole */}
        <mesh position={[-0.1, 0, 0.003]}>
          <cylinderGeometry args={[0.008, 0.008, 0.006, 12]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>

        {/* Card Photo placeholder */}
        <mesh position={[-0.04, 0, 0.003]}>
          <planeGeometry args={[0.06, 0.08]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>

        {/* Card Text Lines */}
        <mesh position={[0.05, 0.02, 0.003]}>
          <planeGeometry args={[0.09, 0.015]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0.05, -0.015, 0.003]}>
          <planeGeometry args={[0.09, 0.01]} />
          <meshBasicMaterial color="#64748b" />
        </mesh>
      </group>

      {/* Floating 3D Click Hint Label */}
      {!isFocused && (
        <Html position={[0, 0.28, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
          <div
            className={`px-2.5 py-1 rounded-full font-mono text-xs whitespace-nowrap transition-all duration-300 shadow-md border ${
              hovered
                ? 'bg-amber-600 text-white border-amber-400 scale-110 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-white/90 text-slate-800 border-slate-200 floating-hint backdrop-blur-sm'
            }`}
          >
            <div className="flex items-center gap-1 font-medium">
              <span>🪪</span>
              <span>ID Card & Bio (Ali Ahadi)</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
