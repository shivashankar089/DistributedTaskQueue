import { NavLink } from "react-router"

const tasks = [
  {
    to: "/profile/number-task",
    label: "Number Task",
    icon: "🔢",
    description: "Handle numeric operations",
  },
  {
    to: "/profile/email-task",
    label: "Send Email",
    icon: "✉️",
    description: "Compose and send emails",
  },
  {
    to: "/profile/notification-task",
    label: "Notification",
    icon: "🔔",
    description: "Manage alerts & notifications",
  },
  {
    to: "/profile/message-task",
    label: "Send Message",
    icon: "💬",
    description: "Send direct messages",
  },
]

function AddTask() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Task</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tasks.map(({ to, label, icon, description }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-start gap-4 p-5 rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                  isActive
                    ? "border-indigo-500 bg-indigo-50 shadow-indigo-100"
                    : "border-gray-200 bg-white hover:border-indigo-300"
                }`
              }
            >
              <span className="text-2xl mt-0.5">{icon}</span>
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {label}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{description}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddTask