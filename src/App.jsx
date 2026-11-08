
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom'

import './App.css'
import Report from './Report'
import Track from './Track'
import Admin from './Admin'
import AdminLogin from './AdminLogin'

// Admin dashboard protection
function ProtectedAdmin() {
  const isLoggedIn = sessionStorage.getItem('adminLoggedIn')

  return isLoggedIn === 'true'
    ? <Admin />
    : <Navigate to="/admin-login" replace />
}

// Home page
function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="tagline">SMART CAMPUS MANAGEMENT</p>

          <h1>
            Make Your Campus <span>Better</span>
          </h1>

          <p className="hero-description">
            Report campus issues, track their progress
            and help create a better learning environment.
          </p>

          <div className="hero-buttons">
            <Link to="/report" className="primary-button">
              Report an Issue
            </Link>

            <a href="#features" className="secondary-button">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <h2>What Can You Do?</h2>

        <p className="section-description">
          Simple tools to make campus problem management easier.
        </p>

        <div className="feature-container">

          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Report Issues</h3>
            <p>
              Submit campus problems easily through
              a simple reporting form.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Track Progress</h3>
            <p>
              Check your complaint status and
              follow its progress.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Admin Management</h3>
            <p>
              Help administrators manage and
              resolve campus issues.
            </p>
          </div>

        </div>
      </section>

      <section className="cta" id="about">
        <h2>Let's Build a Better Campus Together</h2>
        <p>Your voice can make a difference.</p>

        <Link to="/report" className="primary-button">
          Get Started
        </Link>
      </section>
    </>
  )
}

// Main application
function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <nav className="navbar">
          <h2>CampusPulse</h2>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <a href="/#features">Features</a>
            <Link to="/track">Track Issue</Link>
            <Link to="/admin-login">Admin</Link>
          </div>

          <Link to="/report" className="nav-button">
            Get Started
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/report" element={<Report />} />

          <Route path="/track" element={<Track />} />

          <Route path="/admin-login" element={<AdminLogin />} />

          <Route path="/admin" element={<ProtectedAdmin />} />
        </Routes>

        <footer>
          <p>© 2026 CampusPulse. All rights reserved.</p>
        </footer>

      </div>
    </BrowserRouter>
  )
}

export default App
