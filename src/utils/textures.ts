import * as THREE from 'three'

/**
 * Generates a high-resolution, procedural sunset panorama texture
 * with gradient sky, setting sun with bloom, distant mountains, and golden clouds.
 */
export function createSunsetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return new THREE.CanvasTexture(canvas)
  }

  // 1. Sky Gradient: Deep purple/rose twilight at top -> Warm orange -> Golden amber at horizon
  const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height)
  skyGrad.addColorStop(0.0, '#4c1d95') // Deep twilight purple at top
  skyGrad.addColorStop(0.25, '#9d174d') // Rose pink
  skyGrad.addColorStop(0.5, '#ea580c') // Vibrant sunset orange
  skyGrad.addColorStop(0.75, '#f59e0b') // Warm amber
  skyGrad.addColorStop(0.9, '#fef08a') // Golden horizon glow
  skyGrad.addColorStop(1.0, '#fed7aa') // Soft warm ground mist
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 2. Setting Sun with Radiant Golden Halo
  const sunX = canvas.width * 0.58
  const sunY = canvas.height * 0.68
  const sunRadius = 90

  // Outer radial glow
  const haloGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 320)
  haloGrad.addColorStop(0, 'rgba(255, 255, 240, 0.95)')
  haloGrad.addColorStop(0.2, 'rgba(254, 240, 138, 0.8)')
  haloGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.45)')
  haloGrad.addColorStop(1, 'rgba(234, 88, 12, 0)')
  ctx.fillStyle = haloGrad
  ctx.beginPath()
  ctx.arc(sunX, sunY, 320, 0, Math.PI * 2)
  ctx.fill()

  // Sun Core Disk
  ctx.fillStyle = '#fffef0'
  ctx.beginPath()
  ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2)
  ctx.fill()

  // 3. Golden Wispy Sunset Clouds
  const drawCloud = (cx: number, cy: number, w: number, h: number, alpha: number) => {
    ctx.save()
    ctx.fillStyle = `rgba(254, 215, 170, ${alpha})`
    ctx.beginPath()
    ctx.ellipse(cx, cy, w, h, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  drawCloud(canvas.width * 0.3, canvas.height * 0.45, 220, 26, 0.35)
  drawCloud(canvas.width * 0.75, canvas.height * 0.48, 190, 22, 0.3)
  drawCloud(canvas.width * 0.45, canvas.height * 0.56, 260, 28, 0.4)
  drawCloud(canvas.width * 0.2, canvas.height * 0.64, 180, 20, 0.3)

  // 4. Distant Mountain Range Silhouettes (Purple-tinted haze)
  ctx.fillStyle = '#581c87' // Distant purple mountain
  ctx.beginPath()
  ctx.moveTo(0, canvas.height * 0.76)
  ctx.lineTo(canvas.width * 0.18, canvas.height * 0.68)
  ctx.lineTo(canvas.width * 0.35, canvas.height * 0.74)
  ctx.lineTo(canvas.width * 0.52, canvas.height * 0.66)
  ctx.lineTo(canvas.width * 0.72, canvas.height * 0.72)
  ctx.lineTo(canvas.width * 0.88, canvas.height * 0.65)
  ctx.lineTo(canvas.width, canvas.height * 0.7)
  ctx.lineTo(canvas.width, canvas.height)
  ctx.lineTo(0, canvas.height)
  ctx.closePath()
  ctx.fill()

  // 5. Closer Mountain Ridge (Deep Warm Silhouette)
  ctx.fillStyle = '#3b0764'
  ctx.beginPath()
  ctx.moveTo(0, canvas.height * 0.82)
  ctx.lineTo(canvas.width * 0.25, canvas.height * 0.75)
  ctx.lineTo(canvas.width * 0.48, canvas.height * 0.81)
  ctx.lineTo(canvas.width * 0.68, canvas.height * 0.73)
  ctx.lineTo(canvas.width * 0.85, canvas.height * 0.78)
  ctx.lineTo(canvas.width, canvas.height * 0.75)
  ctx.lineTo(canvas.width, canvas.height)
  ctx.lineTo(0, canvas.height)
  ctx.closePath()
  ctx.fill()

  // 6. Foreground Skyline / Pine Tree Silhouettes
  ctx.fillStyle = '#1e1b4b'
  ctx.fillRect(0, canvas.height * 0.88, canvas.width, canvas.height * 0.12)

  // Draw some subtle pine trees along the horizon
  const drawTree = (tx: number, ty: number, th: number) => {
    ctx.beginPath()
    ctx.moveTo(tx, ty - th)
    ctx.lineTo(tx + th * 0.28, ty)
    ctx.lineTo(tx - th * 0.28, ty)
    ctx.closePath()
    ctx.fill()
  }

  for (let x = 20; x < canvas.width; x += 35) {
    const h = 30 + Math.sin(x * 0.05) * 15
    drawTree(x, canvas.height * 0.89, h)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.generateMipmaps = true
  return texture
}

/**
 * Generates a high-quality Scandinavian / Bohemian woven area rug texture.
 * Crisp geometric diamond borders and warm earthy palette.
 */
export function createRugTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 768
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return new THREE.CanvasTexture(canvas)
  }

  // Base Linen / Oat woven background
  ctx.fillStyle = '#e8dec8'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Subtle woven fabric noise / micro-texture
  ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
  for (let x = 0; x < canvas.width; x += 4) {
    ctx.fillRect(x, 0, 1, canvas.height)
  }
  for (let y = 0; y < canvas.height; y += 4) {
    ctx.fillRect(0, y, canvas.width, 1)
  }

  // Outer Border Stripe (Terracotta / Warm Hazelnut)
  ctx.strokeStyle = '#9a5b32'
  ctx.lineWidth = 18
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60)

  // Inner Border Stripe (Sage / Muted Charcoal)
  ctx.strokeStyle = '#475569'
  ctx.lineWidth = 6
  ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100)

  // Central Rug Field (Slightly darker sand)
  ctx.fillStyle = '#decfb5'
  ctx.fillRect(60, 60, canvas.width - 120, canvas.height - 120)

  // Draw Repeated Geometric Diamond Pattern in the Center
  const drawDiamond = (cx: number, cy: number, size: number, color: string) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(cx, cy - size)
    ctx.lineTo(cx + size, cy)
    ctx.lineTo(cx, cy + size)
    ctx.lineTo(cx - size, cy)
    ctx.closePath()
    ctx.fill()
  }

  const stepX = 140
  const stepY = 130
  for (let x = 140; x < canvas.width - 120; x += stepX) {
    for (let y = 130; y < canvas.height - 110; y += stepY) {
      // Outer diamond
      drawDiamond(x, y, 42, '#b45309')
      // Inner diamond
      drawDiamond(x, y, 26, '#e8dec8')
      // Center accent dot
      drawDiamond(x, y, 12, '#475569')
    }
  }

  // Top and bottom woven fringes
  ctx.fillStyle = '#fef3c7'
  for (let x = 20; x < canvas.width - 20; x += 8) {
    ctx.fillRect(x, 0, 3, 20)
    ctx.fillRect(x, canvas.height - 20, 3, 20)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.generateMipmaps = true
  return texture
}
