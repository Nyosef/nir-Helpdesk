import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react'

//Components
import DeleteButton from './DeleteButton';

//export const dynamicParams = true;

//Fetching a specific ticket and using its name as metadata
export async function generateMetadata({ params }) {
    const supabase = createServerComponentClient({ cookies });

const { data: ticket } = await supabase.from('Tickets')
.select()
.eq('id', params.id)
.single()

    return {
        title: `Nir Helpdesk | ${ticket?.title || 'Ticket no found'}`
    }
}

/* 
Two methods of working:
We could either fetch a ticket one by one, or we can fetch all the tickets in advance, thus
allowing a much quicker access to all of them.
*/


//Fetch logic is outside to keep it cleaner
async function getTicket(id) {

    const supabase = createServerComponentClient({ cookies });

    const { data } = await supabase.from('Tickets')
    .select()
    .eq('id', id)
    .single()

    if (!data){
        notFound();
    }
    return data;
}


// Access to route params {params}
export default async function TicketDetails({ params }) {
   
    const ticket = await getTicket(params.id);

    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();


  return (
<main>
    <nav>
        <h2>TicketDetails</h2>
        <div className="ml-auto">
            {data.session.user.email === ticket.user_email && (
                <DeleteButton id={ticket.id}>Delete</DeleteButton>
            )}
        </div>
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
