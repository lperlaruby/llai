import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Welcome to Our App</h1>
      <Link href="/login">
        <Button size="lg" className="text-lg px-8 py-6">
          Continue
        </Button>
      </Link>
    </div>
  )
}

