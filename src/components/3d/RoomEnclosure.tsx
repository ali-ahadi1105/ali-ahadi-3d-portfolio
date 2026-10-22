import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createSunsetTexture } from '../../utils/textures'

export function RoomEnclosure() {
  const sunBeamsRef = useRef<THREE.Group>(null)
  const sunsetTexture = useMemo(() => createSunsetTexture(), [])

  useFrame((state) => {
    if (sunBeamsRef.current) {
      // Subtle atmospheric shimmer in the golden sunset sunbeam
      const t = state.clock.getElapsedTime()
      sunBeamsRef.current.position.y = Math.sin(t * 0.4) * 0.04
    }
  })

  return (
    <group>
      {/* ================= PARQUET WOODEN FLOOR ================= */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial
          color="#ebdcc7"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* ================= ROOM WALLS ================= */}
      {/* Back Wall (Warm Cream / Ecru) */}
      <mesh position={[0, 4, -4]} receiveShadow>
        <planeGeometry args={[16, 8]} />
        <meshStandardMaterial
          color="#f6f3eb"
          roughness={0.9}
        />
      </mesh>

      {/* Left Wall (Clean Wall Plane) */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5, 4, 0]} receiveShadow>
        <planeGeometry args={[16, 8]} />
        <meshStandardMaterial
          color="#f2eee4"
          roughness={0.9}
        />
      </mesh>

      {/* Baseboards (Skirting Boards) */}
      <mesh position={[0, 0.08, -3.98]} castShadow>
        <boxGeometry args={[16, 0.16, 0.04]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
      <mesh position={[-4.98, 0.08, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[16, 0.16, 0.04]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* ================= WINDOW WITH OUTDOOR SUNSET PANORAMA ================= */}
      {/* Mounted flat on the left wall with ZERO geometry clipping */}
      <group position={[-4.94, 3.2, -0.4]} rotation={[0, Math.PI / 2, 0]}>
        {/* Outer White Window Trim */}
        <mesh position={[0, 0, 0.03]} castShadow>
          <boxGeometry args={[3.2, 3.8, 0.06]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>

        {/* Window Sill */}
        <mesh position={[0, -1.95, 0.12]} castShadow>
          <boxGeometry args={[3.6, 0.1, 0.32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.35} />
        </mesh>

        {/* --- SUNSET PANORAMA VIEW CANVAS --- */}
        {/* Flat procedural sunset sky canvas texture */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[2.85, 3.45]} />
          <meshBasicMaterial map={sunsetTexture} />
        </mesh>

        {/* Semi-transparent Glass Reflection Overlay */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.85, 3.45]} />
          <meshStandardMaterial
            color="#fed7aa"
            transparent
            opacity={0.12}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>

        {/* Window Mullion Grid Bars (Vertical & Horizontal Wooden Dividers) */}
        <mesh position={[0, 0, 0.055]}>
          <boxGeometry args={[0.07, 3.45, 0.04]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.35, 0.055]}>
          <boxGeometry args={[2.85, 0.07, 0.04]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.75, 0.055]}>
          <boxGeometry args={[2.85, 0.07, 0.04]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>

        {/* Warm Golden Glow emitting from the window into the room */}
        <pointLight
          position={[0, 0, 0.5]}
          intensity={1.2}
          color="#fb923c"
          distance={5.5}
        />
      </group>

      {/* ================= VOLUMETRIC SUNSET SUNBEAM ================= */}
      <group ref={sunBeamsRef} position={[-2.4, 2.7, -0.1]} rotation={[0.4, 0.6, -0.3]}>
        <mesh>
          <cylinderGeometry args={[0.8, 3.0, 6.5, 16]} />
          <meshBasicMaterial
            color="#fed7aa"
            transparent
            opacity={0.065}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* ================= MINIMALIST FRAMED POSTER ================= */}
      <group position={[2.6, 3.6, -3.95]}>
        <mesh>
          <boxGeometry args={[1.8, 2.4, 0.05]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.65, 2.25]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Graphic line artwork on poster */}
        <mesh position={[0, 0.2, 0.04]}>
          <ringGeometry args={[0.35, 0.4, 32]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>
        <mesh position={[0, -0.4, 0.04]}>
          <boxGeometry args={[0.9, 0.04, 0.01]} />
          <meshBasicMaterial color="#64748b" />
        </mesh>
      </group>
    </group>
  )
}
