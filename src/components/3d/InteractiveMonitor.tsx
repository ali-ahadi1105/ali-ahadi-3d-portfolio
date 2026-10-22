import { useState } from 'react'
import { Html } from '@react-three/drei'
import { sfx } from '../../utils/audio'

interface InteractiveMonitorProps {
  isFocused: boolean
  onClick: () => void
}

export function InteractiveMonitor({ isFocused, onClick }: InteractiveMonitorProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <group position={[0, 1.04, -0.15]}>
      {/* Monitor Stand Base */}
      <mesh position={[0, 0.015, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.02, 24]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Monitor Stand Vertical Arm */}
      <mesh position={[0, 0.32, -0.05]} castShadow>
        <boxGeometry args={[0.07, 0.6, 0.05]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* --- MONITOR ENCLOSURE & SCREEN (Clickable Target) --- */}
      <group
        position={[0, 0.62, 0]}
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
        {/* Monitor Outer Bezel (Matte Silver/White) */}
        <mesh castShadow>
          <boxGeometry args={[1.72, 0.98, 0.06]} />
          <meshStandardMaterial
            color={hovered || isFocused ? '#0284c7' : '#e2e8f0'}
            roughness={0.3}
            metalness={0.6}
          />
        </mesh>

        {/* Screen Display Glass */}
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[1.65, 0.92]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>

        {/* 3D Code Editor / Terminal Mockup on the Screen Surface */}
        <group position={[0, 0, 0.034]}>
          {/* Header bar on simulated screen */}
          <mesh position={[0, 0.41, 0]}>
            <planeGeometry args={[1.63, 0.08]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
          {/* Window dots */}
          <mesh position={[-0.74, 0.41, 0.001]}>
            <circleGeometry args={[0.014, 12]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh position={[-0.7, 0.41, 0.001]}>
            <circleGeometry args={[0.014, 12]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          <mesh position={[-0.66, 0.41, 0.001]}>
            <circleGeometry args={[0.014, 12]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>

          {/* Active Code / Terminal lines */}
          <mesh position={[-0.2, 0.28, 0]}>
            <planeGeometry args={[1.0, 0.03]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
          <mesh position={[-0.3, 0.2, 0]}>
            <planeGeometry args={[0.8, 0.025]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
          <mesh position={[-0.15, 0.12, 0]}>
            <planeGeometry args={[1.1, 0.025]} />
            <meshBasicMaterial color="#94a3b8" />
          </mesh>
          <mesh position={[-0.25, 0.04, 0]}>
            <planeGeometry args={[0.9, 0.025]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          <mesh position={[-0.35, -0.04, 0]}>
            <planeGeometry args={[0.7, 0.025]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[-0.1, -0.12, 0]}>
            <planeGeometry args={[1.2, 0.025]} />
            <meshBasicMaterial color="#64748b" />
          </mesh>

          {/* Screen Light Glow into the Room */}
          <pointLight
            position={[0, 0, 0.3]}
            intensity={0.45}
            color="#38bdf8"
            distance={1.6}
          />
        </group>

        {/* Floating 3D Click Hint Label (Visible in Overview mode) */}
        {!isFocused && (
          <Html position={[0, 0.72, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
            <div
              className={`px-3 py-1.5 rounded-full font-mono text-xs whitespace-nowrap transition-all duration-300 shadow-md border ${
                hovered
                  ? 'bg-sky-600 text-white border-sky-400 scale-110 shadow-[0_0_15px_rgba(2,132,199,0.5)]'
                  : 'bg-white/90 text-slate-800 border-slate-200 floating-hint backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center gap-1.5 font-medium">
                <span>🖥️</span>
                <span>Workstation (Experience & Arch)</span>
              </div>
            </div>
          </Html>
        )}
      </group>
    </group>
  )
}
