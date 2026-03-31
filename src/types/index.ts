export type Role = 'owner' | 'vet'

export interface Profile {
  id: string
  email: string
  role: Role
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
}