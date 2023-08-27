import {ClientSecretCredential} from '@azure/identity'
import {TokenCredentialAuthenticationProvider} from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials'
import {Client} from '@microsoft/microsoft-graph-client'
import {ConversationMember} from '@microsoft/microsoft-graph-types'

import AppWithMsal from './app'

const credential = new ClientSecretCredential(
  process.env.AZURE_TENANT_ID!,
  process.env.AZURE_CLIENT_ID!,
  process.env.AZURE_CLIENT_SECRET!,
)

const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  // The client credentials flow requires that you request the
  // /.default scope, and pre-configure your permissions on the
  // app registration in Azure. An administrator must grant consent
  // to those permissions beforehand.
  scopes: ['https://graph.microsoft.com/.default'],
})

const graphClient = Client.initWithMiddleware({authProvider})

export default async function Home() {
  const users = await getUsers()

  return (
    <main>
      <AppWithMsal />
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <span>{user.displayName}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}

async function getUsers(): Promise<ConversationMember[]> {
  const response = await graphClient
    .api('/teams/54540ab3-8f5a-49a0-95e4-745be2f8193e/members')
    .get()

  const users: ConversationMember[] = response.value

  return users
}
