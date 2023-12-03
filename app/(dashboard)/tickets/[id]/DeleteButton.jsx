"use client"
import { useState } from 'react'
import { TiDelete } from 'react-icons/ti'

import React from 'react'
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const handleClick = async () => {
        setIsLoading(true);
        console.log('Deleting id - ', id);
        
        const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
        method: 'DELETE',
    });

    const json = await res.json();

    if(json.error) {
        console.log(error);
        setIsLoading(false);
    } else {
        router.refresh();
        router.push('/tickets');
    }
}

  return (
    <button 
    className="btn-primary"
    onClick={handleClick}
    disabled ={isLoading}
    >
        {isLoading && (
            <>
            <TiDelete></TiDelete>Deleting...
            </>
        )}
                {!isLoading && (
            <>
            <TiDelete></TiDelete> Delete Ticket
            </>
        )}
    </button>
  )
}
