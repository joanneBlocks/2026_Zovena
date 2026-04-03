import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getPets, createPet, updatePet, deletePet, uploadPetPhoto } from '../api/pets'
import type { Pet } from '../types/index'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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

  // Add form state
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [ageYears, setAgeYears] = useState('')
  const [ageMonths, setAgeMonths] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Edit form state
  const [editingPet, setEditingPet] = useState<Pet | null>(null)
  const [editName, setEditName] = useState('')
  const [editSpecies, setEditSpecies] = useState('')
  const [editAgeYears, setEditAgeYears] = useState('')
  const [editAgeMonths, setEditAgeMonths] = useState('')
  const [editPhoto, setEditPhoto] = useState<File | null>(null)
  const [editPhotoPreview, setEditPhotoPreview] = useState<string | null>(null)
  const [editSubmitting, setEditSubmitting] = useState(false)

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

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0] ?? null
    setPhoto(file)
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
    } else {
      setPhotoPreview(null)
    }
  }

  function handleEditPhotoChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0] ?? null
    setEditPhoto(file)
    if (file) {
      setEditPhotoPreview(URL.createObjectURL(file))
    } else {
      setEditPhotoPreview(null)
    }
  }

  function startEditing(pet: Pet): void {
    setEditingPet(pet)
    setEditName(pet.name)
    setEditSpecies(pet.species)
    setEditAgeYears(pet.age_years.toString())
    setEditAgeMonths(pet.age_months.toString())
    setEditPhotoPreview(pet.photo_url)
    setEditPhoto(null)
  }

  function cancelEditing(): void {
    setEditingPet(null)
    setEditName('')
    setEditSpecies('')
    setEditAgeYears('')
    setEditAgeMonths('')
    setEditPhoto(null)
    setEditPhotoPreview(null)
  }

  async function handleCreatePet(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    if (!profile) return
    setSubmitting(true)
    setError('')

    try {
      let photoUrl: string | undefined
      if (photo) {
        photoUrl = await uploadPetPhoto(photo, profile.id)
      }

      const newPet = await createPet(
        name,
        species,
        parseInt(ageYears) || 0,
        parseInt(ageMonths) || 0,
        profile.id,
        photoUrl
      )
      setPets(prev => [newPet, ...prev])
      setName('')
      setSpecies('')
      setAgeYears('')
      setAgeMonths('')
      setPhoto(null)
      setPhotoPreview(null)
      setShowForm(false)
    } catch (err) {
      setError('Failed to create pet.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleUpdatePet(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    if (!editingPet || !profile) return
    setEditSubmitting(true)
    setError('')

    try {
      let photoUrl: string | null | undefined = undefined
      if (editPhoto) {
        photoUrl = await uploadPetPhoto(editPhoto, profile.id)
      }

      const updated = await updatePet(
        editingPet.id,
        editName,
        editSpecies,
        parseInt(editAgeYears) || 0,
        parseInt(editAgeMonths) || 0,
        photoUrl
      )
      setPets(prev => prev.map(p => p.id === updated.id ? updated : p))
      cancelEditing()
    } catch (err) {
      setError('Failed to update pet.')
    } finally {
      setEditSubmitting(false)
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
    'guinea pig': '🐹',
    hedgehog: '🦔',
    gecko: '🦎',
    chinchilla: '🐭',
    'sugar glider': '🐿️',
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

  const pageTitle = profile?.role === 'vet' ? '🏥 All Pets' : '🐾 My Pets'

  const speciesOptions = (
    <>
      <option value="" disabled>Select species</option>
      <option value="dog">🐕 Dog</option>
      <option value="cat">🐈 Cat</option>
      <option value="bird">🐦 Bird</option>
      <option value="rabbit">🐇 Rabbit</option>
      <option value="fish">🐟 Fish</option>
      <option value="hamster">🐹 Hamster</option>
      <option value="guinea pig">🐹 Guinea Pig</option>
      <option value="hedgehog">🦔 Hedgehog</option>
      <option value="gecko">🦎 Gecko</option>
      <option value="chinchilla">🐭 Chinchilla</option>
      <option value="sugar glider">🐿️ Sugar Glider</option>
      <option value="other">🐾 Other</option>
    </>
  )

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      <Navbar />

      <div className="flex-1 p-6">
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
              {pageTitle}
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
                  {speciesOptions}
                </select>
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
                <div>
                  <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>
                    Pet photo (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full text-sm"
                    style={{ color: colors.textSecondary }}
                  />
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="mt-3 w-24 h-24 rounded-xl object-cover border"
                      style={{ borderColor: colors.border }}
                    />
                  )}
                </div>
                {error && <p className="text-sm" style={{ color: colors.error }}>{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full text-white py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: colors.indigo }}
                >
                  {submitting ? 'Uploading...' : 'Add Pet'}
                </button>
              </form>
            </div>
          )}

          {/* Edit Pet Form */}
          {editingPet && (
            <div
              className="rounded-2xl shadow-sm p-6 mb-6 border"
              style={{ backgroundColor: colors.card, borderColor: colors.amber }}
            >
              <h2 className="text-base font-semibold mb-4" style={{ color: colors.textPrimary }}>
                ✏️ Edit {editingPet.name}
              </h2>
              <form onSubmit={handleUpdatePet} className="space-y-3">
                <input
                  type="text"
                  placeholder="Pet name"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
                  style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
                  required
                />
                <select
                  value={editSpecies}
                  onChange={e => setEditSpecies(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
                  style={{
                    border: `1px solid ${colors.border}`,
                    color: colors.textPrimary
                  }}
                  required
                >
                  {speciesOptions}
                </select>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Years"
                    value={editAgeYears}
                    onChange={e => setEditAgeYears(e.target.value)}
                    className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
                    min="0"
                    max="100"
                  />
                  <input
                    type="number"
                    placeholder="Months"
                    value={editAgeMonths}
                    onChange={e => setEditAgeMonths(e.target.value)}
                    className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
                    min="0"
                    max="11"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>
                    Update photo (optional)
                  </label>
                  {editPhotoPreview && (
                    <img
                      src={editPhotoPreview}
                      alt="Current"
                      className="mb-2 w-24 h-24 rounded-xl object-cover border"
                      style={{ borderColor: colors.border }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditPhotoChange}
                    className="w-full text-sm"
                    style={{ color: colors.textSecondary }}
                  />
                </div>
                {error && <p className="text-sm" style={{ color: colors.error }}>{error}</p>}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={editSubmitting}
                    className="flex-1 text-white py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: colors.amber }}
                  >
                    {editSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="flex-1 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-70"
                    style={{ color: colors.textSecondary, border: `1px solid ${colors.border}` }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Pet List */}
          {loading ? (
            <p className="text-center text-sm" style={{ color: colors.textSecondary }}>
              Loading pets...
            </p>
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
                  className="rounded-2xl p-5 border shadow-sm"
                  style={{
                    backgroundColor: colors.card,
                    borderColor: editingPet?.id === pet.id ? colors.amber : colors.border
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {pet.photo_url ? (
                        <img
                          src={pet.photo_url}
                          alt={pet.name}
                          className="w-14 h-14 rounded-xl object-cover border"
                          style={{ borderColor: colors.border }}
                        />
                      ) : (
                        <span className="text-3xl">{getEmoji(pet.species)}</span>
                      )}
                      <div>
                        <p className="font-semibold" style={{ color: colors.textPrimary }}>
                          {pet.name}
                        </p>
                        <p className="text-sm capitalize" style={{ color: colors.textSecondary }}>
                          {pet.species} · {formatAge(pet.age_years, pet.age_months)}
                        </p>
                        {profile?.role === 'vet' && pet.profiles?.email && (
                          <p className="text-xs mt-1" style={{ color: colors.teal }}>
                            Owner: {pet.profiles.email}
                          </p>
                        )}
                      </div>
                    </div>
                    {profile?.role === 'owner' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(pet)}
                          className="text-xs px-3 py-1 rounded-lg transition-opacity hover:opacity-70"
                          style={{ color: colors.amber, border: `1px solid ${colors.amber}` }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePet(pet.id)}
                          className="text-xs px-3 py-1 rounded-lg transition-opacity hover:opacity-70"
                          style={{ color: colors.error, border: `1px solid ${colors.error}` }}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  )
}