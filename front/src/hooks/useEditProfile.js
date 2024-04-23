import { useState } from "react"
import axios from "axios"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"

const useEditProfile = () => {
    const { user, dispatch } = useAuthContext();

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const editprofile = async (fullName, username, bio) => {
        setIsLoading(true);
        try {
            const response = await axios.put(`http://localhost:8000/api/users/edit-profile`, { fullName, username, bio }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            const updatedData = response.data
            if (response.status === 200) {
                // dispatch login 
                navigate("/profile")
                setError(null);
                dispatch({ type: 'LOGIN', payload: updatedData });
            }

        } catch (error) {
            setError(error.response.data.message || 'error while editing.')
        }
        setIsLoading(false);

    }






    return {
        editprofile,
        error,
        isLoading
    }
}

export default useEditProfile
