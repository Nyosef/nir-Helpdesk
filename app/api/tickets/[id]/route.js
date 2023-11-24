import { NextResponse } from "next/server";

//Convention GET - how we handle in next.js
// export const dynamic ='force-dyanmic' makes it dyanmic , or add the revalidate object for the specific route to make it dynamic

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
    const res = await fetch('http://localhost:4000/tickets/' + params.id);

    const ticket = await res.json();

    if(!res.ok){
        return NextResponse.json({error: "Cannot find the ticket"}, {
            status:404
        });
    }

    return NextResponse.json(ticket, {
        status: 200
    });
}