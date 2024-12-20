import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Assessment {
  id: string
  type: string
  score: number
  created_at: string
  user_id: string | null
  assessment_data: {
    id: string
    date: string
    name: string
    activity: string
    hazards: {
      id: string
      images: string[]
      dueDate: string
      effects: {
        id: string
        description: string
      }[]
      severity: number
      riskScore: number
      likelihood: number
      description: string
      pointPerson: string
      finalSeverity: number
      finalRiskScore: number
      finalLikelihood: number
      existingControls: {
        id: string
        description: string
      }[]
      additionalControls: {
        ac: string[]
        ec: string[]
        ppe: string[]
      }
    }[]
    folderId: string
    htmlPath: string
  }
}

export async function getAssessments(userId: string): Promise<Assessment[]> {
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching assessments:', error)
    return []
  }

  return data
}

export async function getLatestAssessment(userId: string): Promise<Assessment | null> {
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error('Error fetching latest assessment:', error)
    return null
  }

  return data
}

