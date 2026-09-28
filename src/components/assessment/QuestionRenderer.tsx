import type { AnswerValue, Item } from '@/assessment/types'
import { OptionCards } from './OptionCards'
import { TimelineSelector } from './TimelineSelector'
import { SliderInput } from './SliderInput'
import { MultiSelect } from './MultiSelect'
import { ChoiceCards } from './ChoiceCards'
import { TextInput } from './TextInput'
import { ImpairmentGrid } from './ImpairmentGrid'

interface Props {
  item: Item
  value: AnswerValue | undefined
  setAnswer: (id: string, value: AnswerValue) => void
  advance: () => void
}

const AUTO_ADVANCE_DELAY = 300

export function QuestionRenderer({ item, value, setAnswer, advance }: Props) {
  const autoSelect = (v: AnswerValue) => {
    setAnswer(item.id, v)
    window.setTimeout(advance, AUTO_ADVANCE_DELAY)
  }

  switch (item.type) {
    case 'frequency':
    case 'agreement':
      return (
        <OptionCards item={item} value={value} onSelect={(v) => autoSelect(v)} />
      )

    case 'scenario':
      return (
        <OptionCards
          item={item}
          value={value}
          variant="grid"
          onSelect={(v) => autoSelect(v)}
        />
      )

    case 'timeline':
      return (
        <TimelineSelector item={item} value={value} onSelect={(v) => autoSelect(v)} />
      )

    case 'choice':
      return (
        <ChoiceCards item={item} value={value} onSelect={(v) => autoSelect(v)} />
      )

    case 'slider':
      return (
        <SliderInput
          item={item}
          value={value}
          onChange={(v) => setAnswer(item.id, v)}
          onCommit={advance}
        />
      )

    case 'multi':
      return (
        <MultiSelect
          item={item}
          value={value}
          onChange={(v) => setAnswer(item.id, v)}
          onCommit={advance}
        />
      )

    case 'text':
      return (
        <TextInput
          item={item}
          value={value}
          onChange={(v) => setAnswer(item.id, v)}
          onCommit={advance}
        />
      )

    case 'impairmentGrid':
      return (
        <ImpairmentGrid
          item={item}
          value={value}
          onChange={(v) => setAnswer(item.id, v)}
          onCommit={advance}
        />
      )
  }
}
