import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import { useEffect, useState } from "react";

const ManageClasses = () => {
    const [disabledButtons, setDisabledButtons] = useState(
        JSON.parse(localStorage.getItem('disabledButtons')) || []
    );
    const [feedback, setFeedback] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);

    const [axiosSecure] = useAxiosSecure();

    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get('/classes')
        return res.data;
    })

    const handleApproveClass = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/classes/${id}`, { action: 'approve' });
            refetch();
            setDisabledButtons([...disabledButtons, id]);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDenyClass = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/classes/${id}`, { action: 'deny' });
            refetch();
            setDisabledButtons([...disabledButtons, id]);
        } catch (error) {
            console.log(error);
        }
    }

    const isButtonDisabled = (id) => {
        return disabledButtons.includes(id);
    };

    const handleOpenModal = (id) => {
        setCurrentItemId(id);
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };
    
      const handleFeedbackSubmit = async () => {
        try {
          await axios.patch(`http://localhost:5000/classes/${currentItemId}`, {
            action: 'feedback',
            feedback: feedback
          });
          setShowModal(false);
          setFeedback('');
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        localStorage.setItem('disabledButtons', JSON.stringify(disabledButtons));
    }, [disabledButtons]);

    return (
        <div>
            <h2 className="animate__animated animate__bounce text-xl lg:text-3xl text-center my-6 font-bold">Manage Courses</h2>
            <div className="grid lg:grid-cols-3 justify-center gap-12">
                {
                    classes.map(course =>
                        <div key={course._id} className="card card-compact w-80 bg-base-100 shadow-xl">
                            <figure><img className="h-[250px]" src={course.photo} alt="Courses" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{course.class_Name}</h2>
                                <p className="font-bold">Instructor: {course.instructorName}</p>
                                <p className="font-bold">Contact: {course.email}</p>
                                <div className="flex">
                                    <p>Seats: {course.available_seats}</p>
                                    <p>Price: ${course.price}</p>
                                </div>
                                <div className="card-actions mt-5 justify-between">
                                    <button disabled={isButtonDisabled(course._id)} onClick={() => handleApproveClass(course._id)} className="btn btn-success btn-xs">Approve</button>
                                    <button disabled={isButtonDisabled(course._id)} onClick={() => handleDenyClass(course._id)} className="btn btn-error btn-xs">Deny</button>
                                    <button onClick={() => handleOpenModal(course._id)} className="btn btn-info btn-xs">Feedback</button>
                                </div>
                            </div>
                        </div>)
                }
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-[#c25934] rounded-lg p-8">
                            <h2 className="text-xl text-white mb-4">Feedback</h2>
                            <input
                                type="text"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2 mb-4"
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handleFeedbackSubmit}
                                    className="bg-[#0c4b65] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Submit Feedback
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className="ml-2 bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ManageClasses;