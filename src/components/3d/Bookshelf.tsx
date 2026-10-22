interface BookshelfProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function Bookshelf({ position = [-2.8, 0, -3.7], rotation = [0, 0, 0] }: BookshelfProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* ================= BOOKCASE FRAME (Oak Wood) ================= */}
      {/* Left Wall Panel */}
      <mesh position={[-0.72, 1.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.06, 3.2, 0.45]} />
        <meshStandardMaterial color="#a77a4b" roughness={0.6} />
      </mesh>
      {/* Right Wall Panel */}
      <mesh position={[0.72, 1.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.06, 3.2, 0.45]} />
        <meshStandardMaterial color="#a77a4b" roughness={0.6} />
      </mesh>
      {/* Top Panel */}
      <mesh position={[0, 3.17, 0]} castShadow>
        <boxGeometry args={[1.5, 0.06, 0.46]} />
        <meshStandardMaterial color="#a77a4b" roughness={0.6} />
      </mesh>
      {/* Bottom Base */}
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.06, 0.46]} />
        <meshStandardMaterial color="#a77a4b" roughness={0.6} />
      </mesh>
      {/* Back Panel */}
      <mesh position={[0, 1.6, -0.21]} receiveShadow>
        <boxGeometry args={[1.42, 3.16, 0.02]} />
        <meshStandardMaterial color="#8b5e34" roughness={0.7} />
      </mesh>

      {/* ================= 4 INTERIOR SHELVES ================= */}
      {/* Shelf 1 (Bottom, y = 0.75) */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.04, 0.43]} />
        <meshStandardMaterial color="#a77a4b" roughness={0.6} />
      </mesh>
      {/* Shelf 2 (Middle-low, y = 1.55) */}
      <mesh position={[0, 1.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.04, 0.43]} />
        <meshStandardMaterial color="#a77a4b" roughness={0.6} />
      </mesh>
      {/* Shelf 3 (Middle-high, y = 2.35) */}
      <mesh position={[0, 2.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.04, 0.43]} />
        <meshStandardMaterial color="#a77a4b" roughness={0.6} />
      </mesh>

      {/* ================= BOOKS & ACCESSORIES ON SHELVES ================= */}
      {/* Bottom Shelf (Thick textbooks & manual binders) */}
      <group position={[0, 0.77, 0]}>
        {/* Book stack 1: Distributed Systems, Databases */}
        <mesh position={[-0.55, 0.28, 0]} castShadow>
          <boxGeometry args={[0.09, 0.52, 0.3]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
        <mesh position={[-0.45, 0.25, 0]} castShadow>
          <boxGeometry args={[0.08, 0.48, 0.28]} />
          <meshStandardMaterial color="#065f46" />
        </mesh>
        <mesh position={[-0.35, 0.27, 0]} castShadow>
          <boxGeometry args={[0.1, 0.5, 0.29]} />
          <meshStandardMaterial color="#991b1b" />
        </mesh>
        <mesh position={[-0.24, 0.23, 0]} castShadow>
          <boxGeometry args={[0.08, 0.44, 0.26]} />
          <meshStandardMaterial color="#b45309" />
        </mesh>

        {/* Leaning book */}
        <mesh position={[-0.1, 0.22, 0]} rotation={[0, 0, -0.22]} castShadow>
          <boxGeometry args={[0.07, 0.44, 0.26]} />
          <meshStandardMaterial color="#475569" />
        </mesh>

        {/* Storage basket on right of bottom shelf */}
        <mesh position={[0.42, 0.18, 0]} castShadow>
          <boxGeometry args={[0.42, 0.32, 0.36]} />
          <meshStandardMaterial color="#d4b996" roughness={0.9} />
        </mesh>
      </group>

      {/* Shelf 2 (Clean Architecture, Go, TypeScript books) */}
      <group position={[0, 1.57, 0]}>
        {/* Group of books */}
        <mesh position={[-0.58, 0.22, 0]} castShadow>
          <boxGeometry args={[0.07, 0.42, 0.27]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
        <mesh position={[-0.49, 0.24, 0]} castShadow>
          <boxGeometry args={[0.08, 0.46, 0.28]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <mesh position={[-0.4, 0.2, 0]} castShadow>
          <boxGeometry args={[0.07, 0.38, 0.25]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>

        {/* Horizontal Stack of 3 Books */}
        <mesh position={[0.1, 0.03, 0]} castShadow>
          <boxGeometry args={[0.26, 0.05, 0.22]} />
          <meshStandardMaterial color="#7c3aed" />
        </mesh>
        <mesh position={[0.1, 0.08, 0]} castShadow>
          <boxGeometry args={[0.24, 0.05, 0.21]} />
          <meshStandardMaterial color="#059669" />
        </mesh>
        <mesh position={[0.1, 0.13, 0]} castShadow>
          <boxGeometry args={[0.22, 0.05, 0.2]} />
          <meshStandardMaterial color="#ea580c" />
        </mesh>

        {/* Small Potted Plant on Shelf */}
        <group position={[0.48, 0, 0]}>
          <mesh position={[0, 0.08, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.06, 0.14, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshStandardMaterial color="#15803d" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* Shelf 3 (Top shelf: books & collectibles) */}
      <group position={[0, 2.37, 0]}>
        <mesh position={[-0.48, 0.19, 0]} castShadow>
          <boxGeometry args={[0.06, 0.36, 0.24]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[-0.4, 0.21, 0]} castShadow>
          <boxGeometry args={[0.07, 0.4, 0.25]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
        <mesh position={[-0.32, 0.18, 0]} castShadow>
          <boxGeometry args={[0.06, 0.34, 0.23]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>

        {/* Framed Mini Picture */}
        <mesh position={[0.15, 0.16, 0]} rotation={[0, -0.15, 0]} castShadow>
          <boxGeometry args={[0.22, 0.28, 0.03]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.15, 0.16, 0.02]} rotation={[0, -0.15, 0]}>
          <planeGeometry args={[0.18, 0.24]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>
    </group>
  )
}
