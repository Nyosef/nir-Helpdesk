import React from 'react'
import CreateForm from './CreateForm'

// This page is a server component ( createCorm.jsx is a client component - needs hydration)

export default function CreateTicket() {
  return (
    <main>
        <h2 className='text-primary text-center'>Add a new ticket </h2>
        <CreateForm></CreateForm>
    </main>
  )
}

// Server component doesnt need hydration
// Client component needs hydration in the browser
// "use client" -- tells next.js this is a client component - needs hydration with some javascript