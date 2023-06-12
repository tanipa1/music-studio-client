import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Instructors from "../Pages/Instructors/Instructors";
import Dashboard from "../Layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import Classes from "../Pages/Classes/Classes";
import MySelectedClass from "../Pages/Dashboard/MySelectedClass/MySelectedClass";
import Payment from "../Pages/Dashboard/Payment/Payment";
import UpdateClass from "../Pages/Dashboard/UpdateClass/UpdateClass";

const router = createBrowserRouter([
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    },
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'manageUsers',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'manageClass',
                element: <ManageClasses></ManageClasses>
            },
            {
                path: 'addClass',
                element: <AddClass></AddClass>
            },
            {
                path: 'myClasses',
                element: <MyClasses></MyClasses>
            },
            {
                path: 'update/:id',
                element: <UpdateClass></UpdateClass>,
                loader: ({ params }) => fetch(`https://music-studio-server.vercel.app/classes/${params.id}`)
            },
            {
                path: 'selectedClasses',
                element: <MySelectedClass></MySelectedClass>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
        ]
    }
]);

export default router;