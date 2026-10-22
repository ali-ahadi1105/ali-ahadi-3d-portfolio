import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export type CameraPreset = 'room' | 'monitor' | 'phone' | 'card'

interface CameraControllerProps {
  preset: CameraPreset
  isUserInteracting: boolean
}

const PRESET_CONFIGS: Record<CameraPreset, { position: [number, number, number]; target: [number, number, number] }> = {
  room: {
    // Beautiful isometric room view from front-right
    position: [2.8, 2.9, 3.6],
    target: [0, 1.15, 0]
  },
  monitor: {
    // Zoomed directly into the workstation monitor
    position: [0, 1.62, 0.9],
    target: [0, 1.62, -0.15]
  },
  phone: {
    // Angled close-up of the smartphone
    position: [0.75, 1.6, 0.52],
    target: [0.75, 1.05, 0.28]
  },
  card: {
    // Angled close-up of the ID card & notebook
    position: [-0.65, 1.6, 0.52],
    target: [-0.65, 1.05, 0.28]
  }
}

export function CameraController({ preset, isUserInteracting }: CameraControllerProps) {
  const { camera } = useThree()
  const currentTarget = useRef(new THREE.Vector3(0, 1.15, 0))
  const isTransitioning = useRef(true)

  useEffect(() => {
    isTransitioning.current = true
  }, [preset])

  useFrame(() => {
    // If user is manually orbiting the camera with mouse, don't force lerp
    if (isUserInteracting && preset === 'room') {
      return
    }

    if (!isTransitioning.current) return

    const cfg = PRESET_CONFIGS[preset] || PRESET_CONFIGS.room
    const targetPos = new THREE.Vector3(...cfg.position)
    const targetLookAt = new THREE.Vector3(...cfg.target)

    // Smooth easing
    camera.position.lerp(targetPos, 0.065)
    currentTarget.current.lerp(targetLookAt, 0.065)
    camera.lookAt(currentTarget.current)

    // Stop when close enough
    if (
      camera.position.distanceTo(targetPos) < 0.008 &&
      currentTarget.current.distanceTo(targetLookAt) < 0.008
    ) {
      isTransitioning.current = false
    }
  })

  return null
}
