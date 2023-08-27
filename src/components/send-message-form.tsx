'use client'

import {ConversationMember} from '@microsoft/microsoft-graph-types'
import {Paper} from '@mui/material'

import UsersSelect from './users-select'

export default function SendMessageForm({
  users,
}: {
  users: ConversationMember[]
}) {
  return (
    <Paper component="form" sx={{mt: 4, p: 2}}>
      <UsersSelect users={users} />
    </Paper>
  )
}

function sendMessage(message: string) {
  return fetch('/api/message', {
    method: 'POST',
    body: JSON.stringify({
      data: message,
    }),
  })
}
