import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useState } from "react";
import axios from "axios"

function NotificationTask() {

    const [loading, setLoading] = useState(true);
    const [ApiErrors, setApiErrors] = useState("");
    const [NotificationTitle, setNotificationTitle] = useState("");
    const [NotificationMessage, setNotificationMessage] = useState("");
    const [Submitted, setSubmitted] = useState("");
    const { handleSubmit, register } = useForm();
    const formData = new FormData();

    const onNotificationSubmit = async (data) => {
        console.log(data);
        formData.append("title", data.title);
        formData.append("message", data.message);
        const res = await axios.post("https://distributedtaskqueue.onrender.com/task/notification", formData, { withCredentials: true });
        if (res.status == 200) {
            setNotificationTitle(res.data.payload.title);
            setNotificationMessage(res.data.payload.message);
            alert(
                `Title: ${res.data.payload.title}\nMessage: ${res.data.payload.message}`);
        }
    }

    return (
        <div className="p-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm shadow-sm">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
                    Notification Task
                </p>
                <h1 className="text-2xl font-medium text-gray-900 mb-6">
                    Send a notification
                </h1>

                <form onSubmit={handleSubmit(onNotificationSubmit)} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Notification Title"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors"
                        {...register("title")}
                    />
                    <input
                        type="text"
                        placeholder="Notification Message"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors"
                        {...register("message")}
                    />

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-gray-900 text-white text-sm font-medium py-2.5 hover:bg-gray-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit
                    </button>
                </form>

                {ApiErrors && (
                    <p className="mt-3 text-sm text-red-500">{ApiErrors}</p>
                )}

                {Submitted !== "" && (
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-100 px-4 py-2.5 text-sm text-blue-700">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span><strong>{NotificationTitle}</strong>: {NotificationMessage}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NotificationTask