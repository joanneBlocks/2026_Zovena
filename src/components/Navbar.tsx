import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const colors = {
  indigo: '#4F46E5',
  teal: '#14B8A6',
  card: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
}

export default function Navbar() {
  const { profile } = useAuth()
  const navigate = useNavigate()

  async function handleLogout(): Promise<void> {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <nav
      className="w-full px-6 py-3 flex justify-between items-center border-b"
      style={{ backgroundColor: colors.card, borderColor: colors.border }}
    >
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/dashboard')}
      >
        <img src="/logo.png" alt="Zovena logo" className="h-12 w-auto" />
      </div>

      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: profile?.role === 'vet' ? colors.teal : colors.indigo }}
        >
          <span>{profile?.role === 'vet' ? '🩺' : '🏠'}</span>
          <span>{profile?.role === 'vet' ? 'Veterinarian' : 'Pet Owner'}</span>
        </span>
        <button
          onClick={handleLogout}
          className="text-sm hover:opacity-70 transition-opacity"
          style={{ color: colors.textSecondary }}
        >
          Sign out
        </button>
      </div>
    </nav>
  )
}