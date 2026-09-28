import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import HomePage from '@/pages/HomePage'
import AssessmentPage from '@/pages/AssessmentPage'
import ResultsPage from '@/pages/ResultsPage'
import SciencePage from '@/pages/SciencePage'

export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-dvh flex-col">
        <Nav />
        <main className="flex-1 pb-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/science" element={<SciencePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
