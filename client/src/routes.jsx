import { createBrowserRouter } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path:"/login",
        element:<Login />
    }
])

export default router