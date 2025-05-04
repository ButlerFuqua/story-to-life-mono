'use client'

import { useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useTheme } from './theme-detector'

const provider = new GoogleAuthProvider()

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState<any>(null)
  const { isDark } = useTheme()

  useEffect(() => {
    return onAuthStateChanged(auth, setUser)
  }, [])

  const handleAuth = async () => {
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (err: any) {
      const code = err.code

      if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
        try {
          const providers = await fetchSignInMethodsForEmail(auth, email)
          if (providers.length === 0) {
            alert("No sign-in method found for this email. Try signing up or using Google login.")
          } else if (providers.includes("google.com")) {
            alert("This email is registered using Google. Please use Google Sign-In.")
          }
        } catch {
          alert("Could not check sign-in methods. Please try again.")
        }
      } else if (code === "auth/email-already-in-use" && isSignup) {
        const providers = await fetchSignInMethodsForEmail(auth, email)
        if (providers.includes("google.com")) {
          alert('This email is already registered with Google. Please use "Login with Google".')
        } else {
          alert("Email is already in use.")
        }
      } else {
        alert(err.message || "An unexpected error occurred.")
      }
    }
  }

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (err) {
      alert((err as Error).message)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
  }

  if (user) {
    return (
      <div
        className="p-8 rounded-xl w-full max-w-sm transition-all duration-300"
        style={{
          backgroundColor: `var(--neumorph-bg)`,
          color: `var(--neumorph-text)`,
          boxShadow: `8px 8px 16px var(--neumorph-shadow-dark), -8px -8px 16px var(--neumorph-shadow-light)`,
        }}
      >
        <p className="text-xl font-semibold mb-4">Welcome, {user.email}</p>
        <button
          onClick={handleLogout}
          className="mt-4 px-6 py-3 rounded-xl font-medium transition-all duration-300 text-white"
          style={{
            backgroundColor: `var(--neumorph-red)`,
            boxShadow: `inset 2px 2px 5px var(--neumorph-shadow-dark), inset -2px -2px 5px var(--neumorph-shadow-light)`,
          }}
        >
          Log Out
        </button>
      </div>
    )
  }

  return (
    <div
      className="p-8 rounded-xl w-full max-w-sm space-y-6 transition-all duration-300"
      style={{
        backgroundColor: `var(--neumorph-bg)`,
        color: `var(--neumorph-text)`,
        boxShadow: `10px 10px 20px var(--neumorph-shadow-dark), -10px -10px 20px var(--neumorph-shadow-light)`,
      }}
    >
      <h2 className="text-2xl font-bold text-center mb-2">{isSignup ? "Create Account" : "Welcome Back"}</h2>

      <div className="space-y-4">
        <div
          className="rounded-xl p-1"
          style={{
            backgroundColor: isDark ? "#2d2d2d" : "#e0e0e0",
            boxShadow: `inset 2px 2px 5px var(--neumorph-shadow-dark), inset -2px -2px 5px var(--neumorph-shadow-light)`,
          }}
        >
          <input
            className="p-3 w-full rounded-lg focus:outline-none"
            style={{
              backgroundColor: isDark ? "#2d2d2d" : "#e0e0e0",
              color: `var(--neumorph-text)`,
            }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div
          className="rounded-xl p-1"
          style={{
            backgroundColor: isDark ? "#2d2d2d" : "#e0e0e0",
            boxShadow: `inset 2px 2px 5px var(--neumorph-shadow-dark), inset -2px -2px 5px var(--neumorph-shadow-light)`,
          }}
        >
          <input
            className="p-3 w-full rounded-lg focus:outline-none"
            style={{
              backgroundColor: isDark ? "#2d2d2d" : "#e0e0e0",
              color: `var(--neumorph-text)`,
            }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <button
          onClick={handleAuth}
          className="w-full py-3 rounded-xl font-medium transition-all duration-300 text-white"
          style={{
            backgroundColor: `var(--neumorph-blue)`,
            boxShadow: `4px 4px 8px var(--neumorph-shadow-dark), -4px -4px 8px var(--neumorph-shadow-light)`,
          }}
        >
          {isSignup ? "Sign Up" : "Login"} with Email
        </button>

        <button
          onClick={handleGoogle}
          className="w-full py-3 rounded-xl font-medium transition-all duration-300 text-white"
          style={{
            backgroundColor: `var(--neumorph-orange)`,
            boxShadow: `4px 4px 8px var(--neumorph-shadow-dark), -4px -4px 8px var(--neumorph-shadow-light)`,
          }}
        >
          Login with Google
        </button>
      </div>

      <p className="text-center text-sm mt-6" style={{ color: isDark ? "#d1d5db" : "#4b5563" }}>
        {isSignup ? "Already have an account?" : "New here?"}{" "}
        <button
          className="font-medium transition-colors"
          style={{ color: `var(--neumorph-blue)` }}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  )
}
