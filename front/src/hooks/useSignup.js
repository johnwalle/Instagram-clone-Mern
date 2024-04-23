import { useState } from "react";
import axios from 'axios';
import { useAuthContext } from "./useAuthContext";

const useSignup = () => {
    const { dispatch } = useAuthContext();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false)



    const register = async (email, setEmail, username, setUsername, fullName, setFullName, password, setPassword) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:8000/api/users/register`, {
                email, username, fullName, password
            });

            const userData = response.data;
            if (response.status === 200) {
                setEmail('');
                setPassword('');
                setFullName('');
                setUsername('');
                setError('');

                // store the user data in the localstorage
                localStorage.setItem('user', JSON.stringify(userData));

                // dispatch the login
                dispatch({ type: "LOGIN", payload: userData });
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error while registering the user.');
        }
        setIsLoading(false);

    };

    return {
        register,
        error,
        isLoading
    };
};

export default useSignup;