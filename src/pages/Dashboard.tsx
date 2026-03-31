import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { profile } = useAuth()
  const navigate = useNavigate()

  async function handleLogout(): Promise<void> {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">🐾 Zovena</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-500"
          >
            Sign out
          </button>
        </div>
        <p className="text-gray-600">
          Welcome back, <span className="font-medium">{profile?.email}</span>
        </p>
        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
            profile?.role === 'vet'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {profile?.role === 'vet' ? '🩺 Veterinarian' : '🏠 Pet Owner'}
        </span>
        <p className="text-gray-400 text-sm mt-4">Pet profiles coming in Week 2.</p>
      </div>
    </div>
  )
}