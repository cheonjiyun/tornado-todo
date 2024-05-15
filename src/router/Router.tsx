import { createBrowserRouter } from "react-router-dom";
import { Todo } from "../pages/Todo";
import { Calendar } from "../pages/Calendar";
import { Category } from "../pages/Category";
import { Layout } from "../component/layout/Layout";
import { Setting } from "../pages/Setting";

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
]);
