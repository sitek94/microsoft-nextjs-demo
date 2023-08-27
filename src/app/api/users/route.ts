import {NextRequest, NextResponse} from 'next/server'

import {ClientSecretCredential} from '@azure/identity'
import {TokenCredentialAuthenticationProvider} from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials'
import {Client} from '@microsoft/microsoft-graph-client'

const credential = new ClientSecretCredential(
  'ddb7d66c-241c-488d-866b-422a9092135e',
  'cc37e97e-6020-4dff-8fcf-08e6768c2469',
  'o0I8Q~hPoUlJz3DqU0AYF_NBgJdj-_pnGwZP3awQ',
)

// @microsoft/microsoft-graph-client/authProviders/azureTokenCredentials
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  // The client credentials flow requires that you request the
  // /.default scope, and pre-configure your permissions on the
  // app registration in Azure. An administrator must grant consent
  // to those permissions beforehand.
  scopes: ['https://graph.microsoft.com/.default'],
})

const graphClient = Client.initWithMiddleware({authProvider: authProvider})

export async function GET() {
  const users = await graphClient.api('/users').get()

  return NextResponse.json(users)
}
