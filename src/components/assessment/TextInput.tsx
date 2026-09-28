import { useEffect, useState } from 'react'
import type { Item, AnswerValue } from '@/assessment/types'

interface Props {
  item: Item
  value: AnswerValue | undefined
  onChange: (value: string) => void
  onCommit: () => void
}

export function TextInput({ item, value, onChange, onCommit }: Props) {
  const [local, setLocal] = useState<string>(typeof value === 'string' ? value : '')

  useEffect(() => {
    onChange(local)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local])

  return (
    <div className="mt-7">
      <textarea
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        rows={5}
        placeholder="在这里写下你最想说的……（可以留空）"
        aria-label={item.prompt}
        className="w-full resize-none rounded-2xl border border-line bg-surface px-5 py-4 text-[14.5px] leading-relaxed placeholder:text-subtle focus:border-brand"
      />
      <div className="mt-4 flex items-center justify-between">
        <p className="text-[12px] text-subtle">选填，仅保存在本设备。</p>
        <button
          type="button"
          data-action="continue"
          onClick={onCommit}
          className="rounded-full bg-brand px-6 py-3 text-[14px] font-medium text-white transition hover:bg-brand-strong active:scale-[0.98]"
        >
          {local.trim() ? '继续' : '跳过'}
        </button>
      </div>
    </div>
  )
}
