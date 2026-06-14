import { useForm } from 'react-hook-form'
import {useNavigate} from 'react-router'
import axios from "axios"
import { useState } from 'react';

function Register() {
  const { register, handleSubmit,formState: { errors }} = useForm();
  const [Loading,setLoading] = useState(false);
  const [ApiError,setApiError] = useState("");
  const navigate = useNavigate();

  const onUserRegister = async(data)=> {
    console.log(data);
    const formData = new FormData();
    try{
      setLoading(true);
    formData.append("firstname",data.firstname);
    formData.append("lastname",data.lastname);
    formData.append("email",data.email);
    formData.append("password",data.password);
    formData.append("mobile",data.mobile);


    let res = await axios.post("https://distributedtaskqueue.onrender.com/user/register",formData,{withCredentials:true});
    if(res.status===201){
      navigate('/login');
    }
    }
    catch(err){
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">Create account</h1>
        <form onSubmit={handleSubmit(onUserRegister)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="border border-indigo-100 bg-indigo-50/40 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition"
            {...register("firstname")}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-indigo-100 bg-indigo-50/40 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition"
            {...register("lastname")}
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-indigo-100 bg-indigo-50/40 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition"
            {...register("email")}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-indigo-100 bg-indigo-50/40 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition"
            {...register("password")}
          />
          <input
            type="text"
            placeholder="Mobile"
            className="border border-indigo-100 bg-indigo-50/40 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition"
            {...register("mobile")}
          />
          <button
            type="submit"
            className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-400 to-purple-400 text-white text-sm font-semibold hover:opacity-90 active:scale-[0.99] transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register