'use client'

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"

type Props = {
  classnames?: string;
}

const LogOutBtn: React.FunctionComponent<Props> = ({ classnames }) => {
  return (
    <Button className={classnames} variant={"destructive"} onClick={() => { signOut() }}>Odjavi se</Button>
  )
}

export default LogOutBtn