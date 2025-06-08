import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy,
  Timestamp 
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { v4 as uuidv4 } from 'uuid'

// Tipi TypeScript
export interface User {
  id?: string
  email: string
  name: string
  createdAt: Timestamp
}

export interface Ticket {
  id?: string
  ticketNumber: number
  userId: string
  userEmail: string
  userName: string
  purchasedAt: Timestamp
  paymentId: string
  isActive: boolean
}

export interface Payment {
  id?: string
  userId: string
  userEmail: string
  amount: number
  ticketCount: number
  stripePaymentId: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: Timestamp
}

// Database operations
export const dbOperations = {
  // Aggiunge un utente
  async addUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        ...userData,
        createdAt: Timestamp.now()
      })
      return docRef.id
    } catch (error) {
      console.error('Errore aggiungendo utente:', error)
      throw error
    }
  },

  // Aggiunge un biglietto
  async addTicket(ticketData: Omit<Ticket, 'id' | 'purchasedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'tickets'), {
        ...ticketData,
        purchasedAt: Timestamp.now()
      })
      return docRef.id
    } catch (error) {
      console.error('Errore aggiungendo biglietto:', error)
      throw error
    }
  },

  // Aggiunge un pagamento
  async addPayment(paymentData: Omit<Payment, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'payments'), {
        ...paymentData,
        createdAt: Timestamp.now()
      })
      return docRef.id
    } catch (error) {
      console.error('Errore aggiungendo pagamento:', error)
      throw error
    }
  },

  // Ottiene i biglietti di un utente
  async getUserTickets(userEmail: string): Promise<Ticket[]> {
    try {
      const q = query(
        collection(db, 'tickets'),
        where('userEmail', '==', userEmail),
        where('isActive', '==', true),
        orderBy('purchasedAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ticket))
    } catch (error) {
      console.error('Errore ottenendo biglietti utente:', error)
      throw error
    }
  },

  // Ottiene tutti i biglietti attivi
  async getAllActiveTickets(): Promise<Ticket[]> {
    try {
      const q = query(
        collection(db, 'tickets'),
        where('isActive', '==', true),
        orderBy('purchasedAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ticket))
    } catch (error) {
      console.error('Errore ottenendo tutti i biglietti:', error)
      throw error
    }
  },

  // Genera numero biglietto unico
  generateTicketNumber(): number {
    return Math.floor(Math.random() * 90000) + 10000 // Numero a 5 cifre
  },

  // Genera ID utente unico
  generateUserId(): string {
    return uuidv4()
  }
}
