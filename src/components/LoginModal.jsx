import { useEffect, useState } from 'react'

function LoginModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resetStatus, setResetStatus] = useState('')

  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      setMode('login')
      setResetStatus('')
    }
  }, [isOpen])

  const handleLoginSubmit = (event) => {
    event.preventDefault()
  }

  const handleResetSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) {
      setResetStatus('Please enter your email to receive a reset link.')
      return
    }
    setResetStatus(`Reset link sent to ${email}`)
  }

  if (!isOpen) return null

  const isLogin = mode === 'login'

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Log in to your account">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__panel">
        <button className="modal__close" type="button" onClick={onClose} aria-label="Close login form">
          ×
        </button>
        <div className="modal__body">
          <h3>{isLogin ? 'Welcome back' : 'Reset your password'}</h3>
          <p>{isLogin ? 'Log in to retrieve saved addresses and favorites.' : 'Enter your email and we will send a reset link.'}</p>
          {isLogin ? (
            <form className="modal__form" onSubmit={handleLoginSubmit}>
              <label>
                <span>Email</span>
                <input type="email" required placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <label>
                <span>Password</span>
                <input type="password" required placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} />
              </label>
              <button className="btn btn--primary" type="submit">
                Log in
              </button>
              <button className="modal__forgot" type="button" onClick={() => setMode('reset')}>
                Forgot password?
              </button>
            </form>
          ) : (
            <form className="modal__form" onSubmit={handleResetSubmit}>
              <label>
                <span>Email</span>
                <input type="email" required placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <button className="btn btn--primary" type="submit">
                Send reset email
              </button>
              {resetStatus && <p className="modal__helper">{resetStatus}</p>}
              <button className="modal__forgot" type="button" onClick={() => setMode('login')}>
                Back to login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginModal
