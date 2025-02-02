import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "Usuário já existe" }, { status: 400 })
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10)

    // Cria o usuário no banco
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: "Usuário criado com sucesso!", user: newUser }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao registrar usuário" }, { status: 500 })
  }
}
