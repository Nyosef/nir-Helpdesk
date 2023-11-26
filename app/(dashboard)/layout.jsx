import React from 'react'
// components
import Navbar from '../ components/Navbar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

// Big nono to forget to pass the cookies to the serverComponentClient

//We are using redirect function, because this is a server component. Can be used only in client router.push

export default async function DashboardLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  // No one will be able to access any page without going to /login first
  if (!data.session) {
    redirect('/login')
  }

  return (
    <>
    <Navbar user={data.session.user} ></Navbar> 
    {children}
    </>
  )
}
