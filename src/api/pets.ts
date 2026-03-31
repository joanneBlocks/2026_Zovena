import { supabase } from '../lib/supabase'
import type { Pet } from '../types/index'

export async function getPets(): Promise<Pet[]> {
  const { data, error } = await supabase
    .from('pets')
    .select('*, profiles(email)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function createPet(
  name: string,
  species: string,
  ageYears: number,
  ageMonths: number,
  ownerId: string,
  photoUrl?: string
): Promise<Pet> {
  const { data, error } = await supabase
    .from('pets')
    .insert({
      name,
      species,
      age_years: ageYears,
      age_months: ageMonths,
      owner_id: ownerId,
      photo_url: photoUrl ?? null,
    })
    .select('*, profiles(email)')
    .single()

  if (error) throw error
  return data
}

export async function uploadPetPhoto(
  file: File,
  ownerId: string
): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${ownerId}/${Date.now()}.${fileExt}`

  const { error } = await supabase.storage
    .from('pet-photos')
    .upload(fileName, file)

  if (error) throw error

  const { data } = supabase.storage
    .from('pet-photos')
    .getPublicUrl(fileName)

  return data.publicUrl
}

export async function deletePet(id: string): Promise<void> {
  const { error } = await supabase
    .from('pets')
    .delete()
    .eq('id', id)

  if (error) throw error
}