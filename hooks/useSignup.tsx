import { delay } from '@/utils';
import React, { useState } from 'react'

const useSignup = () => {

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("")
    const [error, setError] = useState({
        error: false,
        message: ""
    });



    const handleSignup = async (data: any) => {

        try {
            setLoading(true);
            setError({ error: false, message: "" });
            await delay(2000); // simulate network delay
            return {
                success: false,
            }
        } catch (error) {
          
        } finally {
            setLoading(false);
        }

    };


    return { handleSignup, loading, error, response }
}

export default useSignup