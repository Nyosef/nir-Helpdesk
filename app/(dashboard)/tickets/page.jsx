import React from 'react'
import TicketList from './TicketList'
import { Suspense } from 'react'
import Loading from '../loading'
import Link from 'next/link'

// Suspense is only around the part that we are 'waiting to be loaded'
// Suspense together with the fallback shows it only in the relevant area ( without the nav...)

//overweriting metadata for page
export const metadata = {
  title: 'JOEJOE HELPDESK',
}

export default function Tickets() {
  return (
    <main>
        <nav>
          <div>
            <h2>Tickets</h2>
            <p><small> Currently open tickets</small></p>
          </div>
          <Link href="/tickets/create" className="ml-auto">
            <button className="btn-primary">New Ticket</button>
          </Link>
        </nav>

        <Suspense fallback={<Loading />}>
        <TicketList></TicketList>
        </Suspense>

    </main>
  )
}
