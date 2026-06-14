import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";

function UserDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(
        "https://distributedtaskqueue.onrender.com/user/details",
        { withCredentials: true }
      );
      console.log(res.data.payLoad);
      setUser(res.data.payLoad);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const greet = () => {
    const h = new Date().getHours();
    return h < 12 ? "Morning" : h < 17 ? "Afternoon" : "Evening";
  };

  const initials = () =>
    ((user?.firstname?.[0] || "") + (user?.lastname?.[0] || "")).toUpperCase();

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });

  const copyVal = (label, val) => {
    navigator.clipboard.writeText(val).catch(() => {});
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  const stats = [
    {
      label: "Account status",
      value: user?.isUserActive ? "Active" : "Inactive",
      icon: "✦",
      bg: user?.isUserActive ? "bg-emerald-50" : "bg-red-50",
      text: user?.isUserActive ? "text-emerald-700" : "text-red-700",
      border: user?.isUserActive ? "border-emerald-200" : "border-red-200",
    },
    {
      label: "Member since",
      value: user?.createdAt ? formatDate(user.createdAt) : "—",
      icon: "◈",
      bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200",
    },
    {
      label: "Last updated",
      value: user?.updatedAt ? formatDate(user.updatedAt) : "—",
      icon: "◷",
      bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200",
    },
  ];

  const fields = [
    { label: "First name",    value: user?.firstname, bg: "bg-violet-50",  border: "border-violet-200",  icon: "👤" },
    { label: "Last name",     value: user?.lastname,  bg: "bg-emerald-50", border: "border-emerald-200", icon: "👤" },
    { label: "Email address", value: user?.email,     bg: "bg-amber-50",   border: "border-amber-200",   icon: "✉" },
    { label: "Mobile",        value: user?.mobile,    bg: "bg-pink-50",    border: "border-pink-200",    icon: "📱" },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-10 h-10 rounded-full border-2 border-violet-300 border-t-violet-600 animate-spin" />
      <p className="text-sm text-gray-400">Loading your dashboard…</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest">My dashboard</p>
          <h1 className="text-2xl font-semibold text-gray-800 mt-0.5">
            {greet()}, {user?.firstname}!
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-3 py-1 rounded-full border ${
            user?.isUserActive
              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
              : "bg-red-100 text-red-700 border-red-200"
          }`}>
            {user?.isUserActive ? "✦ Active" : "✦ Inactive"}
          </span>
          <button
            onClick={fetchDetails}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition"
            title="Refresh"
          >
            ↻
          </button>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl p-3 border ${s.bg} ${s.border}`}>
            <span className={`text-lg ${s.text}`}>{s.icon}</span>
            <p className="text-xs text-gray-500 mt-2">{s.label}</p>
            <p className={`text-sm font-semibold mt-0.5 ${s.text}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

        {/* Card header */}
        <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-violet-50 to-pink-50 border-b border-gray-100">
          <div className="w-14 h-14 rounded-full bg-violet-100 border-2 border-violet-300 flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-semibold text-violet-700">{initials()}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold text-gray-800">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Fields */}
        <div className="divide-y divide-gray-50 px-5">
          {fields.map((f) => (
            <div key={f.label} className="flex items-center gap-3 py-3">
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 text-base ${f.bg} ${f.border}`}>
                {f.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400">{f.label}</p>
                <p className="text-sm font-medium text-gray-800 truncate">{f.value || "—"}</p>
              </div>
              <button
                onClick={() => copyVal(f.label, f.value)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition ${
                  copied === f.label
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : "bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-600"
                }`}
              >
                {copied === f.label ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <p className="text-xs text-gray-400">
            Joined {user?.createdAt ? formatDate(user.createdAt) : "—"}
          </p>
          <p className="text-xs text-gray-400">🔒 Private & secure</p>
        </div>
      </div>
     <NavLink 
  to="/profile" 
  className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition duration-200"
>
  Back
</NavLink>
<Outlet/>
    </div>
  );
}

export default UserDetails;