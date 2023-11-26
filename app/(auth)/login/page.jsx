"use client"

import React, { useState } from 'react'
import AuthForm from '../AuthForm'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();

const handleSubmit = async (e, email, password) => {
  e.preventDefault();
  setError('');

  console.log('user login', email, password);
  const supabase = createClientComponentClient();
  const { error } = await supabase.auth.signInWithPassword({email, password});

  if (error){
    setError(error.message);
  } else {
    router.push('/') 
  }
}

  return (
      <main>
          <h2 className="text-center">Login</h2>

          <AuthForm handleSubmit = {handleSubmit}/>

          {error && ( <div className="error">{ error }</div>)}
      </main>  
)}


// This is the current route
// /auth/login