// This is a specific not found page for the tickets
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
      <main className='text-center'>
          <h2 className="text-3x1">There was a problem specifically in the tickets!.</h2>
          <p>We could not find the page you were looking for!</p>
          <p>Go back to the <Link href={"/tickets"}>Tickets</Link></p>
      </main>
    )
  }
