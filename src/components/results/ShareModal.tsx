import { useEffect, useRef } from 'react'
import { Modal } from '@/components/ui/Modal'
import { drawShareCard } from '@/assessment/share'
import type { AssessmentResult } from '@/assessment/types'

interface Props {
  open: boolean
  onClose: () => void
  result: AssessmentResult
}

export function ShareModal({ open, onClose, result }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (open && canvasRef.current) {
      drawShareCard(canvasRef.current, result)
    }
  }, [open, result])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'my-neuro-map.png'
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  return (
    <Modal open={open} onClose={onClose} title="分享我的 Neuro Map">
      <div className="px-5 py-6 sm:px-8">
        <p className="text-[12.5px] leading-relaxed text-subtle">
          分享卡只包含维度指数，不包含姓名、具体回答或其他敏感信息。
        </p>

        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          <canvas
            ref={canvasRef}
            className="block h-auto w-full"
            aria-label="Neuro Map 分享卡预览"
          />
        </div>
      </div>

      <div className="no-print sticky bottom-0 flex items-center justify-end gap-3 border-t border-line bg-surface px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-line px-5 py-2.5 text-[13px] text-muted transition hover:text-ink"
        >
          关闭
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="rounded-full bg-brand px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-brand-strong"
        >
          下载 PNG
        </button>
      </div>
    </Modal>
  )
}
