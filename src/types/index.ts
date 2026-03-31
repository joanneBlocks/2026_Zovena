export type Role = 'owner' | 'vet'

export interface Profile {
  id: string
  email: string
  role: Role
  created_at: string
}