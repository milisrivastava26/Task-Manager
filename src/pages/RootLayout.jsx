import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"


const RootLayout = () => {
    return (
        <div>
            <Sidebar />
            <main>
                {/* outlet for rendering children */}
                <Outlet />
            </main>
        </div>
    )
}

export default RootLayout