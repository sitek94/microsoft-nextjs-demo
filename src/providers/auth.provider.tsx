'use client'

import {MsalProvider} from '@azure/msal-react'
import {PublicClientApplication} from '@azure/msal-browser'

const pca = new PublicClientApplication({
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env
      .NEXT_PUBLIC_AZURE_TENANT_ID!}`,
  },
})

export default function Providers({children}: {children: React.ReactNode}) {
  return <MsalProvider instance={pca}>{children}</MsalProvider>
}
