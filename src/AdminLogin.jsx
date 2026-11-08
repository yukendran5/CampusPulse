import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'

function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  function handleLogin(event) {
    event.preventDefault()

    // Demo login credentials only
    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem('adminLoggedIn', 'true')
      navigate('/admin')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <div className="login-icon">🔐</div>

        <h1>Admin Login</h1>
        <p>Sign in to manage campus complaints.</p>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default AdminLogin