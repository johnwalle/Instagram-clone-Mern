import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = async () => {
        // remove from the local storage
        localStorage.removeItem('user');

        // dispatch the LOGOUT
        dispatch({ type: "LOGOUT" });
    };

    return {
        logout,
    };
};

export default useLogout;