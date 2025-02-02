"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Shield, Users, Share2, User } from "lucide-react"
import { redirect } from 'next/navigation'

export default function HomePage() {

    const handleRedirect = () => {
        redirect('/login')
    }


  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div className="text-xl font-bold">WalletPass</div>
          <nav>
            {/* <Button variant="ghost" className="text-zinc-400 hover:text-white">
              Login
            </Button> */}
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Your Team's Digital Vault
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-12">
              Securely manage and share your team's digital assets in one place
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-zinc-200 text-lg px-8 py-6 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]"
              onClick={handleRedirect}>
                Create a Vault for my team
              </Button>
            </motion.div>
          </motion.div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-24">
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 mb-4 text-white/80" />
                <h3 className="text-xl font-semibold mb-2 text-white">Bank-Grade Security</h3>
                <p className="text-zinc-400">Military-grade encryption for your digital assets</p>
              </div>
            </Card>
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 mb-4 text-white/80" />
                <h3 className="text-xl font-semibold mb-2 text-white">Team Access</h3>
                <p className="text-zinc-400">Granular control over team permissions and roles</p>
              </div>
            </Card>
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <div className="flex flex-col items-center">
                <Share2 className="w-8 h-8 mb-4 text-white/80" />
                <h3 className="text-xl font-semibold mb-2 text-white">Secure Sharing</h3>
                <p className="text-zinc-400">Share assets safely with authorized members</p>
              </div>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-zinc-500 text-sm">
          © {new Date().getFullYear()} WalletPass. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

