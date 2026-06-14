import { Outlet } from "react-router"
import Header from "./Header.jsx"


function RootLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow">
                <Outlet />
            </main>

            
        </div>
    )
}

export default RootLayout