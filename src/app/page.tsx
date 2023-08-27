import {Container} from '@mui/material'

import Navbar from '@/components/navbar'
import SendMessageForm from '@/components/send-message-form'

import {getTeamMembers} from './graph-api.server'

export default async function Home() {
  const users = await getTeamMembers()

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="sm">
        <SendMessageForm users={users} />
      </Container>
    </>
  )
}
