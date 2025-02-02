import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { PasswordGrid } from "@/components/password-grid"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardContent className="pt-6">
            <PasswordGrid />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
