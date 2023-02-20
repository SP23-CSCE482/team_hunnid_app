import React, { useContext } from 'react'
import UserContext from './user'
export default function Navigation() {
  const user = useContext(UserContext)
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        Welcome, {user.given_name}
      </nav>
    </div>
  )
}
