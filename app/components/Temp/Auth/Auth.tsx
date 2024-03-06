'use client';

import React from 'react'
import { Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

const Auth = () => {

    const handleSignInGoogle = async () => {
        try {
            
            const res = await signIn('google', {
                redirect: false,
            });

            if(res?.error) {
                console.log(res.error);
            }
    
        }
        catch (err) {
            console.log(err);
        }
      };

  return (
    <div>
      <Button colorScheme="blue" onClick={handleSignInGoogle}>Sign In</Button>
    </div>
  )
}

export default Auth
