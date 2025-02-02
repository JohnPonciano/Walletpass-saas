import AuthCard from "@/components/authCard"
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-6xl font-bold">Welcome to WalletPass</h1>
      <p className="text-2xl">Manage your passwords, securely</p>
      <AuthCard/>
    </div>
    
  )
}
