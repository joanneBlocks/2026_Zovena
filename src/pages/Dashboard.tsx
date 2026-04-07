import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const colors = {
  indigo: '#4F46E5',
  teal: '#14B8A6',
  amber: '#F59E0B',
  coral: '#FB7185',
  bg: '#F9FAFB',
  card: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
}

export default function Dashboard() {
  const { profile } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      <Navbar />

      <div className="flex-1 p-6">
        <div className="max-w-lg mx-auto rounded-2xl shadow-md p-6 border" style={{ backgroundColor: colors.card, borderColor: colors.border }}>

          <p className="text-sm" style={{ color: colors.textSecondary }}>Welcome back,</p>
          <p className="font-medium" style={{ color: colors.textPrimary }}>{profile?.email}</p>

          <div
            className="inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: profile?.role === 'vet' ? colors.teal : colors.indigo }}
          >
            <span>{profile?.role === 'vet' ? '🩺' : '🏠'}</span>
            <span>{profile?.role === 'vet' ? 'Veterinarian' : 'Pet Owner'}</span>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => navigate('/pets')}
              className="w-full p-4 rounded-xl border text-left transition-opacity hover:opacity-80"
              style={{ backgroundColor: colors.bg, borderColor: colors.border }}
            >
              <p className="font-medium" style={{ color: colors.textPrimary }}>🐾 Pet Profiles</p>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                {profile?.role === 'owner' ? 'View and manage your pets' : 'View all registered pets'}
              </p>
            </button>

            <button
              onClick={() => navigate('/pets')}
              className="w-full p-4 rounded-xl border text-left transition-opacity hover:opacity-80"
              style={{ backgroundColor: colors.bg, borderColor: colors.border }}
            >
              <p className="font-medium" style={{ color: colors.textPrimary }}>📋 Medical Records</p>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                {profile?.role === 'vet' ? 'Manage pet medical records' : 'View your pets\' medical records'}
              </p>
            </button>

            <button
              onClick={() => navigate('/testimonials')}
              className="w-full p-4 rounded-xl border text-left transition-opacity hover:opacity-80"
              style={{ backgroundColor: colors.bg, borderColor: colors.border }}
            >
              <p className="font-medium" style={{ color: colors.textPrimary }}>✍️ Testimonials</p>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                Share your experience with Zovena
              </p>
            </button>

            <div
              className="w-full p-4 rounded-xl border text-left opacity-40"
              style={{ backgroundColor: colors.bg, borderColor: colors.border }}
            >
              <p className="font-medium" style={{ color: colors.textPrimary }}>📝 Audit Log</p>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>Coming in Week 4</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}