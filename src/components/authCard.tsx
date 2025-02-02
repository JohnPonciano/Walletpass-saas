"use client"
import { useState } from "react"
import { Github, Mail } from "lucide-react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { redirect } from 'next/navigation'
export default function AuthCard() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })

  // Atualiza os inputs
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.id]: event.target.value })
  }

  // Login com credenciais
  async function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    })

    if (result?.error) {
      alert("Erro no login: " + result.error)
    } else {
      redirect("/dashboard")  
      }
    setIsLoading(false)
  }

  // Registro de novo usuário
  async function handleRegister(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) {
        alert(data.error || "Erro ao registrar usuário")
        return
      }

      alert("Conta criada com sucesso! Você pode fazer login agora.")
    } catch (error) {
      alert("Erro ao registrar usuário")
    }

    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <CardContent className="p-6">
          {/*Aba de Login */}
          <TabsContent value="login">
            <div className="flex flex-col space-y-2 text-center mb-4">
              <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} disabled={isLoading} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={formData.password} onChange={handleChange} disabled={isLoading} />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Mail className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
                <Separator className="w-full" />
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
                <Button variant="outline" type="button" disabled={isLoading}>
                  {isLoading ? <Mail className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}{" "}
                  Github
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Aba de Registro */}
          <TabsContent value="register">
            <div className="flex flex-col space-y-2 text-center mb-4">
              <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
              <p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
            </div>
            <form onSubmit={handleRegister}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Team Name</Label>
                  <Input id="name" type="text" value={formData.name} onChange={handleChange} disabled={isLoading} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} disabled={isLoading} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={formData.password} onChange={handleChange} disabled={isLoading} />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Mail className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
                <Separator/>
                <Button variant="outline" type="button" disabled={isLoading}>
                  {isLoading ? <Mail className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}{" "}
                  Github
                </Button>
              </div>
              
            </form>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
