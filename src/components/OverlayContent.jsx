import { useState } from 'react'
import { Mail, Phone, ChevronLeft, ChevronRight, Send, ArrowRight, Instagram, X } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function OverlayContent({ activeSection, setActiveSection }) {
  // Projects Data
  const projects = [
    {
      title: 'Application de gestion des étudiants',
      img: 'img/Applicationgestionscolaire.png',
      desc: 'Application permettant de gérer les informations des étudiants (ajout, modification, suppression, recherche...).',
      tags: ['Java', 'Swing', 'POO']
    },
    {
      title: 'Actu SN',
      img: 'img/actusn.png',
      desc: "Développement d'un blog personnel utilisant PHP et les principes de la POO pour partager mes découvertes en informatique et documenter ma progression.",
      tags: ['PHP', 'MySQL', 'POO', 'CSS']
    },
    {
      title: 'Application Mobile Money',
      img: 'img/Applicationmobilemoney.png',
      desc: 'Application permettant de simuler et gérer des transactions financières sécurisées via un système de mobile money.',
      tags: ['Java', 'POO', 'Console']
    },
    {
      title: 'Application Météo',
      img: 'img/meteo-app.png',
      desc: "Application permettant de consulter les prévisions météorologiques suivant la localisation de l'utilisateur.",
      tags: ['React', 'API OpenWeather', 'CSS Modules']
    }
  ]

  // Hobbies Data
  const hobbies = [
    { img: 'img/outfit2.jpeg', label: 'Mode & Expression' },
    { img: 'img/Livre.jpg', label: 'Lecture & Imagination' },
    { img: 'img/Paysage.jpg', label: 'Photographie & Nature' },
    { img: 'img/Bob Marley.jpg', label: 'Musique & Inspiration' },
    { img: 'img/LamineYamal.png', label: 'Passion Football' },
    { img: 'img/paysage2.jpeg', label: 'Grands Espaces' },
    { img: 'img/outfit3.jpeg', label: 'Détails & Esthétique' }
  ]

  // Skills Data
  const skills = [
    {
      name: 'HTML & CSS',
      img: 'img/photohtmlcss.jpg',
      desc: 'Création de pages web modernes, responsive et accessibles. Maîtrise des bases et des animations CSS.'
    },
    {
      name: 'Langage C',
      img: 'img/langage-c.jpg',
      desc: 'Programmation procédurale, gestion de la mémoire, algorithmes et structures de données.'
    },
    {
      name: 'Algorithmique',
      img: 'img/Algorithmique.jpg',
      desc: 'Résolution de problèmes complexes, conception d’algorithmes efficaces, logique et rigueur.'
    },
    {
      name: 'Programmation orientée objet',
      img: 'img/Java-Logo.png',
      desc: "Maîtrise du langage Java et des principes fondamentaux de la POO (héritage, polymorphisme) pour le développement d'applications robustes."
    },
    {
      name: 'PHP',
      img: 'img/PHP-logo.svg.png',
      desc: "Langage côté serveur utilisé pour le développement d'applications web dynamiques, gestion de sessions et bases de données."
    }
  ]

  // State for Project Carousel
  const [projectIndex, setProjectIndex] = useState(0)

  // State for Hobbies Carousel
  const [hobbyIndex, setHobbyIndex] = useState(0)

  // Contact Form State
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSent, setIsSent] = useState(false)

  const handleNextProject = () => setProjectIndex((prev) => (prev + 1) % projects.length)
  const handlePrevProject = () => setProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)

  const handleNextHobby = () => setHobbyIndex((prev) => (prev + 1) % hobbies.length)
  const handlePrevHobby = () => setHobbyIndex((prev) => (prev - 1 + hobbies.length) % hobbies.length)

  // Bouton de fermeture / retour à l'accueil (réutilisable sur chaque panneau)
  const CloseBtn = () => (
    <button
      className="panel-close"
      onClick={() => setActiveSection('accueil')}
      aria-label="Retour à l'accueil"
      title="Retour à l'accueil"
    >
      <X size={18} />
    </button>
  )

  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (formState.name && formState.email && formState.message) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C599B6', '#fff', '#e4ccd9']
      })
      setIsSent(true)
      setTimeout(() => {
        setIsSent(false)
        setFormState({ name: '', email: '', message: '' })
      }, 3000)
    }
  }

  return (
    <>
      {/* 1. ACCUEIL PANEL */}
      <div className={`overlay-panel home-panel ${activeSection === 'accueil' ? 'active' : ''}`}>
        <h1>Bienvenue, je suis <span className="accent">Diatou</span></h1>
        <h2>Étudiante en 2<sup>ème</sup> année de DUT informatique</h2>
        <p>
          Passionnée par l'informatique, j'aime relever des défis techniques, créer des projets concrets et apprendre chaque jour un peu plus.<br/><br/>
          Je cultive aussi mon côté créatif à travers la photographie, la musique, la mode et la lecture.<br/><br/>
          <strong>Ce portfolio est un mélange en 3D de tout ce que j'aime : le code, la création et l'expression personnelle.</strong>
        </p>
        <div className="home-actions">
          <button className="btn btn-primary" onClick={() => setActiveSection('projets')}>
            Voir mes projets <ArrowRight size={16} />
          </button>
          <button className="btn btn-outline" onClick={() => setActiveSection('contact')}>
            Me contacter
          </button>
        </div>
        <div className="socials">
          <a href="https://www.instagram.com/notdiatou/" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="mailto:gayekhadidiatou1234@gmail.com" className="social-icon" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </div>

      {/* 2. COMPÉTENCES PANEL */}
      <div className={`overlay-panel ${activeSection === 'competences' ? 'active' : ''}`}>
        <CloseBtn />
        <h2>Mes <span className="accent">Compétences</span></h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Voici les outils technologiques et méthodologiques que je maîtrise dans le cadre de ma formation en génie informatique.
        </p>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-img-container">
                <img src={skill.img} alt={skill.name} />
              </div>
              <div className="skill-info">
                <h3>{skill.name}</h3>
                <p>{skill.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PROJETS PANEL */}
      <div className={`overlay-panel ${activeSection === 'projets' ? 'active' : ''}`}>
        <CloseBtn />
        <h2>Mes <span className="accent">Projets</span></h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Sélection de projets académiques et personnels réalisés au cours de mon DUT informatique.
        </p>
        
        <div className="project-container">
          <div className="project-carousel">
            <div className="project-img-wrapper">
              <img src={projects[projectIndex].img} alt={projects[projectIndex].title} />
            </div>
            <div className="project-details">
              <h3>{projects[projectIndex].title}</h3>
              <p>{projects[projectIndex].desc}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {projects[projectIndex].tags.map((tag, i) => (
                  <span key={i} style={{
                    fontSize: '0.75rem',
                    background: 'rgba(197, 153, 182, 0.15)',
                    color: 'var(--accent)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(197, 153, 182, 0.3)'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="carousel-controls">
            <button className="carousel-btn" onClick={handlePrevProject} aria-label="Projet précédent">
              <ChevronLeft size={20} />
            </button>
            <div className="carousel-dots">
              {projects.map((_, i) => (
                <div 
                  key={i} 
                  className={`carousel-dot ${i === projectIndex ? 'active' : ''}`}
                  onClick={() => setProjectIndex(i)}
                />
              ))}
            </div>
            <button className="carousel-btn" onClick={handleNextProject} aria-label="Projet suivant">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. PARCOURS PANEL */}
      <div className={`overlay-panel ${activeSection === 'parcours' ? 'active' : ''}`}>
        <CloseBtn />
        <h2>Mon <span className="accent">Parcours</span></h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Mon cheminement académique et les établissements qui m'ont formée aux sciences de l'informatique.
        </p>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-school">École Supérieure Polytechnique de Dakar</span>
              <h3>DUT en Génie Informatique</h3>
              <p>Deuxième année de formation axée sur le développement logiciel, les bases de données, le réseau et la conception de systèmes d'information.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-school">Collège Anne Marie Javouhey</span>
              <h3>Baccalauréat Scientifique</h3>
              <p>Obtention du baccalauréat avec Mention Bien, jetant les bases scientifiques et mathématiques nécessaires pour mes études supérieures.</p>
            </div>
          </div>
        </div>

        <div className="timeline-logos">
          <div className="timeline-logo-wrapper">
            <img src="img/logo_amj.png" alt="Collège Anne Marie Javouhey" />
          </div>
          <div className="timeline-logo-wrapper">
            <img src="img/logoESP.png" alt="École Supérieure Polytechnique" />
          </div>
        </div>
      </div>

      {/* 5. HOBBIES PANEL */}
      <div className={`overlay-panel ${activeSection === 'hobbies' ? 'active' : ''}`}>
        <CloseBtn />
        <h2>Mes <span className="accent">Hobbies</span></h2>
        <p className="hobbies-desc">
          Entre deux sessions de code, j'explore d'autres horizons créatifs. Passionnée par le visuel, je cultive mon sens du détail à travers la photographie, la mode, la musique et la lecture. La pâtisserie est mon terrain d'expérimentation gourmand et le football me rappelle la force de la collectivité et de la détermination.
        </p>

        <div className="hobbies-gallery">
          <img src={hobbies[hobbyIndex].img} alt={hobbies[hobbyIndex].label} />
          <div className="hobbies-caption">
            {hobbies[hobbyIndex].label}
          </div>
        </div>

        <div className="carousel-controls" style={{ marginTop: '1.5rem' }}>
          <button className="carousel-btn" onClick={handlePrevHobby} aria-label="Image précédente">
            <ChevronLeft size={20} />
          </button>
          <div className="carousel-dots">
            {hobbies.map((_, i) => (
              <div 
                key={i} 
                className={`carousel-dot ${i === hobbyIndex ? 'active' : ''}`}
                onClick={() => setHobbyIndex(i)}
              />
            ))}
          </div>
          <button className="carousel-btn" onClick={handleNextHobby} aria-label="Image suivante">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* 6. CONTACT PANEL */}
      <div className={`overlay-panel ${activeSection === 'contact' ? 'active' : ''}`}>
        <CloseBtn />
        <h2>Contactez-moi <span className="accent">en un Clic</span></h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          N'hésitez pas à m'envoyer un message ! Je répondrai dans les plus brefs délais.
        </p>

        {isSent ? (
          <div style={{
            background: 'rgba(197, 153, 182, 0.1)',
            border: '1px solid var(--accent)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            marginTop: '2rem',
            color: '#fff'
          }}>
            <h3 className="accent">Merci beaucoup !</h3>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Votre message a été envoyé avec succès. 💗</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label htmlFor="form-name">Nom complet</label>
              <input 
                id="form-name"
                type="text" 
                className="form-input" 
                placeholder="Votre nom" 
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="form-email">Adresse e-mail</label>
              <input 
                id="form-email"
                type="email" 
                className="form-input" 
                placeholder="nom@exemple.com" 
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="form-message">Message</label>
              <textarea 
                id="form-message"
                className="form-input" 
                placeholder="Votre message ici..." 
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Envoyer <Send size={16} />
            </button>
          </form>
        )}

        <div className="contact-info-list">
          <div className="contact-info-item">
            <span className="contact-info-icon">
              <Mail size={18} />
            </span>
            <div className="contact-info-details">
              <p>Mail</p>
              <a href="mailto:gayekhadidiatou1234@gmail.com">gayekhadidiatou1234@gmail.com</a>
            </div>
          </div>

          <div className="contact-info-item">
            <span className="contact-info-icon">
              <Phone size={18} />
            </span>
            <div className="contact-info-details">
              <p>Téléphone</p>
              <span>+221 78 339 03 36</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
