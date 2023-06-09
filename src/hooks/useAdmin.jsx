import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const token = localStorage.getItem('access-token');

    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/users/admin/${user?.email}`, {headers: {
                authorization: `bearer ${token}`
            }})
            return response.json()
        },
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;