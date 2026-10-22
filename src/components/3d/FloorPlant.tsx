interface FloorPlantProps {
  position?: [number, number, number]
}

export function FloorPlant({ position = [-4.0, 0, -2.2] }: FloorPlantProps) {
  return (
    <group position={position}>
      {/* Wooden Tripod Stand */}
      <mesh position={[-0.14, 0.18, -0.1]} rotation={[0, 0, -0.12]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.36, 8]} />
        <meshStandardMaterial color="#8c6239" roughness={0.6} />
      </mesh>
      <mesh position={[0.14, 0.18, -0.1]} rotation={[0, 0, 0.12]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.36, 8]} />
        <meshStandardMaterial color="#8c6239" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.18, 0.14]} rotation={[0.12, 0, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.36, 8]} />
        <meshStandardMaterial color="#8c6239" roughness={0.6} />
      </mesh>

      {/* Ceramic Planter Pot */}
      <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.24, 0.44, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, 0.64, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.04, 24]} />
        <meshStandardMaterial color="#3b2b1e" roughness={0.9} />
      </mesh>

      {/* Monstera Stems & Leaves */}
      {/* Central tall leaf */}
      <group position={[0, 0.65, 0]}>
        <mesh position={[0, 0.55, 0]} rotation={[0.1, 0, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.018, 1.1, 8]} />
          <meshStandardMaterial color="#166534" />
        </mesh>
        <mesh position={[0, 1.15, 0.12]} rotation={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.38, 0.55, 0.01]} />
          <meshStandardMaterial color="#15803d" roughness={0.6} />
        </mesh>
      </group>

      {/* Leaf 2 (Angled towards room) */}
      <group position={[0, 0.65, 0]} rotation={[0, 1.2, 0]}>
        <mesh position={[0, 0.42, 0]} rotation={[0.2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.016, 0.85, 8]} />
          <meshStandardMaterial color="#166534" />
        </mesh>
        <mesh position={[0, 0.88, 0.16]} rotation={[-0.35, 0, 0]} castShadow>
          <boxGeometry args={[0.34, 0.48, 0.01]} />
          <meshStandardMaterial color="#16a34a" roughness={0.6} />
        </mesh>
      </group>

      {/* Leaf 3 (Angled towards sunset window) */}
      <group position={[0, 0.65, 0]} rotation={[0, -1.4, 0]}>
        <mesh position={[0, 0.48, 0]} rotation={[0.25, 0, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.016, 0.95, 8]} />
          <meshStandardMaterial color="#166534" />
        </mesh>
        <mesh position={[0, 0.98, 0.18]} rotation={[-0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.36, 0.52, 0.01]} />
          <meshStandardMaterial color="#15803d" roughness={0.6} />
        </mesh>
      </group>

      {/* Leaf 4 (Lower arching leaf) */}
      <group position={[0, 0.65, 0]} rotation={[0, -2.7, 0]}>
        <mesh position={[0, 0.35, 0]} rotation={[0.35, 0, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.015, 0.7, 8]} />
          <meshStandardMaterial color="#166534" />
        </mesh>
        <mesh position={[0, 0.72, 0.18]} rotation={[-0.5, 0, 0]} castShadow>
          <boxGeometry args={[0.3, 0.42, 0.01]} />
          <meshStandardMaterial color="#22c55e" roughness={0.6} />
        </mesh>
      </group>
    </group>
  )
}
