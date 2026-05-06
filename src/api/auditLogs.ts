import { supabase } from '../lib/supabase'
import type { AuditLog } from '../types/index'

export async function getAuditLogs(petId: string): Promise<AuditLog[]> {
  const { data, error } = await supabase
    .from('audit_logs')
    .select('*, profiles(email)')
    .eq('pet_id', petId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function createAuditLog(
  petId: string,
  recordId: string,
  editedBy: string,
  action: 'created' | 'updated' | 'deleted',
  fieldChanged?: string,
  oldValue?: string,
  newValue?: string
): Promise<void> {
  const { error } = await supabase
    .from('audit_logs')
    .insert({
      pet_id: petId,
      record_id: recordId,
      edited_by: editedBy,
      action,
      field_changed: fieldChanged ?? null,
      old_value: oldValue ?? null,
      new_value: newValue ?? null,
    })

  if (error) throw error
}