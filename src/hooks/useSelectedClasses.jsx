import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSelectedClasses = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: selectedClass = [] } = useQuery({
        queryKey: ['selectedClasses', user?.email],
        enabled: !loading,

        queryFn: async () => {
            if (!user) {
                return []; // or handle it appropriately
            }

            try {
                const res = await axiosSecure(`/selectedClasses?email=${user.email}`);
                return res.data;
            } catch (error) {
                // Handle error, e.g., redirect to login
                console.error("Error fetching selected classes:", error);
                throw error;
            }
        },
    });

    return [selectedClass, refetch];
};

export default useSelectedClasses;
