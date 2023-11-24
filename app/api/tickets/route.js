import { NextResponse } from "next/server";

//Convention GET - how we handle in next.js
// export const dynamic ='force-dyanmic' makes it dyanmic , or add the revalidate object for the specific route to make it dynamic

export const dynamic = 'force-dynamic'

export async function GET() {
    const res = await fetch('http://localhost:4000/tickets');

    const tickets = await res.json();

    return NextResponse.json(tickets, {
        status: 200
    });
}


export async function POST(request) {

    const ticket = await request.json()

    const res = await fetch('http://localhost:4000/tickets', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ticket)
    })

    const newTicket = await res.json();

    return NextResponse.json(newTicket, {
        status: 201
    });
}