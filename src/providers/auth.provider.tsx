'use client'

import {PublicClientApplication} from '@azure/msal-browser'
import {MsalProvider} from '@azure/msal-react'

const pca = new PublicClientApplication({
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env
      .NEXT_PUBLIC_AZURE_TENANT_ID!}`,
    redirectUri: '/',
  },
})

export default function AuthProvider({children}: {children: React.ReactNode}) {
  return <MsalProvider instance={pca}>{children}</MsalProvider>
}
