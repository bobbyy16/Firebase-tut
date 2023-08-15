import React from 'react'
import { auth, googleProvider } from '../config/Firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react'

export default function Auth() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = async () => {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
          console.error(err);
        }
      };

    
      const signInWithGoogle = async () => {
        try {
          await signInWithPopup(auth, googleProvider);
        } catch (err) {
          console.error(err);
        }
      };

      const logout = async () => {
        try{
            await signOut(auth)
        }catch{
            console.error(err);
        }
      }

  return (
    <div>
      <input 
        type="email" 
        placeholder='Email' 
        onChange={(e) => setEmail(e.target.value)}
        required 
        />
      <input 
        type="password" 
        placeholder='Password' 
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
