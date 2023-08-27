import AppWithMsal from './app'
import {getTeamMembers} from './graph-api.server'

export default async function Home() {
  const users = await getTeamMembers()

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
