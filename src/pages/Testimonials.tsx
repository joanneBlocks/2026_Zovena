import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getApprovedTestimonials,
  submitTestimonial,
  uploadTestimonialPhoto,
  type Testimonial,
} from '../api/testimonials'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const colors = {
  indigo: '#4F46E5',
  teal: '#14B8A6',
  amber: '#F59E0B',
  bg: '#F9FAFB',
  card: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  error: '#EF4444',
  success: '#22C55E',
}

export default function Testimonials() {
  const { profile } = useAuth()
  const navigate = useNavigate()

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  const [tName, setTName] = useState('')
  const [tRole, setTRole] = useState('Pet Owner')
  const [tMessage, setTMessage] = useState('')
  const [tPhoto, setTPhoto] = useState<File | null>(null)
  const [tPhotoPreview, setTPhotoPreview] = useState<string | null>(null)
  const [tSubmitting, setTSubmitting] = useState(false)
  const [tSuccess, setTSuccess] = useState(false)
  const [tError, setTError] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchTestimonials()
    if (profile) {
      setTName(profile.display_name ?? '')
      setTRole(profile.role === 'vet' ? 'Veterinarian' : 'Pet Owner')
    }
  }, [profile])

  async function fetchTestimonials(): Promise<void> {
    try {
      const data = await getApprovedTestimonials()
      setTestimonials(data)
    } catch (err) {
      console.error('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0] ?? null
    setTPhoto(file)
    if (file) setTPhotoPreview(URL.createObjectURL(file))
    else setTPhotoPreview(null)
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setTSubmitting(true)
    setTError('')

    try {
      let photoUrl: string | undefined
      if (tPhoto) {
        photoUrl = await uploadTestimonialPhoto(tPhoto)
      }
      await submitTestimonial(tName, tRole, tMessage, photoUrl)
      setTSuccess(true)
      setTMessage('')
      setTPhoto(null)
      setTPhotoPreview(null)
      setShowForm(false)
    } catch (err) {
      setTError('Failed to submit testimonial. Please try again.')
    } finally {
      setTSubmitting(false)
    }
  }

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
              ✍️ Testimonials
            </h1>
            <button
              onClick={() => setShowForm(prev => !prev)}
              className="text-sm font-medium text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: colors.indigo }}
            >
              {showForm ? 'Cancel' : '+ Share yours'}
            </button>
          </div>

          {/* Success Message */}
          {tSuccess && (
            <div
              className="p-4 rounded-xl text-sm mb-6"
              style={{ backgroundColor: `${colors.success}18`, color: colors.success }}
            >
              ✅ Thank you for your testimonial! It will appear after review.
            </div>
          )}

          {/* Submission Form */}
          {showForm && !tSuccess && (
            <div
              className="rounded-2xl shadow-sm p-6 mb-6 border"
              style={{ backgroundColor: colors.card, borderColor: colors.indigo }}
            >
              <h2 className="text-base font-semibold mb-4" style={{ color: colors.textPrimary }}>
                Share your experience
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>
                    Display name
                  </label>
                  <input
                    type="text"
                    placeholder="Your public display name"
                    value={tName}
                    onChange={e => setTName(e.target.value)}
                    className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
                    style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
                    required
                  />
                  <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                    Your email address will never be shown publicly.
                  </p>
                </div>
                <select
                  value={tRole}
                  onChange={e => setTRole(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
                  style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
                >
                  <option value="Pet Owner">🏠 Pet Owner</option>
                  <option value="Veterinarian">🩺 Veterinarian</option>
                  <option value="Animal Care Specialist">🐾 Animal Care Specialist</option>
                  <option value="Pet Lover">❤️ Pet Lover</option>
                </select>
                <textarea
                  placeholder="Share your experience with Zovena..."
                  value={tMessage}
                  onChange={e => setTMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 resize-none"
                  style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
                  required
                />
                <div>
                  <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>
                    Your photo (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full text-sm"
                    style={{ color: colors.textSecondary }}
                  />
                  {tPhotoPreview && (
                    <img
                      src={tPhotoPreview}
                      alt="Preview"
                      className="mt-3 w-16 h-16 rounded-full object-cover border"
                      style={{ borderColor: colors.border }}
                    />
                  )}
                </div>
                {tError && (
                  <p className="text-sm" style={{ color: colors.error }}>{tError}</p>
                )}
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  ℹ️ Your testimonial will be reviewed before it appears on the site.
                </p>
                <button
                  type="submit"
                  disabled={tSubmitting}
                  className="w-full text-white py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: colors.indigo }}
                >
                  {tSubmitting ? 'Submitting...' : 'Submit testimonial'}
                </button>
              </form>
            </div>
          )}

          {/* Approved Testimonials */}
          <div
            className="rounded-2xl p-4 mb-4 border"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
          >
            <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
              💬 Approved testimonials from the community
            </p>
          </div>

          {loading ? (
            <p className="text-center text-sm" style={{ color: colors.textSecondary }}>
              Loading testimonials...
            </p>
          ) : testimonials.length === 0 ? (
            <div
              className="rounded-2xl p-8 text-center border"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
              <p className="text-4xl mb-3">✍️</p>
              <p className="font-medium" style={{ color: colors.textPrimary }}>No testimonials yet</p>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {testimonials.map(testimonial => (
                <div
                  key={testimonial.id}
                  className="p-6 rounded-2xl border"
                  style={{ backgroundColor: colors.card, borderColor: colors.border }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    {testimonial.photo_url ? (
                      <img
                        src={testimonial.photo_url}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border"
                        style={{ borderColor: colors.border }}
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: colors.indigo }}
                      >
                        {testimonial.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-sm" style={{ color: colors.textPrimary }}>
                        {testimonial.name}
                      </p>
                      <p className="text-xs" style={{ color: colors.teal }}>
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="ml-auto text-sm" style={{ color: colors.amber }}>
                      ★★★★★
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                    "{testimonial.message}"
                  </p>
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