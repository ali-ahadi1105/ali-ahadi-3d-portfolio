import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SunlightParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Clustered around the window and desk area
      pos[i * 3] = -2.5 + Math.random() * 4.5
      pos[i * 3 + 1] = 0.5 + Math.random() * 3.5
      pos[i * 3 + 2] = -1.5 + Math.random() * 3.5
    }
    return pos
  }, [count])

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < count; i++) {
        let y = posAttr.getY(i) - delta * 0.05
        if (y < 0.5) y = 4.0
        posAttr.setY(i, y)
      }
      posAttr.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#fed7aa"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  )
}
