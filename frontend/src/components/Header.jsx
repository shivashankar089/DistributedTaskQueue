import { NavLink } from "react-router"

function Header(){
    return(
        <div className="flex justify-end gap-5 px-8 py-4 bg-gray-900 shadow-md">
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
        </div>
    )
}

export default Header