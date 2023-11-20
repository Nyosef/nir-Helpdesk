// Any component we make is by default a server component

// added the async to make it asynchronous

import React from 'react'
import Link from 'next/link';
//Fetch logic is outside to keep it cleaner
async function getTickets() {

    // Revalidating object ( dependending how much the data changes - every 30 seconds in this case)
    // revalidate set to 0 - removes cache compeltley. no cache.

    //imitate delay
    await new Promise(resolve => setTimeout(resolve,3000));

    const res = await fetch('http://localhost:4000/tickets', {
        next: {
        revalidate: 0
        }
    });
    // Returns a promise
    return res.json();
}


export default async function TicketList() {
    // because of promise await is neccesary
    const tickets = await getTickets();
  return (
   
    <>
    {tickets.map((ticket) => (
        <div key={ticket.id} className='card my-5'>
            <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
                {ticket.priority} Priority
            </div>
            </Link>
        </div>
))}
{tickets.length === 0 && 
    <p className='text-center'>There are no open tickets, wohoo!</p>
}
    </>
  )
}
