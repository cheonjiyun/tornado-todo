import { createBrowserRouter } from "react-router-dom";
import { Todo } from "../pages/Todo";
import { Calendar } from "../pages/Calendar";
import { Category } from "../pages/Category";
import { Layout } from "../component/layout/Layout";
import { Setting } from "../pages/Setting";
import { Login } from "../pages/login/Login.tsx";
import { Signup } from "../pages/login/Signup.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <Todo /> },
            { path: "calendar", element: <Calendar /> },
            { path: "category", element: <Category /> },
            { path: "setting", element: <Setting /> },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
]);
