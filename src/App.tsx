import { SignInButton, UserButton } from '@clerk/clerk-react'
import { Authenticated, Unauthenticated, AuthLoading, useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'

function App() {
  return (
    <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
      <AuthLoading>
        <p>Still loading</p>
      </AuthLoading>
    </main>
  )
}

export default App