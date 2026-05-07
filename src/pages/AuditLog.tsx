import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getAuditLogs } from '../api/auditLogs'
import { getPets } from '../api/pets'
import type { AuditLog, Pet } from '../types/index'
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

function getActionColor(action: string): string {
  switch (action) {
    case 'created': return colors.success
    case 'updated': return colors.amber
    case 'deleted': return colors.error
    default: return colors.textSecondary
  }
}

function getActionLabel(action: string): string {
  switch (action) {
    case 'created': return '✅ Created'
    case 'updated': return '✏️ Updated'
    case 'deleted': return '🗑️ Deleted'
    default: return action
  }
}

function formatFieldName(field: string | null): string {
  if (!field) return 'Record'
  switch (field) {
    case 'notes': return 'Medical Notes'
    case 'visit_date': return 'Visit Date'
    case 'visit_reason': return 'Visit Reason'
    case 'vaccinations': return 'Vaccinations'
    case 'medical_record': return 'Medical Record'
    default: return field
  }
}

export default function AuditLog() {
  const { petId } = useParams<{ petId: string }>()
  const { profile } = useAuth()
  const navigate = useNavigate()

  const [pet, setPet] = useState<Pet | null>(null)
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (petId) fetchData()
  }, [petId])

  async function fetchData(): Promise<void> {
    try {
      const [petsData, logsData] = await Promise.all([
        getPets(),
        getAuditLogs(petId!)
      ])
      const foundPet = petsData.find(p => p.id === petId)
      setPet(foundPet ?? null)
      setLogs(logsData)
    } catch (err) {
      setError('Failed to load audit logs.')
    } finally {
      setLoading(false)
    }
  }

  function formatDateTime(dateStr: string): string {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      <Navbar />

      <div className="flex-1 p-6">
        <div className="max-w-lg mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(`/pets/${petId}/records`)}
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: colors.textSecondary }}
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
              📝 Audit Log
            </h1>
            <div
              className="text-xs font-medium px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: colors.indigo }}
            >
              Read Only
            </div>
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

          {/* Info Banner */}
          <div
            className="rounded-2xl p-4 mb-6 border"
            style={{ backgroundColor: `${colors.indigo}10`, borderColor: `${colors.indigo}30` }}
          >
            <p className="text-xs leading-relaxed" style={{ color: colors.indigo }}>
              🔒 This audit log is immutable. Every change made to this pet's medical records is permanently recorded here for compliance and accountability.
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm mb-4" style={{ color: colors.error }}>{error}</p>
          )}

          {/* Logs */}
          {loading ? (
            <p className="text-center text-sm" style={{ color: colors.textSecondary }}>
              Loading audit logs...
            </p>
          ) : logs.length === 0 ? (
            <div
              className="rounded-2xl p-8 text-center border"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
              <p className="text-4xl mb-3">📝</p>
              <p className="font-medium" style={{ color: colors.textPrimary }}>No activity yet</p>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                Audit logs will appear here once medical records are created or updated.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div
                  key={log.id}
                  className="rounded-2xl p-5 border"
                  style={{ backgroundColor: colors.card, borderColor: colors.border }}
                >
                  {/* Log Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                        style={{ backgroundColor: getActionColor(log.action) }}
                      >
                        {getActionLabel(log.action)}
                      </span>
                      <span
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ backgroundColor: `${colors.indigo}15`, color: colors.indigo }}
                      >
                        {formatFieldName(log.field_changed)}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: colors.textSecondary }}>
                      #{logs.length - index}
                    </span>
                  </div>

                  {/* Who & When */}
                  <div className="mb-3">
                    <p className="text-xs" style={{ color: colors.teal }}>
                      By: {log.profiles?.email ?? 'Unknown'}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>
                      {formatDateTime(log.created_at)}
                    </p>
                  </div>

                  {/* Changes */}
                  {log.action === 'updated' && (
                    <div className="space-y-2">
                      {log.old_value && (
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${colors.error}10` }}
                        >
                          <p className="text-xs font-medium mb-1" style={{ color: colors.error }}>
                            Before
                          </p>
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: colors.textPrimary, whiteSpace: 'pre-wrap' }}
                          >
                            {log.old_value}
                          </p>
                        </div>
                      )}
                      {log.new_value && (
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${colors.success}10` }}
                        >
                          <p className="text-xs font-medium mb-1" style={{ color: colors.success }}>
                            After
                          </p>
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: colors.textPrimary, whiteSpace: 'pre-wrap' }}
                          >
                            {log.new_value}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {log.action === 'created' && log.new_value && (
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${colors.success}10` }}
                    >
                      <p className="text-xs font-medium mb-1" style={{ color: colors.success }}>
                        Record created
                      </p>
                      <p className="text-xs" style={{ color: colors.textPrimary }}>
                        {log.new_value}
                      </p>
                    </div>
                  )}

                  {log.action === 'deleted' && log.old_value && (
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${colors.error}10` }}
                    >
                      <p className="text-xs font-medium mb-1" style={{ color: colors.error }}>
                        Record deleted
                      </p>
                      <p className="text-xs" style={{ color: colors.textPrimary }}>
                        {log.old_value}
                      </p>
                    </div>
                  )}
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