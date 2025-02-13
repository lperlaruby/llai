/*import Link from "next/link"
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
}*/



import Link from "next/link";

export default function HelloWorldPage() {
  return (
    <div className="min-h-screen bg-blue-100 text-center">
      {/* Header Section */}
      <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
        <span className="text-2xl font-bold">=</span>
        <nav className="flex space-x-6">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/list" className="hover:text-gray-300">List</Link>
          <Link href="/user" className="hover:text-gray-300">User</Link>
        </nav>
      </header>

      {/* Main Content Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold">
        <Link href="/hello-world/hello" className="text-blue-600 hover:text-blue-400 mx-2">Hello,</Link>
        <span> </span>
        <Link href="/hello-world/world" className="text-blue-600 hover:text-blue-400 mx-2">World</Link>
      </h1>
    </div>

    </div>
  );
}


