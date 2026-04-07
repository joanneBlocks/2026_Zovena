import { supabase } from '../lib/supabase'

export interface Testimonial {
  id: string
  name: string
  role: string
  message: string
  photo_url: string | null
  approved: boolean
  created_at: string
}

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function submitTestimonial(
  name: string,
  role: string,
  message: string,
  photoUrl?: string
): Promise<Testimonial> {
  const { data, error } = await supabase
    .from('testimonials')
    .insert({
      name,
      role,
      message,
      photo_url: photoUrl ?? null,
      approved: false,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function uploadTestimonialPhoto(
  file: File
): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `testimonials/${Date.now()}.${fileExt}`

  const { error } = await supabase.storage
    .from('pet-photos')
    .upload(fileName, file)

  if (error) throw error

  const { data } = supabase.storage
    .from('pet-photos')
    .getPublicUrl(fileName)

  return data.publicUrl
}