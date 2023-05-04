import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom'; import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //       navigate('/')
    //     }
    //   }, [])
    const { name, email, password } = user
    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }
    const onSubmit = async (event) => {
        event.preventDefault()
        // const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
        //     method: 'POST', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(user),
        // })
        // const response = await res.json()
        const payload ={}
        const {data:response}= await axios.post('https://reqres.in/api/register',payload)
        toast.success(response.message, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (
        <div>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <ToastContainer
                    position="top-left"
                    autoClose={5000}
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
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up to your account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or
                            <NavLink to='/login' className="font-medium text-orange-600 hover:text-orange-500"> Sign in</NavLink>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="-space-y-px rounded-md shadow-sm" >
                            <div>
                                <label htmlFor="fisrtName" className="sr-only">First Name</label>
                                <input id="fisrtName" {...register("firstName", {
                                    required: 'Please enter first name.',
                                    maxLength: {
                                        value: 15,
                                        message: "First name length must not exceed 15 characters.",
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "First name length must be atleast 8 characters.",
                                    },pattern: {
                                        value: /([A-Z][a-z]*)([\\s\\\'-][A-Z][a-z]*)*/,
                                        message: 'Please enter valid fisrt name.',
                                    },
                                })} name="firstName" type="text" autoComplete="firstName" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm" placeholder="First Name" />
                            <small className="text-red-600">
                                    {errors?.firstName && errors.firstName.message}
                                </small>
                            </div>
                            <div>
                                <label htmlFor="name" className="sr-only">Last Name</label>
                                <input id="name" {...register("lastName", {
                                    required: {
                                        value: true,
                                        message: "Please enter last name."
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: "Last name length must not exceed 15 characters.",
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Last name length must be atleast 8 characters.",
                                    },pattern: {
                                        value: /([A-Z][a-z]*)([\\s\\\'-][A-Z][a-z]*)*/,
                                        message: 'Please enter valid fisrt name.',
                                    },
                                })} name="name" type="text" autoComplete="name" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm" placeholder="Last Name" />
                            <small className="text-red-600">
                                    {errors?.lastName && errors.lastName.message}
                                </small>
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                {/* <input id="email" value={email} onChange={handleChange} name="email" type="email" autoComplete="email" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm" placeholder="Email address" /> */}
                                <input id="email" {...register('email', {
                                    required: 'Email is required.',
                                    onChange: (e) => handleChange(e),
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please enter a valid email',
                                    },
                                })} name="email" type="email" autoComplete="email" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm" placeholder="Email address" />
                                <small className="text-red-600">
                                    {errors?.email && errors.email.message}
                                </small>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" {...register('password', {
                                    required: "Password is required.",
                                    onChange: (e) => handleChange(e),
                                    maxLength: {
                                        value: 15,
                                        message: "Password length must not exceed 15 characters.",
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Password length must be atleast 8 characters.",
                                    },
                                    pattern: {
                                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                                        ,
                                        message: 'Use 8 or more characters with a mix of letters, numbers & symbols'
                                    },
                                })} name="password" type="password" autoComplete="current-password" className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm" placeholder="Password" />
                                <small className="text-red-600">
                                    {errors?.password && errors.password.message}
                                </small>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                                <input id="confirmPassword" {...register('confirmPassword', {
                                    required: "Confirm password is required.",
                                    onChange: (e) => handleChange(e),
                                    validate:(val)=>{
                                        if(val!== watch('password'))return 'Those passwords didn’t match. Try again.'
                                    }
                                })} name="confirmPassword" type="password" autoComplete="current-password" className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm" placeholder="Confirm Password" />
                                <small className="text-red-600">
                                    {errors?.confirmPassword && errors.confirmPassword.message}
                                </small>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">

                                    <svg className="h-5 w-5 text-orange-500 group-hover:text-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register