import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HelloWorldPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Hello World!</h1>
      <p className="text-xl mb-8">You've successfully signed in or signed up.</p>
      <div className="space-x-4">
        <Link href="/login">
          <Button variant="outline">Go back to Login</Button>
        </Link>
        <Link href="/">
          <Button>Go to Homepage</Button>
        </Link>
      </div>
    </div>
  )
}

