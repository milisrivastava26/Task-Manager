
import AddTaskPage from "../pages/AddTaskPage";
import EditTaskPage from "../pages/EditTaskPage";
import Home from "../pages/home";
import RootLayout from "../pages/RootLayout";


const routes = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                // index:true,
                path: "/",
                element: <Home />,

            },
            {

                path: "/add-task",
                element: <AddTaskPage />,

            },
            {

                path: "/edit-task/:id",
                element: <EditTaskPage />,

            },
        ]
    },
];

export default routes;
