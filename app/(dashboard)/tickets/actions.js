"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// Any function we export from this file needs to run only in the server

// We wont see in the browser console, but in the terminal browser because its server.
export async function addTicket(formData) {
    console.log('hello from the server');
    // {title, body, priority} - we get from the following action
    const ticket = Object.fromEntries(formData);

    const supabase = createServerActionClient({ cookies })

    const {data: { session }} = await supabase.auth.getSession();

    //Insert data

    const { error } = await supabase.from('Tickets')
    .insert({
        ...ticket,
        user_email: session.user.email
    })

    if (error){
        throw new Error('Could not add the new ticket.')
    }

    // server redirect instead what weve been using so far
    revalidatePath('/tickets');
    redirect('/tickets');
}

export async function deleteTicket(id) {
    console.log('deleting a ticket from the server');
    const supabase = createServerActionClient({ cookies })

    //Delete data

    const { error } = await supabase.from('Tickets')
    .delete()
    .eq('id',id);

    if (error){
        throw new Error('Could not delete the new ticket.')
    }

    // server redirect instead what weve been using so far
    revalidatePath('/tickets');
    redirect('/tickets');
}