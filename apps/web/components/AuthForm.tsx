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

const provider = new GoogleAuthProvider()

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<any>(null)

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

  
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        try {
          const providers = await fetchSignInMethodsForEmail(auth, email)
          if (providers.length === 0) {
            alert('No sign-in method found for this email. Try signing up or using Google login.')
          } else if (providers.includes('google.com')) {
            alert('This email is registered using Google. Please use Google Sign-In.')
          }
        } catch {
          alert('Could not check sign-in methods. Please try again.')
        }
      } else if (code === 'auth/email-already-in-use' && isSignup) {
        const providers = await fetchSignInMethodsForEmail(auth, email)
        if (providers.includes('google.com')) {
          alert('This email is already registered with Google. Please use "Login with Google".')
        } else {
          alert('Email is already in use.')
        }
      } else {
        alert(err.message || 'An unexpected error occurred.')
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
      <div className="p-4 bg-black">
        <p>Welcome, {user.email}</p>
        <button onClick={handleLogout} className="mt-2 px-4 py-2 bg-red-600 text-white">
          Log Out
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4 w-full max-w-sm">
      <input
        className="border p-2 w-full bg-black text-white"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full bg-black text-white"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth} className="bg-blue-600 text-white px-4 py-2 w-full">
        {isSignup ? 'Sign Up' : 'Login'} with Email
      </button>
      <button onClick={handleGoogle} className="bg-green-600 text-white px-4 py-2 w-full">
        Login with Google
      </button>
      <p className="text-center text-sm">
        {isSignup ? 'Already have an account?' : 'New here?'}{' '}
        <button className="underline text-blue-700" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  )
}
