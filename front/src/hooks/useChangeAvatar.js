import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useChangeAvatar = () => {
    const [isLoadingpp, setIsLoadingpp] = useState(false);
    const { user, dispatch } = useAuthContext();
    const navigate = useNavigate();

    const changeAvatar = async (avatar) => {
        const formData = new FormData();
        formData.append('myAvatar', avatar);
        console.log("avatar uploaded", avatar);
        setIsLoadingpp(true);

        try {
            const response = await axios.put(
                "http://localhost:8000/api/users/change-avatar",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            const userData = response.data;
            if (response.status === 200) {

                navigate('/profile');
                localStorage.setItem('user', JSON.stringify(userData));

                dispatch({ type: "LOGIN", payload: userData });
            }
        } catch (error) {
            console.error(error);
        }

        setIsLoadingpp(false);
    };

    return {
        changeAvatar,
        isLoadingpp
    };
};

export default useChangeAvatar;