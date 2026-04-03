import { supabase } from '../lib/supabase'
import type { MedicalRecord } from '../types/index'

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
  return data
}

export async function updateMedicalRecord(
  id: string,
  notes: string,
  visitDate: string,
  visitReason: string,
  vaccinations: string
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

  return data[0]
}

export async function deleteMedicalRecord(id: string): Promise<void> {
  const { error } = await supabase
    .from('medical_records')
    .delete()
    .eq('id', id)

  if (error) throw error
}