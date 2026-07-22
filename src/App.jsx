import { useState, useEffect } from 'react'
import Scene3D from './components/Scene3D'
import OverlayContent from './components/OverlayContent'
import { Info, HelpCircle } from 'lucide-react'

export default function App() {
  const [activeSection, setActiveSection] = useState('accueil')
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Fast aesthetic loading effect for 3D compiling
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const sections = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'competences', label: 'Compétences' },
    { id: 'projets', label: 'Projets' },
    { id: 'parcours', label: 'Parcours académique' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'contact', label: 'Contact' }
  ]

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div className="loading-screen" style={{ opacity: loading ? 1 : 0 }}>
          <div className="loader"></div>
          <div className="loading-text">CHARGEMENT DE L'ESPACE 3D...</div>
        </div>
      )}

      {/* Main App */}
      <div className="app-container">
        <header>
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick('accueil') }}>
            <span>✦</span>
          </a>
          
          {/* Hamburger Icon for Mobile */}
          <button 
            className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Nav Links */}
          <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`nav-link ${activeSection === sec.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(sec.id)
                }}
              >
                {sec.label}
              </a>
            ))}
          </nav>
        </header>

        {/* 2D overlays that change depending on selected section */}
        <OverlayContent activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Vertical section indicator (progress dots) */}
        <nav className="section-dots" aria-label="Navigation des sections">
          {sections.map((sec) => (
            <button
              key={sec.id}
              className={`section-dot ${activeSection === sec.id ? 'active' : ''}`}
              onClick={() => handleNavClick(sec.id)}
              aria-label={sec.label}
              aria-current={activeSection === sec.id}
            >
              <span className="section-dot-label">{sec.label}</span>
            </button>
          ))}
        </nav>

        {/* Dynamic 3D Interaction Hints */}
        <div className="hint-overlay">
          <HelpCircle size={16} className="accent" />
          <span>
            {activeSection === 'accueil' 
              ? 'Glissez pour tourner • Cliquez sur un objet pour zoomer' 
              : 'Cliquez sur la croix ou le logo pour revenir'}
          </span>
        </div>
      </div>

      {/* 3D Scene canvas */}
      <Scene3D activeSection={activeSection} setActiveSection={setActiveSection} />
    </>
  )
}
