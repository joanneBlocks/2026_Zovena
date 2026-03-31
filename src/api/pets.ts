import { supabase } from '../lib/supabase'
import type { Pet } from '../types/index'

export async function getPets(): Promise<Pet[]> {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function createPet(
  name: string,
  species: string,
  age: number,
  ownerId: string
): Promise<Pet> {
  const { data, error } = await supabase
    .from('pets')
    .insert({ name, species, age, owner_id: ownerId })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletePet(id: string): Promise<void> {
  const { error } = await supabase
    .from('pets')
    .delete()
    .eq('id', id)

  if (error) throw error
}