import { DIMENSIONS } from './dimensions'
import type { AssessmentResult } from './types'

/* ==================================================================
   Privacy-friendly share card, drawn on a canvas (offline).
   Shows top trait dimensions only — no names, no sensitive answers.
================================================================== */

export const SHARE_WIDTH = 1080
export const SHARE_HEIGHT = 1350

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

export function drawShareCard(
  canvas: HTMLCanvasElement,
  result: AssessmentResult,
): void {
  canvas.width = SHARE_WIDTH
  canvas.height = SHARE_HEIGHT
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Background
  ctx.fillStyle = '#f4f4f1'
  ctx.fillRect(0, 0, SHARE_WIDTH, SHARE_HEIGHT)

  // Header
  ctx.fillStyle = '#1a1c1f'
  ctx.font = "600 40px -apple-system, 'Segoe UI', sans-serif"
  ctx.textBaseline = 'alphabetic'
  ctx.fillText('MY NEURO MAP', 80, 120)

  ctx.fillStyle = '#8b9098'
  ctx.font = "400 24px -apple-system, 'Segoe UI', sans-serif"
  ctx.fillText('NeuroScope · 神经特征地图', 80, 162)

  // Accent rule
  ctx.fillStyle = '#0d8f80'
  roundedRect(ctx, 80, 196, 64, 6, 3)
  ctx.fill()

  // Top six trait dimensions (exclude impairment; it is context, not a trait)
  const items = DIMENSIONS.filter((d) => d.id !== 'impairment')
    .map((d) => ({ meta: d, score: result.dimensionScores[d.id] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)

  const trackX = 80
  const trackW = SHARE_WIDTH - 160
  let y = 290
  const rowH = 132

  for (const item of items) {
    // English label
    ctx.fillStyle = '#575c64'
    ctx.font = "500 27px -apple-system, 'Segoe UI', sans-serif"
    ctx.textAlign = 'left'
    ctx.fillText(item.meta.en, trackX, y)

    // Score
    ctx.fillStyle = '#1a1c1f'
    ctx.font = "600 30px -apple-system, 'Segoe UI', sans-serif"
    ctx.textAlign = 'right'
    ctx.fillText(String(item.score), SHARE_WIDTH - 80, y)

    // Track
    const barY = y + 24
    ctx.fillStyle = '#e2e2db'
    roundedRect(ctx, trackX, barY, trackW, 16, 8)
    ctx.fill()

    // Fill
    const fillW = Math.max(16, Math.round((item.score / 100) * trackW))
    ctx.fillStyle = item.meta.color
    roundedRect(ctx, trackX, barY, fillW, 16, 8)
    ctx.fill()

    y += rowH
  }

  // Footer
  const footerY = SHARE_HEIGHT - 150
  ctx.strokeStyle = '#e2e2db'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(80, footerY)
  ctx.lineTo(SHARE_WIDTH - 80, footerY)
  ctx.stroke()

  ctx.textAlign = 'center'
  ctx.fillStyle = '#575c64'
  ctx.font = "500 26px -apple-system, 'Segoe UI', sans-serif"
  ctx.fillText(
    'Screening profile — not a diagnosis.',
    SHARE_WIDTH / 2,
    footerY + 52,
  )

  ctx.fillStyle = '#8b9098'
  ctx.font = "400 21px -apple-system, 'Segoe UI', sans-serif"
  const date = new Date(result.generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
  ctx.fillText(`${date} · neuroscope`, SHARE_WIDTH / 2, footerY + 90)
}
