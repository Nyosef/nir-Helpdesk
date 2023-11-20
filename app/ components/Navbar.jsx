import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from './Flag_of_Israel.svg'

export default function Navbar() {
  return (
    <nav>
    <Image src = {Logo}
    alt = 'Israel flag'
    width={70}
    quality={100}
    placeholder='empty'
    ></Image>
    <h1> Nir Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
  </nav>
  )
}
