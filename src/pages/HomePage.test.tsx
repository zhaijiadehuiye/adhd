import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './HomePage'
import { useAssessmentStore } from '@/store/useAssessmentStore'

function renderHome() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

describe('HomePage', () => {
  it('renders hero headline, CTA and meta info', () => {
    renderHome()
    expect(
      screen.getByText(/还是这个世界已经把你耗尽了？/),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/开始我的神经特征地图/).length).toBeGreaterThan(0)
    expect(screen.getByText(/约 8–12 分钟/)).toBeInTheDocument()
  })

  it('clear-data button resets the store', async () => {
    useAssessmentStore.getState().setAnswer('b_attention', 0.75)
    renderHome()
    await userEvent.click(screen.getAllByText(/清除我的全部测试数据/)[0])
    expect(useAssessmentStore.getState().answers).toEqual({})
  })
})
