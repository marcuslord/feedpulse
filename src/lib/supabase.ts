import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with elevated permissions for the feed fetcher
export function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export type Article = {
  id: string
  slug: string
  title: string
  description: string
  content: string | null
  image_url: string | null
  source_name: string
  source_url: string
  category: string
  author: string | null
  published_at: string
  created_at: string
  views: number
}
