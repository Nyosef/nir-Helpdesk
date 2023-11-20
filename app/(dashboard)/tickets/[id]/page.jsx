import { notFound } from 'next/navigation';
import React from 'react'

export const dynamicParams = true;

//Fetching a specific ticket and using its name as metadata
export async function generateMetadata({ params }) {
const id = params.id;

const res = await fetch(`http://localhost:4000/tickets/${id}`);
const ticket = await res.json()

    return {
        title: `Nir Helpdesk | ${ticket.title}`
    }
}

/* 
Two methods of working:
We could either fetch a ticket one by one, or we can fetch all the tickets in advance, thus
allowing a much quicker access to all of them.
*/

// Get a list of all the id's at build time, and next creates a page and corresponding route for each of them
// returns array of objects (single page or route)
export async function generateStaticParams() {
const res = await fetch('http://localhost:4000/tickets/');

const tickets = await res.json();

return tickets.map((ticket) => {
    id: ticket.id;
})
}

//Fetch logic is outside to keep it cleaner
async function getTicket(id) {

    // Revalidating object ( dependending how much the data changes - every 30 seconds in this case)
    // revalidate set to 0 - removes cache compeltley. no cache.
    const res = await fetch('http://localhost:4000/tickets/' + id, {
        next: {
        revalidate: 60
        }
    });

    if (!res.ok){
        notFound();
    }
    // Returns a promise
    return res.json();
}


// Access to route params {params}
export default async function TicketDetails({ params }) {
   
    const ticket = await getTicket(params.id);

  return (
<main>
    <nav>
        <h2>TicketDetails</h2>
    </nav>
    <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
                {ticket.priority} Priority
            </div>
    </div>
</main>  )
}
