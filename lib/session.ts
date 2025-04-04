import { getServerSession } from "next-auth/next"
import { NextAuthOptions, User } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import GoogleProvider from 'next-auth/providers/google'
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt"

import { createUser, getUser } from "./actions"
import { SessionInterface, UserProfile } from "@/utils"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    jwt: {
        encode: ({ secret, token }) => {
            const encodedToken = jsonwebtoken.sign({
                ...token,
               exp: Math.floor(Date.now() / 1000) + 60 * 60,  
            }, secret)

            return encodedToken
        },
        decode: async({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret) as JWT
            return decodedToken
        }
    },
    theme: {
        colorScheme: 'light',
        logo: '/logo.svg',
    },
    callbacks: {
        async session({ session }) {
            const email = session?.user?.email as string

            try {
                const data = await getUser(email) as { user?: UserProfile }
                if(!data?.user) return session
                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        ...data?.user,
                        id: data.user.id
                    }
                }
                return newSession
            } catch (error: any) {
                console.error('Error retrieving user data: ', error.message)
                return session
            }
        },
        async signIn({ user }: { user: AdapterUser | User }) {
            try {
                const userExits = await getUser(user?.email as string) as { user?: UserProfile }
                if(!userExits) {
                    await createUser(user.name as string, user.email as string, user.image as string)
                }
                return true
            } catch (error: any) {
                console.log("Error checking if user exists: ", error.message)
                return false
            }
        }
    }
}

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface

    return session
}