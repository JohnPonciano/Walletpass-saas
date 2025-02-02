import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)
        if (!passwordMatch) {
          throw new Error("Invalid credentials")
        }

        return user
      }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id
      }
      return session
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth"
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
