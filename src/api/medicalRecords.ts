import { supabase } from '../lib/supabase'
import type { MedicalRecord } from '../types/index'
import { createAuditLog } from './auditLogs'

export async function getMedicalRecords(petId: string): Promise<MedicalRecord[]> {
  const { data, error } = await supabase
    .from('medical_records')
    .select('*, profiles(email)')
    .eq('pet_id', petId)
    .order('visit_date', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function createMedicalRecord(
  petId: string,
  createdBy: string,
  notes: string,
  visitDate: string,
  visitReason: string,
  vaccinations: string
): Promise<MedicalRecord> {
  const { data, error } = await supabase
    .from('medical_records')
    .insert({
      pet_id: petId,
      created_by: createdBy,
      notes: notes || null,
      visit_date: visitDate || null,
      visit_reason: visitReason || null,
      vaccinations: vaccinations || null,
    })
    .select('*, profiles(email)')
    .single()

  if (error) throw error

  // Log the creation
  await createAuditLog(
    petId,
    data.id,
    createdBy,
    'created',
    'medical_record',
    undefined,
    visitReason || 'New medical record'
  )

  return data
}

export async function updateMedicalRecord(
  id: string,
  notes: string,
  visitDate: string,
  visitReason: string,
  vaccinations: string,
  petId: string,
  editedBy: string,
  oldRecord: MedicalRecord
): Promise<MedicalRecord> {
  const { data, error } = await supabase
    .from('medical_records')
    .update({
      notes: notes || null,
      visit_date: visitDate || null,
      visit_reason: visitReason || null,
      vaccinations: vaccinations || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*, profiles(email)')

  if (error) throw error
  if (!data || data.length === 0) throw new Error('No data returned')

  // Log each changed field
  if (oldRecord.notes !== notes) {
    await createAuditLog(petId, id, editedBy, 'updated', 'notes', oldRecord.notes ?? '', notes)
  }
  if (oldRecord.visit_date !== visitDate) {
    await createAuditLog(petId, id, editedBy, 'updated', 'visit_date', oldRecord.visit_date ?? '', visitDate)
  }
  if (oldRecord.visit_reason !== visitReason) {
    await createAuditLog(petId, id, editedBy, 'updated', 'visit_reason', oldRecord.visit_reason ?? '', visitReason)
  }
  if (oldRecord.vaccinations !== vaccinations) {
    await createAuditLog(petId, id, editedBy, 'updated', 'vaccinations', oldRecord.vaccinations ?? '', vaccinations)
  }

  return data[0]
}

export async function deleteMedicalRecord(
  id: string,
  petId: string,
  editedBy: string,
  visitReason: string
): Promise<void> {
  // Log the deletion first before deleting
  await createAuditLog(
    petId,
    id,
    editedBy,
    'deleted',
    'medical_record',
    visitReason || 'Medical record',
    undefined
  )

  const { error } = await supabase
    .from('medical_records')
    .delete()
    .eq('id', id)

  if (error) throw error
}