/* -------------------------------------------------------------------
   Supabase client + helper – versione stabile per “Nintendo Contest”
   ------------------------------------------------------------------ */

import { createClient } from '@supabase/supabase-js'

/* 1️⃣  Inizializzazione con fail‑fast */
const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Supabase env vars missing. Definisci VITE_SUPABASE_URL e ' +
    'VITE_SUPABASE_ANON_KEY in .env.local'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/* 2️⃣  Tipi */
export interface Participant {
  nome: string
  cognome: string
  email: string
  twitter_handle: string
  numero_biglietto: string
  importo: number               // in euro
  ticket_count: number
}

/* 3️⃣  Funzione di salvataggio con protezione duplicati */
export async function saveParticipant(data: Participant) {
  try {
    const { data: rows, error } = await supabase
      .from('participants')
      .insert(
        [
          {
            ...data,
            stato_pagamento: 'completed' // colonna presente nel DB
          }
        ]
      )
      .select()

    if (error) {
      // 23505 = duplicate key
      interface SupabaseError {
        code?: string
        message: string
      }
      const supabaseError = error as SupabaseError
      if (supabaseError.code === '23505') {
        return { success: false, error: 'Ticket number already exists' }
      }
      console.error('Supabase error:', error)
      return { success: false, error: supabaseError.message }
    }

    // Se è stato ignorato perché duplicato, rows sarà vuoto
    if (rows?.length === 0) {
      return { success: false, error: 'Ticket already exists (ignored)' }
    }

    // rows è array: prendi la prima (o null se insert ignorato)
    return { success: true, data: rows?.[0] ?? null }
  } catch (err) {
    console.error('Unexpected Supabase error:', err)
    return { success: false, error: 'Database connection failed' }
  }
}

/* 4️⃣  Generatore ticket: timestamp compatto + random sicuro */
export function generateTicketNumber(): string {
  const ts  = Date.now().toString(36).slice(-5).toUpperCase()
  const rnd = crypto.getRandomValues(new Uint32Array(1))[0]
    .toString(36)
    .slice(-3)
    .toUpperCase()
  return `NS-${ts}${rnd}`       
}
