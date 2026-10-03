'use client';

import { useSession } from 'next-auth/react';
import React from 'react'
import axios from 'axios'
import {useEffect} from 'react'


/**
 * Wraps the app and syncs the authenticated session's user to the database
 * by calling the user API whenever a signed-in user's email becomes available.
 *
 * @param children - The nested React nodes to render.
 */
function Provider({children} : {children : React.ReactNode}) {
    const {data} = useSession();

    useEffect(() => {
      data?.user?.email && createNewUser()
    }, [data]
  )

    const createNewUser = async() =>{
        const result = await axios.post('/api/user', {});
        console.log(result.data);
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default Provider
