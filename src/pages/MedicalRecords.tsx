import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} from '../api/medicalRecords'
import { getPets } from '../api/pets'
import type { MedicalRecord, Pet } from '../types/index'
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
  error: '#EF4444',
  success: '#22C55E',
}

export default function MedicalRecords() {
  const { petId } = useParams<{ petId: string }>()
  const { profile } = useAuth()
  const navigate = useNavigate()

  const [pet, setPet] = useState<Pet | null>(null)
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Add form state
  const [showForm, setShowForm] = useState(false)
  const [notes, setNotes] = useState('')
  const [visitDate, setVisitDate] = useState('')
  const [visitReason, setVisitReason] = useState('')
  const [vaccinations, setVaccinations] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Edit form state
  const [editingRecord, setEditingRecord] = useState<MedicalRecord | null>(null)
  const [editNotes, setEditNotes] = useState('')
  const [editVisitDate, setEditVisitDate] = useState('')
  const [editVisitReason, setEditVisitReason] = useState('')
  const [editVaccinations, setEditVaccinations] = useState('')
  const [editSubmitting, setEditSubmitting] = useState(false)

  useEffect(() => {
    if (petId) {
      fetchData()
    }
  }, [petId])

  async function fetchData(): Promise<void> {
    try {
      const [petsData, recordsData] = await Promise.all([
        getPets(),
        getMedicalRecords(petId!)
      ])
      const foundPet = petsData.find(p => p.id === petId)
      setPet(foundPet ?? null)
      setRecords(recordsData)
    } catch (err) {
      setError('Failed to load data.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateRecord(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    if (!profile || !petId) return
    setSubmitting(true)
    setError('')

    try {
      const newRecord = await createMedicalRecord(
        petId,
        profile.id,
        notes,
        visitDate,
        visitReason,
        vaccinations
      )
      setRecords(prev => [newRecord, ...prev])
      setNotes('')
      setVisitDate('')
      setVisitReason('')
      setVaccinations('')
      setShowForm(false)
    } catch (err) {
      setError('Failed to create record.')
    } finally {
      setSubmitting(false)
    }
  }

  function startEditing(record: MedicalRecord): void {
    setEditingRecord(record)
    setEditNotes(record.notes ?? '')
    setEditVisitDate(record.visit_date ?? '')
    setEditVisitReason(record.visit_reason ?? '')
    setEditVaccinations(record.vaccinations ?? '')
  }

  function cancelEditing(): void {
    setEditingRecord(null)
    setEditNotes('')
    setEditVisitDate('')
    setEditVisitReason('')
    setEditVaccinations('')
  }

  async function handleUpdateRecord(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    if (!editingRecord) return
    setEditSubmitting(true)
    setError('')

    try {
      const updated = await updateMedicalRecord(
        editingRecord.id,
        editNotes,
        editVisitDate,
        editVisitReason,
        editVaccinations
      )
      setRecords(prev => prev.map(r => r.id === updated.id ? updated : r))
      cancelEditing()
    } catch (err) {
      setError('Failed to update record.')
    } finally {
      setEditSubmitting(false)
    }
  }

  async function handleDeleteRecord(id: string): Promise<void> {
    try {
      await deleteMedicalRecord(id)
      setRecords(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      setError('Failed to delete record.')
    }
  }

  function formatDate(dateStr: string | null): string {
    if (!dateStr) return 'No date'
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const recordForm = (
    isEdit: boolean,
    onSubmit: (e: React.FormEvent) => Promise<void>,
    formNotes: string, setFormNotes: (v: string) => void,
    formVisitDate: string, setFormVisitDate: (v: string) => void,
    formVisitReason: string, setFormVisitReason: (v: string) => void,
    formVaccinations: string, setFormVaccinations: (v: string) => void,
    isSubmitting: boolean,
    onCancel: () => void
  ) => (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>
          Visit date
        </label>
        <input
          type="date"
          value={formVisitDate}
          onChange={e => setFormVisitDate(e.target.value)}
          className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
          style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
        />
      </div>
      <div>
        <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>
          Reason for visit
        </label>
        <input
          type="text"
          placeholder="e.g. Annual checkup, injury, illness"
          value={formVisitReason}
          onChange={e => setFormVisitReason(e.target.value)}
          className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
          style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
        />
      </div>
      <div>
        <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>
          Medical notes
        </label>
        <textarea
          placeholder="Diagnosis, treatment, observations..."
          value={formNotes}
          onChange={e => setFormNotes(e.target.value)}
          rows={3}
          className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 resize-none"
          style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
        />
      </div>
      <div>
        <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>
          Vaccinations administered
        </label>
        <input
          type="text"
          placeholder="e.g. Rabies, DHPP, Bordetella"
          value={formVaccinations}
          onChange={e => setFormVaccinations(e.target.value)}
          className="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
          style={{ border: `1px solid ${colors.border}`, color: colors.textPrimary }}
        />
      </div>
      {error && <p className="text-sm" style={{ color: colors.error }}>{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 text-white py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: isEdit ? colors.amber : colors.teal }}
        >
          {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Record'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: colors.textSecondary, border: `1px solid ${colors.border}` }}
        >
          Cancel
        </button>
      </div>
    </form>
  )

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      <Navbar />

      <div className="flex-1 p-6">
        <div className="max-w-lg mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate('/pets')}
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: colors.textSecondary }}
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
              📋 Medical Records
            </h1>
            {profile?.role === 'vet' && (
              <button
                onClick={() => setShowForm(prev => !prev)}
                className="text-sm font-medium text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: colors.teal }}
              >
                {showForm ? 'Cancel' : '+ Add Record'}
              </button>
            )}
            {profile?.role === 'owner' && (
              <div
                className="text-xs font-medium px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: colors.indigo }}
              >
                👁 Read Only
              </div>
            )}
          </div>

          {/* Pet Info */}
          {pet && (
            <div
              className="rounded-2xl p-4 mb-6 border flex items-center gap-4"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
              {pet.photo_url ? (
                <img
                  src={pet.photo_url}
                  alt={pet.name}
                  className="w-14 h-14 rounded-xl object-cover border"
                  style={{ borderColor: colors.border }}
                />
              ) : (
                <span className="text-3xl">🐾</span>
              )}
              <div>
                <p className="font-semibold" style={{ color: colors.textPrimary }}>{pet.name}</p>
                <p className="text-sm capitalize" style={{ color: colors.textSecondary }}>
                  {pet.species}
                </p>
              </div>
            </div>
          )}

          {/* Add Record Form */}
          {showForm && profile?.role === 'vet' && (
            <div
              className="rounded-2xl shadow-sm p-6 mb-6 border"
              style={{ backgroundColor: colors.card, borderColor: colors.teal }}
            >
              <h2 className="text-base font-semibold mb-4" style={{ color: colors.textPrimary }}>
                Add medical record
              </h2>
              {recordForm(
                false,
                handleCreateRecord,
                notes, setNotes,
                visitDate, setVisitDate,
                visitReason, setVisitReason,
                vaccinations, setVaccinations,
                submitting,
                () => setShowForm(false)
              )}
            </div>
          )}

          {/* Edit Record Form */}
          {editingRecord && (
            <div
              className="rounded-2xl shadow-sm p-6 mb-6 border"
              style={{ backgroundColor: colors.card, borderColor: colors.amber }}
            >
              <h2 className="text-base font-semibold mb-4" style={{ color: colors.textPrimary }}>
                ✏️ Edit record
              </h2>
              {recordForm(
                true,
                handleUpdateRecord,
                editNotes, setEditNotes,
                editVisitDate, setEditVisitDate,
                editVisitReason, setEditVisitReason,
                editVaccinations, setEditVaccinations,
                editSubmitting,
                cancelEditing
              )}
            </div>
          )}

          {/* Records List */}
          {loading ? (
            <p className="text-center text-sm" style={{ color: colors.textSecondary }}>
              Loading records...
            </p>
          ) : records.length === 0 ? (
            <div
              className="rounded-2xl p-8 text-center border"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
              <p className="text-4xl mb-3">📋</p>
              <p className="font-medium" style={{ color: colors.textPrimary }}>No records yet</p>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                {profile?.role === 'vet'
                  ? 'Add the first medical record above.'
                  : 'No medical records have been added yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map(record => (
                <div
                  key={record.id}
                  className="rounded-2xl p-5 border shadow-sm"
                  style={{
                    backgroundColor: colors.card,
                    borderColor: editingRecord?.id === record.id ? colors.amber : colors.border
                  }}
                >
                  {/* Record Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold" style={{ color: colors.textPrimary }}>
                        {record.visit_reason ?? 'General visit'}
                      </p>
                      <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                        {formatDate(record.visit_date)}
                      </p>
                      {record.profiles?.email && (
                        <p className="text-xs mt-1" style={{ color: colors.teal }}>
                          Recorded by: {record.profiles.email}
                        </p>
                      )}
                    </div>
                    {profile?.role === 'vet' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(record)}
                          className="text-xs px-3 py-1 rounded-lg transition-opacity hover:opacity-70"
                          style={{ color: colors.amber, border: `1px solid ${colors.amber}` }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteRecord(record.id)}
                          className="text-xs px-3 py-1 rounded-lg transition-opacity hover:opacity-70"
                          style={{ color: colors.error, border: `1px solid ${colors.error}` }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Record Details */}
                  <div className="space-y-2">
                    {record.notes && (
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: colors.bg }}
                      >
                        <p className="text-xs font-medium mb-1" style={{ color: colors.textSecondary }}>
                          Medical notes
                        </p>
                        <p className="text-sm" style={{ color: colors.textPrimary }}>
                          {record.notes}
                        </p>
                      </div>
                    )}
                    {record.vaccinations && (
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: colors.bg }}
                      >
                        <p className="text-xs font-medium mb-1" style={{ color: colors.textSecondary }}>
                          💉 Vaccinations
                        </p>
                        <p className="text-sm" style={{ color: colors.textPrimary }}>
                          {record.vaccinations}
                        </p>
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