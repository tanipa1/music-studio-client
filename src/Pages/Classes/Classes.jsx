import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useSelectedClasses from "../../hooks/useSelectedClasses";

const Classes = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useSelectedClasses();

    const { data: classes = [],  } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get('/classes')
        return res.data;
    })

    const courses = classes.filter((course) => course.status === 'approved');

    const handleSelectedClass = course => {
        if (user && user.email) {
            const selectedClasses = {
                selectClassId: course._id,
                selectClassName: course.class_Name,
                image: course.photo,
                instructorName: course.instructorName,
                price: course.price,
                instructorEmail: course.email,
                available_seats: course.available_seats,
                enrolled: course.enroll,
                email: user.email,
            }

            fetch('http://localhost:5000/selectedClasses', {
                method: "POST",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(selectedClasses)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'Class added to My Selected Class on your Dashboard',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    }

                })
        }
        else {
            Swal.fire({
                title: 'Please login to select a class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }
    console.log(courses);
    return (
        <div className="lg:mx-16 mx-7">
            <div className="grid lg:grid-cols-4 justify-center gap-5 lg:pt-36 pt-24">
                {
                    courses.map(course =>
                        <div key={course._id} className={`card card-compact lg:w-72 w-80 shadow-xl ${course.available_seats == 0 ? 'bg-red-700 text-white' : 'bg-base-100'
                            }`}>
                            <figure><img src={course.photo} className="h-56" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{course.class_Name}</h2>
                                <p className="font-bold">Instructor: {course.instructorName}</p>
                                <p className="font-bold">Contact: {course.email}</p>
                                <p className="font-bold">Enrolled Student: {course.enroll}</p>
                                <div className="flex">
                                    <p>Seats: {course.available_seats}</p>
                                    <p>Price: ${course.price}</p>
                                </div>
                                <div className="card-actions mt-5 justify-end">
                                    <button onClick={() => handleSelectedClass(course)} className="btn btn-info btn-xs"
                                        disabled={course.available_seats == 0 || (isAdmin || isInstructor)}
                                    >Select Course</button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default Classes;