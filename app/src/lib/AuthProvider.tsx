import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { clearSession, readSession, seedDemoData, writeSession, type Session } from './auth'
import { AuthContext } from './authContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => readSession())

  const signIn = useCallback((phone: string, name?: string) => {
    seedDemoData()
    setSession(writeSession(phone, name))
  }, [])

  const signOut = useCallback(() => {
    clearSession()
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({ session, signIn, signOut }),
    [session, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
