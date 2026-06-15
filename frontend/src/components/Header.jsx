import { NavLink, useNavigate } from "react-router"
import axios from "axios"
import { useState } from "react"

function Header(){
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            await axios.post(
                "https://distributedtaskqueue-f21w.onrender.com/user/logout",
                {},
                { withCredentials: true }
            );
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setLoggingOut(false);
            navigate("/login");
        }
    };

    return(
        <div className="flex justify-end gap-5 px-8 py-4 bg-gray-900 shadow-md items-center">
            <NavLink
                to="home"
                className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                        isActive ? "text-violet-400 border-b-2 border-violet-400" : "text-gray-300 hover:text-white"
                    }`
                }
            >
                Home
            </NavLink>
            <NavLink
                to="register"
                className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                        isActive ? "text-violet-400 border-b-2 border-violet-400" : "text-gray-300 hover:text-white"
                    }`
                }
            >
                Register
            </NavLink>
            <NavLink
                to="login"
                className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                        isActive ? "text-violet-400 border-b-2 border-violet-400" : "text-gray-300 hover:text-white"
                    }`
                }
            >
                Login
            </NavLink>

            {/* Logout Button */}
            <button
                id="logout-btn"
                onClick={handleLogout}
                disabled={loggingOut}
                className="text-sm font-medium transition-colors duration-200 text-gray-300 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loggingOut ? "Logging out..." : "Logout"}
            </button>
        </div>
    )
}

export default Header