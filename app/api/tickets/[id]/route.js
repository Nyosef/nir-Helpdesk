import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//Convention GET - how we handle in next.js
// export const dynamic ='force-dyanmic' makes it dyanmic , or add the revalidate object for the specific route to make it dynamic


export async function DELETE(_, { params }) {
const id = params.id;
const supabase = createRouteHandlerClient({cookies});

const { error } = await supabase.from("Tickets")
.delete()
.eq('id', id);

return NextResponse.json({ error });
}
