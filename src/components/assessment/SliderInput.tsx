import { useEffect, useState } from 'react'
import type { Item, AnswerValue } from '@/assessment/types'

interface Props {
  item: Item
  value: AnswerValue | undefined
  onChange: (value: number) => void
  onCommit: () => void
}

export function SliderInput({ item, value, onChange, onCommit }: Props) {
  const spec = item.slider!
  const fallback = spec.initial ?? (spec.min + spec.max) / 2
  const [local, setLocal] = useState<number>(
    typeof value === 'number' ? value : fallback,
  )

  useEffect(() => {
    onChange(local)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local])

  return (
    <div className="mt-9">
      <div className="card-flat px-6 py-8 text-center">
        <p className="text-[40px] font-semibold tracking-tight">
          {local}
          <span className="ml-1 text-[16px] font-normal text-muted">{spec.unit}</span>
        </p>
        <input
          type="range"
          className="ns-range mt-6"
          min={spec.min}
          max={spec.max}
          step={spec.step ?? 1}
          value={local}
          aria-label={item.prompt}
          onChange={(e) => setLocal(Number(e.target.value))}
        />
        <div className="mt-2.5 flex justify-between text-[12px] text-subtle">
          <span>{spec.minLabel}</span>
          <span>{spec.maxLabel}</span>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          data-action="continue"
          onClick={onCommit}
          className="rounded-full bg-brand px-6 py-3 text-[14px] font-medium text-white transition hover:bg-brand-strong active:scale-[0.98]"
        >
          继续
        </button>
      </div>
    </div>
  )
}
