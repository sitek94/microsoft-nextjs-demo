import {ClientSecretCredential} from '@azure/identity'
import {Client} from '@microsoft/microsoft-graph-client'
import {TokenCredentialAuthenticationProvider} from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials'
import {ConversationMember} from '@microsoft/microsoft-graph-types'

const credential = new ClientSecretCredential(
  process.env.NEXT_PUBLIC_AZURE_TENANT_ID!,
  process.env.NEXT_PUBLIC_AZURE_CLIENT_ID!,
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

export async function getTeamMembers(): Promise<ConversationMember[]> {
  const response = await graphClient
    .api(`/teams/${process.env.TEAM_ID}/members`)
    .get()

  const users: ConversationMember[] = response.value

  return users
}
