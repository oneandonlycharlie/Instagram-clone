import { createBrowserRouter } from "react-router-dom";
import Home from "./components/home";
import Feed from "./components/feed"
import Explore from "./components/explore";
import Profile from "./components/profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {index:true, element: <Feed />},
            {path: "/explore", element: <Explore/>},
            {path:"/profile", element:<Profile />},
            {path:"/profile/:username", element:<Profile />}
        ],
    },
])

export default router