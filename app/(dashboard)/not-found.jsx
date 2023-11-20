// This is the custom page ( has to be called not-found) that is the default page that is used in next.js
// This is a general not found page

import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <main className='text-center'>
        <h2 className="text-3x1">There was a problem.</h2>
        <p>We could not find the page you were looking for!</p>
        <p>Go back to the <Link href={"/"}>Dashboard</Link></p>
    </main>
  )
}
