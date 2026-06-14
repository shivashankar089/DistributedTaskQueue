import { useEffect, useState } from "react"
import axios from "axios"

function ViewTasks() {

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {

        const fetchTasks = async () => {

            try {

                const res = await axios.get(
                    "https://distributedtaskqueue.onrender.com/task/all",
                    {
                        withCredentials: true
                    }
                )

                // FIXED HERE
                console.log(res);
                setTasks(res.data.payload)

            } catch (err) {
                console.log(err)
                setError("Failed to fetch tasks")

            } finally {

                setLoading(false)
            }
        }

        fetchTasks()

    }, [])

    if (loading) {
        return (
            <div className="p-6 text-gray-600">
                Loading tasks...
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6 text-red-500">
                {error}
            </div>
        )
    }

    return (
        <div className="p-6">

            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                All Tasks
            </h1>

            <div className="grid gap-4">
                {tasks.map((task) => (

                    <div
                        key={task._id}
                        className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
                    >

                        <div className="flex items-center justify-between mb-3">

                            <h2 className="text-lg font-medium text-gray-900 capitalize">
                                {task.type} Task
                            </h2>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium
                                ${task.status === "completed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {task.status}
                            </span>

                        </div>

                        <div className="text-sm text-gray-700 space-y-2">

                            {task.type === "number" && (
                                <>
                                    <p>
                                        <strong>Number:</strong>{" "}
                                        {task.payload?.number}
                                    </p>

                                    <p>
                                        <strong>Factorial:</strong>{" "}
                                        {task.result?.factorial}
                                    </p>
                                </>
                            )}

                            {task.type === "message" && (
                                <>
                                    <p>
                                        <strong>Message:</strong>{" "}
                                        {task.payload?.message}
                                    </p>

                                    <p>
                                        <strong>Processed:</strong>{" "}
                                        {task.result?.processedMessage}
                                    </p>
                                </>
                            )}

                            {task.type === "email" && (
                                <>
                                    <p>
                                        <strong>From:</strong>{" "}
                                        {task.payload?.from}
                                    </p>

                                    <p>
                                        <strong>To:</strong>{" "}
                                        {task.payload?.to}
                                    </p>

                                    <p>
                                        <strong>Message:</strong>{" "}
                                        {task.payload?.message}
                                    </p>
                                </>
                            )}

                            {task.type === "notification" && (
                                <>
                                    <p>
                                        <strong>Title:</strong>{" "}
                                        {task.payload?.title}
                                    </p>

                                    <p>
                                        <strong>Message:</strong>{" "}
                                        {task.payload?.message}
                                    </p>
                                </>
                            )}

                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}

export default ViewTasks