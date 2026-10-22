import { useMemo } from 'react'
import { createRugTexture } from '../../utils/textures'

interface AreaRugProps {
  position?: [number, number, number]
}

export function AreaRug({ position = [0.4, 0.012, 0.35] }: AreaRugProps) {
  const rugTexture = useMemo(() => createRugTexture(), [])

  return (
    <group position={position}>
      {/*
        Solid 3D woven rug with real thickness (0.024m)
        Sitting above the floor plane (y=0) to guarantee ZERO z-fighting
      */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <boxGeometry args={[4.4, 0.024, 3.4]} />
        <meshStandardMaterial
          map={rugTexture}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
    </group>
  )
}
