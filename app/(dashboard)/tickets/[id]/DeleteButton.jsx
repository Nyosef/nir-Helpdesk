"use client"
import { useTransition } from 'react'
import { TiDelete } from 'react-icons/ti'

import React from 'react'
import { deleteTicket } from '../actions';

export default function DeleteButton({ id }) {
const [isPending, startTransition] = useTransition();

  return (
    <button 
    className="btn-primary"
    onClick={() => startTransition(() => deleteTicket(id))}
    disabled ={isPending}
    >
        {isPending && (
            <>
            <TiDelete></TiDelete>Deleting...
            </>
        )}
                {!isPending && (
            <>
            <TiDelete></TiDelete> Delete Ticket
            </>
        )}
    </button>
  )
}
