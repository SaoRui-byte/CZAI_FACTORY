import { createContext } from 'react'
import type { Session } from './auth'

export interface AuthContextValue {
  session: Session | null
  signIn: (phone: string, name?: string) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
