import { Link, NavLink } from 'react-router-dom'
import { LogoMark } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/cn'

const links = [
  { to: '/', label: '首页' },
  { to: '/science', label: '科学依据' },
]

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[var(--canvas)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" aria-label="NeuroScope 首页">
          <LogoMark size={26} />
          <span className="text-[15px] font-semibold tracking-tight">
            NeuroScope
            <span className="ml-1.5 hidden text-[13px] font-normal text-muted sm:inline">
              神经特征地图
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3 py-1.5 text-[13.5px] transition',
                  isActive
                    ? 'text-ink bg-surface-2'
                    : 'text-muted hover:text-ink',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
