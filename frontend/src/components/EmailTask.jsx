import { useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios"

function EmailTask() {

    const [ApiErrors, setApiErrors] = useState("")
    const [EmailFrom, setEmailFrom] = useState("")
    const [EmailTo, setEmailTo] = useState("")
    const [EmailMessage, setEmailMessage] = useState("")
    const [Submitted, setSubmitted] = useState("")

    const { handleSubmit, register } = useForm()

    const onEmailSubmit = async (data) => {

        console.log(data)

        try {

            const res = await axios.post(
                "https://distributedtaskqueue.onrender.com/task/email",
                {
                    from: data.from,
                    to: data.to,
                    message: data.message
                },
                {
                    withCredentials: true
                }
            )

            if (res.status === 200) {

                setEmailFrom(res.data.payload.from)
                setEmailTo(res.data.payload.to)
                setEmailMessage(res.data.payload.message)

                setSubmitted("success")

                alert(
                    `From: ${res.data.payload.from}
To: ${res.data.payload.to}
Message: ${res.data.payload.message}`
                )
            }

        } catch (error) {

            console.log(error)

            setApiErrors(
                error.response?.data?.message || "Something went wrong"
            )
        }
    }

    return (
        <div className="p-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm shadow-sm">

                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
                    Email Task
                </p>

                <h1 className="text-2xl font-medium text-gray-900 mb-6">
                    Send an email
                </h1>

                <form
                    onSubmit={handleSubmit(onEmailSubmit)}
                    className="flex flex-col gap-3"
                >

                    <input
                        type="email"
                        placeholder="From Email"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors"
                        {...register("from")}
                    />

                    <input
                        type="email"
                        placeholder="To Email"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors"
                        {...register("to")}
                    />

                    <textarea
                        placeholder="Email Message"
                        rows={4}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors"
                        {...register("message")}
                    />

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-gray-900 text-white text-sm font-medium py-2.5 hover:bg-gray-700 active:scale-[0.98] transition-all"
                    >
                        Submit
                    </button>

                </form>

                {ApiErrors && (
                    <p className="mt-3 text-sm text-red-500">
                        {ApiErrors}
                    </p>
                )}

                {Submitted !== "" && (
    <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">

        <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
            />
        </svg>

        <span>
            Email sent successfully
        </span>

    </div>
)}

            </div>
        </div>
    )
}

export default EmailTask