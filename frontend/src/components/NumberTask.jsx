import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"

function NumberTask() {
  const [loading, setLoading] = useState(false)
  const [apiErrors, setApiErrors] = useState("")
  const [submitted, setSubmitted] = useState(null)
  const [factorial,setFactorial] = useState(1);
  const { register, handleSubmit } = useForm()

  const numberCalculation = async(data) => {
    console.log(data)
   try{
    setLoading(true);
    const formData = new FormData();
    formData.append("number",Number(data.number));
    let res = await axios.post("https://distributedtaskqueue.onrender.com/task/number",formData,{withCredentials:true});
    if(res.status==201){
      console.log(res.data.result.factorial);
      setFactorial(res.data.result.factorial);
      setSubmitted(data.number)
    }
   }catch(err){
    console.log(err);
   }
   finally{
    setLoading(false);
   }
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm shadow-sm">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
          Number Task
        </p>
        <h1 className="text-2xl font-medium text-gray-900 mb-6">
          Enter a value
        </h1>

        <form onSubmit={handleSubmit(numberCalculation)} className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="e.g. 42"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors"
            {...register("number")}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-900 text-white text-sm font-medium py-2.5 hover:bg-gray-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {apiErrors && (
          <p className="mt-3 text-sm text-red-500">{apiErrors}</p>
        )}
        {submitted !== null && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-100 px-4 py-2.5 text-sm text-blue-700">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Factorial: <strong>{factorial}</strong>
          </div>
        )}
      </div>
    </div>
  )
}

export default NumberTask