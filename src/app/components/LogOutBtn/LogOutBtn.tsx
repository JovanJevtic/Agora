'use client'

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"

const LogOutBtn = () => {
  return (
    <Button variant={"destructive"} onClick={() => { signOut() }}>Odjavi se</Button>
  )
}

export default LogOutBtn