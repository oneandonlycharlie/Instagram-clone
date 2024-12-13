import { createBrowserRouter } from "react-router-dom";
import Root from "./components/root";
import Feed from "./components/feed"
import Explore from "./components/explore";
import Inbox from "./components/messages";
import Profile from "./components/profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {index:true, element: <Feed />},
            {path: "/explore", element: <Explore/>},
            {path:"/messages", element: <Inbox />},
            {path:"/profile", element:<Profile />}
        ]
    }
])

export default router