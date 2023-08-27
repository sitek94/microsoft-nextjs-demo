'use client'

import {MsalProvider, useIsAuthenticated, useMsal} from '@azure/msal-react'
import {PublicClientApplication} from '@azure/msal-browser'

const pca = new PublicClientApplication({
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env
      .NEXT_PUBLIC_AZURE_TENANT_ID!}`,
  },
})

export default function AppWithMsal() {
  return (
    <MsalProvider instance={pca}>
      <App />
    </MsalProvider>
  )
}

function App() {
  const isAuthenticated = useIsAuthenticated()

  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

function AuthenticatedApp() {
  const {instance} = useMsal()
  return (
    <main>
      <h1>Authenticated</h1>
      <nav>
        <button onClick={() => instance.logoutRedirect()}>Sign out</button>
      </nav>

      <button
        onClick={() => {
          fetch('/api/message', {
            method: 'POST',
            body: JSON.stringify({
              data: 'hello',
            }),
          })
        }}
      >
        Send message
      </button>
    </main>
  )
}

function UnauthenticatedApp() {
  const {instance} = useMsal()
  return (
    <main>
      <h1>Unauthenticated</h1>
      <button onClick={() => instance.loginRedirect()}>Sign in</button>
    </main>
  )
}
