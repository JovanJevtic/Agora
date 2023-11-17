import { authOptions } from "@/app/libs/authOptions"
import NextAuth from "next-auth/next"

const handler = NextAuth(authOptions)

export { handler as POST, handler as GET }