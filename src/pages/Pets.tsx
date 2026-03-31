import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getPets, createPet, deletePet } from '../api/pets'
import type { Pet } from '../types/index'

const colors = {
  indigo: '#4F46E5',
  teal: '#14B8A6',
  coral: '#FB7185',
  amber: '#F59E0B',
  bg: '#F9FAFB',
  card: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  error: '#EF4444',
  success: '#22C55E',
}

export default function Pets() {
  const { profile } = useAuth()
  const navigate = useNavigate()

  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [ageYears, setAgeYears] = useState('')
  const [ageMonths, setAgeMonths] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPets()
  }, [])

  async function fetchPets(): Promise<void> {
    try {
      const data = await getPets()
      setPets(data)
    } catch (err) {
      setError('Failed to load pets.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreatePet(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    if (!profile) return
    setSubmitting(true)
    setError('')

    try {
      const newPet = await createPet(
        name,
        species,
        parseInt(ageYears) || 0,
        parseInt(ageMonths) || 0,
        profile.id
      )
      setPets(prev => [newPet, ...prev])
      setName('')
      setSpecies('')
      setAgeYears('')
      setAgeMonths('')
      setShowForm(false)
    } catch (err) {
      setError('Failed to create pet.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeletePet(id: string): Promise<void> {
    try {
      await deletePet(id)
      setPets(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError('Failed to delete pet.')
    }
  }

  const speciesEmoji: Record<string, string> = {
    dog: '🐕',
    cat: '🐈',
    bird: '🐦',
    rabbit: '🐇',
    fish: '🐟',
    hamster: '🐹',
    other: '🐾',
  }

  function getEmoji(species: string): string {
    return speciesEmoji[species.toLowerCase()] ?? '🐾'
  }

  function formatAge(years: number, months: number): string {
    if (years === 0 && months === 0) return 'Age unknown'
    if (years === 0) return `${months} ${months === 1 ? 'month' : 'months'} old`
    if (months === 0) return `${years} ${years === 1 ? 'year' : 'years'} old`
    return `${years} ${years === 1 ? 'year' : 'years'}, ${months} ${months === 1 ? 'month' : 'months'} old`
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm hover:opacity-70 transition-opacity"
            style={{ color: colors.textSecondary }}
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
            🐾 My Pets
          </h1>
          {profile?.role === 'owner' && (
            <button
              onClick={() => setShowForm(prev => !prev)}
              className="text-sm font-medium text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: colors.indigo }}
            >
              {showForm ? 'Cancel' : '+ Add Pet'}
            </button>
          )}
          {profile?.role === 'vet' && (
            <div
              className="text-xs font-medium px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: colors.teal }}
            >
              🩺 Vet View
            </div>
          )}
        </div>

        {/* Add Pet Form */}
        {showForm && profile?.role === 'owner' && (
          <div
            className="rounded-2xl shadow-sm p-6 mb-6 border"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
          >
            <h2 className="text-base font-semibold mb-4" style={{ color: colors.textPrimary }}>
              Add a new pet
            </h2>
            <form onSubmit={handleCreatePet} className="space-y-3">
              <input
                type="text"
                placeholder="Pet name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
                style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
                required
              />
              <select
                value={species}
                onChange={e => setSpecies(e.target.value)}
                className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
                style={{
                  border: `1px solid ${colors.border}`,
                  color: species ? colors.textPrimary : colors.textSecondary
                }}
                required
              >
                <option value="" disabled>Select species</option>
                <option value="dog">🐕 Dog</option>
                <option value="cat">🐈 Cat</option>
                <option value="bird">🐦 Bird</option>
                <option value="rabbit">🐇 Rabbit</option>
                <option value="fish">🐟 Fish</option>
                <option value="hamster">🐹 Hamster</option>
                <option value="other">🐾 Other</option>
              </select>

              {/* Age fields */}
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Years"
                  value={ageYears}
                  onChange={e => setAgeYears(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
                  style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
                  min="0"
                  max="100"
                />
                <input
                  type="number"
                  placeholder="Months"
                  value={ageMonths}
                  onChange={e => setAgeMonths(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
                  style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
                  min="0"
                  max="11"
                />
              </div>

              {error && <p className="text-sm" style={{ color: colors.error }}>{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full text-white py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: colors.indigo }}
              >
                {submitting ? 'Adding...' : 'Add Pet'}
              </button>
            </form>
          </div>
        )}

        {/* Pet List */}
        {loading ? (
          <p className="text-center text-sm" style={{ color: colors.textSecondary }}>Loading pets...</p>
        ) : pets.length === 0 ? (
          <div
            className="rounded-2xl p-8 text-center border"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
          >
            <p className="text-4xl mb-3">🐾</p>
            <p className="font-medium" style={{ color: colors.textPrimary }}>No pets yet</p>
            <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
              {profile?.role === 'owner' ? 'Add your first pet above!' : 'No pets registered yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pets.map(pet => (
              <div
                key={pet.id}
                className="rounded-2xl p-5 border shadow-sm flex justify-between items-center"
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{getEmoji(pet.species)}</span>
                  <div>
                    <p className="font-semibold" style={{ color: colors.textPrimary }}>{pet.name}</p>
                    <p className="text-sm capitalize" style={{ color: colors.textSecondary }}>
                      {pet.species} · {formatAge(pet.age_years, pet.age_months)}
                    </p>
                  </div>
                </div>
                {profile?.role === 'owner' && (
                  <button
                    onClick={() => handleDeletePet(pet.id)}
                    className="text-xs px-3 py-1 rounded-lg transition-opacity hover:opacity-70"
                    style={{ color: colors.error, border: `1px solid ${colors.error}` }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}