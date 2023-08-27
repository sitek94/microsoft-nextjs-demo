'use client'

import AuthProvider from './auth.provider'
import ThemeProvider from './theme.provider'

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  )
}
