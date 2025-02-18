"use client"

import { useState } from "react"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

function LoginForm({
  isLoading,
  onSubmit,
}: { isLoading: boolean; onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>
    </form>
  )
}

function SignUpForm({
  isLoading,
  onSubmit,
}: { isLoading: boolean; onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" name="firstName" type="text" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" name="lastName" type="text" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Sign Up
      </Button>
    </form>
  )
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Simulate some async operation
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          // Simulate a random error for demonstration purposes
          if (Math.random() < 0.3) {
            reject(new Error("Random error occurred"))
          } else {
            resolve()
          }
        }, 1000)
      })

      // Log the form data (for demonstration purposes only)
      const form = event.currentTarget
      const formData = new FormData(form)
      const formObject = Object.fromEntries(formData.entries())
      console.log("Form data:", formObject)

      // Navigate to the Hello World page
      router.push("/hello-world")
    } catch (error) {
      console.error("Error during form submission:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{isSignUp ? "Sign up" : "Sign in"}</CardTitle>
          <CardDescription>
            {isSignUp
              ? "Enter your information below to create your account"
              : "Enter your email below to sign in to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
          {isSignUp ? (
            <SignUpForm isLoading={isLoading} onSubmit={onSubmit} />
          ) : (
            <LoginForm isLoading={isLoading} onSubmit={onSubmit} />
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
        <Button variant="outline" className="w-full" onClick={() => signIn("google")}>
          <Icons.google className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
          <Button variant="link" className="w-full" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

