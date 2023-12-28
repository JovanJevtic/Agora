import prisma from '@/app/libs/prismadb'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { compare } from 'bcryptjs'
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true,
            profile(profile) {
                return({
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    image: profile.picture,
                    role: profile.role ? profile.role : "user"
                })
            },
        }),
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({ where: { email: credentials?.email } }) 
                
                if (user && user.password && await compare(credentials?.password as string, user.password)) {
                    return ({
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        role: user.role
                    })
                } else {
                    return null;
                }
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async jwt({ token, user }) {
          return { ...token, ...user };
        },
        async session({ session, token }) {
          return {
            user: {
                id: token.id,
                name: token.name,
                email: token.email,
                role: token.role,
                image: token.image,
            },
            expires: session.expires
          };
        },
    },
}