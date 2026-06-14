import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Outlet } from "react-router";
import { Link } from "react-router";

function Profile() {
    const [UserObj, setUserObj] = useState({});
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "https://distributedtaskqueue.onrender.com/user/details",
                    { withCredentials: true }
                );
                setUserObj(response.data.payLoad);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getUserDetails();
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans antialiased text-slate-900">

            {/* PROFILE HEADER - Added a soft, light gradient background */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/30 border-b border-slate-200">
                
                {/* Subtle Decorative Element (Optional) */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-indigo-100/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-5xl mx-auto px-8 py-12">
                    {
                        Loading ? (
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                                <h2 className="text-slate-400 font-medium tracking-wide">Loading Profile...</h2>
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                                {/* USER INFO */}
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-xl">
                                            👤
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-600/80">
                                                My Profile
                                            </p>
                                            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                                                Welcome , {UserObj.firstname || "User"} !
                                            </h1>
                                            <div className="mt-3">
  <NavLink 
    to="/user-details" 
    className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-200"
  >
    View Profile
  </NavLink>
</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 mt-3 text-sm font-medium opacity-80">
                                        {UserObj.email}
                                    </p>
                                </div>

                                {/* NAVIGATION */}
                                <div className="flex items-center gap-2 bg-white/50 p-1.5 rounded-2xl border border-slate-200/50 backdrop-blur-sm">
                                    <NavLink
                                        to="add-task"
                                        className={({ isActive }) =>
                                            `px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                                isActive
                                                    ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                                                    : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                                            }`
                                        }
                                    >
                                        Add Task
                                    </NavLink>

                                    <NavLink
                                        to="view-task"
                                        className={({ isActive }) =>
                                            `px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                                isActive
                                                    ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                                                    : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                                            }`
                                        }
                                    >
                                        My Tasks
                                    </NavLink>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* CONTENT AREA - Remains Clean White */}
            <div className="max-w-5xl mx-auto px-8 py-10">
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10 min-h-[400px]">
                    <Outlet />
                </div>
            </div>

        </div>
    );
}

export default Profile;