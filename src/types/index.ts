export type Role = 'owner' | 'vet'

export interface Profile {
  id: string
  email: string
  role: Role
  display_name: string | null
  created_at: string
}

export interface Pet {
  id: string
  name: string
  species: string
  age_years: number
  age_months: number
  photo_url: string | null
  owner_id: string
  created_at: string
  profiles?: { email: string }
}

export interface MedicalRecord {
  id: string
  pet_id: string
  notes: string | null
  visit_date: string | null
  visit_reason: string | null
  vaccinations: string | null
  created_by: string
  created_at: string
  updated_at: string
  profiles?: { email: string }
}

export interface AuditLog {
  id: string
  pet_id: string
  record_id: string
  edited_by: string
  action: 'created' | 'updated' | 'deleted'
  field_changed: string | null
  old_value: string | null
  new_value: string | null
  created_at: string
  profiles?: { email: string }
}