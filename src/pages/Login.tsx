import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Role } from '../types/index'

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">🐾 Zovena</h1>
        <p className="text-gray-500 mb-6 text-sm">Pet Wellness Platform</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          {isSignUp && (
            <div>
              <p className="text-sm text-gray-600 mb-2">I am a...</p>
              <div className="flex gap-3">
                {(['owner', 'vet'] as Role[]).map(r => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      role === r
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'text-gray-600 border-gray-300 hover:border-indigo-400'
                    }`}
                  >
                    {r === 'owner' ? '🏠 Pet Owner' : '🩺 Veterinarian'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            {isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600 font-medium hover:underline"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  )
}