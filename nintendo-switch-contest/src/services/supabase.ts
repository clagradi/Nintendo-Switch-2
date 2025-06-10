import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Database features will be disabled.')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Tipo per i partecipanti
export interface Participant {
  nome: string
  cognome: string
  email: string
  numero_biglietto: string
  importo: number
}

// Funzione per salvare un partecipante
export async function saveParticipant(data: Participant) {
  if (!supabase) {
    console.warn('Supabase not configured, saving to console instead:')
    console.log('Participant data:', data)
    return { success: true, data: null }
  }

  try {
    const { data: result, error } = await supabase
      .from('participants')
      .insert([{
        ...data,
        stato_pagamento: 'completed',
        metodo_pagamento: 'card'
      }])
      .select()

    if (error) {
      console.error('Database error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'Database connection failed' }
  }
}

// Funzione per generare numero biglietto unico
export function generateTicketNumber(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `NS-${timestamp}${random}`
}
