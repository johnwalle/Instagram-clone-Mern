import { useState } from "react";
import axios from 'axios';
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const login = async (emailOrUsername, password, setPassword, setEmailOrUsername) => {
        setIsLoading(true);

        try {
            const response = await axios.post(`http://localhost:8000/api/users/login`, {
                emailOrUsername,
                password
            });

            const userData = response.data;

            if (response.status === 200) {
                setError('');
                setPassword('');
                setEmailOrUsername('');

                // store the user data in local storage
                localStorage.setItem('user', JSON.stringify(userData));

                // dispatch the login action
                dispatch({ type: "LOGIN", payload: userData });
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error while logging in.');
        }

        setIsLoading(false);
    };

    return {
        login,
        error,
        isLoading
    };
};

export default useLogin;