import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    // use axios secure with react query
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ["isAdmin", user?.email],
        enabled: !loading && user != null, // Ensure that user is not null
        queryFn: async () => {
            if (!user) {
                return false; // or handle it appropriately
            }

            try {
                const res = await axiosSecure.get(`/users/admin/${user.email}`);
                return res.data.admin;
            } catch (error) {
                // Handle error, e.g., redirect to login
                console.error("Error fetching admin status:", error);
                throw error;
            }
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
