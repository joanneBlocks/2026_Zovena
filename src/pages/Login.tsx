import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Role } from '../types/index'

const colors = {
  indigo: '#4F46E5',
  teal: '#14B8A6',
  bg: '#F9FAFB',
  card: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  error: '#EF4444',
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('owner')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setError('')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role } },
      })
      if (error) return setError(error.message)
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return setError(error.message)
    }

    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: colors.bg }}>
      <div className="p-8 rounded-2xl shadow-md w-full max-w-md border" style={{ backgroundColor: colors.card, borderColor: colors.border }}>

        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src="/logo.png" alt="Zovena logo" className="h-20 w-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
            style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
            style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
            required
          />

          {isSignUp && (
            <div>
              <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>I am a...</p>
              <div className="flex gap-3">
                {(['owner', 'vet'] as Role[]).map(r => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className="flex-1 py-2 rounded-lg border text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: role === r ? colors.indigo : 'transparent',
                      color: role === r ? '#fff' : colors.textSecondary,
                      borderColor: role === r ? colors.indigo : colors.border,
                    }}
                  >
                    {r === 'owner' ? '🏠 Pet Owner' : '🩺 Veterinarian'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm" style={{ color: colors.error }}>{error}</p>
          )}

          <button
            type="submit"
            className="w-full text-white py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.indigo }}
          >
            {isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm mt-4" style={{ color: colors.textSecondary }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(prev => !prev)}
            className="font-medium hover:underline"
            style={{ color: colors.indigo }}
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>

        {/* Copyright */}
        <p className="text-center text-xs mt-6" style={{ color: colors.textSecondary }}>
          © 2026 Joanne Costo. All rights reserved.
        </p>

      </div>
    </div>
  )
}