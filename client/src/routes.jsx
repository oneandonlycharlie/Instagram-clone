import { createBrowserRouter } from "react-router-dom";
import Home from "./components/home";
import Feed from "./components/feed"
import Explore from "./components/explore";
import Inbox from "./components/messages";
import Profile from "./components/profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {index:true, element: <Feed />},
            {path: "/explore", element: <Explore/>},
            {path:"/messages", element: <Inbox />},
            {path:"/profile", element:<Profile />},
            {path:"/user/:username", element: <Profile />},
        ],
    },
])

export default router