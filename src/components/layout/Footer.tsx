import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[var(--canvas)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-x-3 gap-y-0.5 px-4 py-2 text-center text-[11.5px] leading-tight text-subtle sm:justify-between sm:text-left">
        <p>
          本工具用于自我了解与初步筛查，<span className="text-muted">不能替代医疗诊断。</span>
        </p>
        <p className="hidden items-center gap-3 sm:flex">
          <Link to="/science" className="hover:text-muted">
            科学依据
          </Link>
          <span aria-hidden>·</span>
          <span>数据仅保存在本设备</span>
        </p>
      </div>
    </footer>
  )
}
