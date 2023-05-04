import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //       navigate('/')
    //     }
    //   }, [])
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm();
    const { email, password } = user
    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }
    const onSubmit = async (event) => {
        event.preventDefault()
        // const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        //     method: 'POST', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(user),
        // })
        // const response = await res.json()
        const payload ={}
        const {data:response}= await axios.post('https://reqres.in/api/login',payload)
        if (response.success) {
            toast.success('You successfully logged in', {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(response.token)
            localStorage.setItem('token', response.token)
            setTimeout(() => {
                navigate(process.env.NEXT_PUBLIC_HOST)
            }, 1000)
        }
        else {
            toast.error(response.message, {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    return (
        <div>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <ToastContainer
                    position="top-left"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600" alt="Your Company" />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or
                            <NavLink to={'/signup'} className="font-medium text-orange-600 hover:text-orange-500"> Sign Up</NavLink>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="-space-y-px rounded-md shadow-sm" >
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                {/* <input value={email} onChange={handleChange} {...register('email', { */}
                                <input {...register('email', {
                                    required: 'Email is required.',   
                                    onChange:(e)=>handleChange(e),
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please enter a valid email',
                                    },
                                })} id="email" name="email" type="email" autocomplete="email"  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm" placeholder="Email address" />
                                <small className="text-red-600">
                                    {errors?.email && errors.email.message}
                                </small>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr">Password</label>
                                {/* <input value={password} onChange={handleChange} {...register({ */}
                                <input  {...register('password',{
                                    required: "Password is required.",
                                    onChange:(e)=>handleChange(e),
                                    maxLength: {
                                        value: 15,
                                        message: "Password length must not exceed 15 characters.",
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Password length must be atleast 8 characters.",
                                    },
                                    pattern:{
                                        value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                                        ,
                                        message:'Use 8 or more characters with a mix of letters, numbers & symbols'
                                    },
                                })} id="password" name="password" type="password" autocomplete="current-password"  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm" placeholder="Password" />
                            <small className="text-red-600">
                                    {errors?.password && errors.password.message}
                                </small>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                            </div>

                            <div className="text-sm">
                                <NavLink to={"/forgot"} className="font-medium text-orange-600 hover:text-orange-500">Forgot your password?</NavLink>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">

                                    <svg className="h-5 w-5 text-orange-500 group-hover:text-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login