"use client";
import { signupFormValidateSchema } from "@/helpers/yup-Schema";
import useSignup from "@/hooks/useSignup";
import { delay } from "@/utils";
import { useFormik } from "formik";
import { Span } from "next/dist/trace";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import logo from "@/public/myshopbd-dark.png"
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";

interface UserDataTypes {
    username: string;
    email: string;
    password: string;
}
const Signup = () => {
    const [loading, setLoading] = useState(false);
    // const [response, setResponse] = useState("")
    const [error, setError] = useState({
        error: false,
        message: "",
    });
    const handleSignup = async (user: UserDataTypes) => {
        setError({ error: false, message: "" });
        try {
            setLoading(true);
            let response = await fetch("https://mybackend-06gh.onrender.com/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            let data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                setError({ error: true, message: data.message });
                return;
            }

            if (data.success) {
                toast.success(data.message);
                await delay(1000);
                window.location.href = "/login";
            }

        } catch (error) {
            setError({ error: true, message: "something was wroing ! " });
            toast.error("something was wrong ! ");
        } finally {
            setLoading(false);
        }
    };



    const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
        useFormik({
            initialValues: {
                username: "",
                email: "",
                password: "",
            } as UserDataTypes,
            validationSchema: signupFormValidateSchema,
            onSubmit: async (values) => {
                if (navigator.onLine) {
                    handleSignup(values);
                } else {
                    setLoading(true);
                    await delay(3000);
                    setLoading(false);
                    toast.error("please conncet to the internet")
                }
            },
        });



    const saveUser = async (user: UserDataTypes) => {
        setError({ error: false, message: "" });
        try {
            setLoading(true);
            let response = await fetch("http://localhost:8000/user/save-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
                credentials: "include"
            });
            let data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                setError({ error: true, message: data.message });
                return;
            }

            if (data.success) {
                toast.success(data.message);
                await delay(1000);
                window.location.href = "/";
                // lo.setItem("sessionStorage", "dgfsfg")
            }

        } catch (error) {
            setError({ error: true, message: "something was wroing ! " });
            toast.error("something was wrong ! ");
        } finally {
            setLoading(false);
        }
    };


    const me = (data: any) => {
        console.log(data);

    }

    const login = useGoogleLogin({

        onSuccess: tokenResponse => (me(tokenResponse))
        ,
    });

    const handleGoogleLogin = async (user: UserDataTypes) => {
        if (navigator.onLine) {
            saveUser(user);
        } else {
            setLoading(true);
            await delay(3000);
            setLoading(false);
            toast.error("please conncet to the internet")
        }
    }

    const tr = () => {
        return <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
                const token = credentialResponse.credential
                const decodedToken = jwtDecode(token!);
                // window.location.href = "/"
                handleGoogleLogin({ username: decodedToken.name, email: decodedToken.email, password: "googleuser" })
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />;
    }

    console.log(tr);


    return (
        <main className="min-h-screen relative  text-gray-900 bg-white flex justify-center items-center">




            <div className="sm:rounded-lg flex justify-center flex-1">
                {
                    loading && <div className="w-full h-screen absolute top-0 left-0 z-50 bg-black/50 flex items-center justify-center"><ClipLoader color="#fff" /></div>
                }
                <div className=" p-6 sm:p-12">

                    <div className="mt-6 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-bold">Sign up</h1>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse);
                                const token = credentialResponse.credential
                                const decodedToken = jwtDecode(token!);
                                // window.location.href = "/"
                                handleGoogleLogin({ username: decodedToken.name, email: decodedToken.email, password: "googleuser" })
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />;
                        {/* <div className="w-full flex-1 mt-5">
                            <div className="flex flex-col items-center">
                                <button
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                                    onClick={() => { }}
                                >
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4"
                                            />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853"
                                            />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04"
                                            />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335"
                                            />
                                        </svg>
                                    </div>
                                    <span className="ml-4">Sign Up with Google</span>
                                </button>
                            </div>
                            {error.error && (
                                <span className="flex  w-full p-3 items-center text-center text-lg text-red-500 font-semibold justify-center">
                                    {error.message}
                                </span>
                            )}
                            <div className="my-5 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign up with e-mail
                                </div>
                            </div>
                            <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                                <div>
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.username && touched.username && (
                                        <p className="text-red-500 text-md font-semibold mt-2 capitalize">
                                            {errors.username}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        className="w-full px-8 py-4 rounded-lg mt-5 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email && (
                                        <p className="text-red-500 text-md font-semibold mt-2 capitalize">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="password"
                                    />
                                    {errors.password && touched.password && (
                                        <p className="text-red-500 text-md font-semibold mt-2 capitalize">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <button
                                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:bg-gray-500"
                                    disabled={
                                        errors.username
                                            ? true
                                            : false || errors.password
                                                ? true
                                                : false || errors.email
                                                    ? true
                                                    : false
                                    }
                                >
                                    <svg
                                        className="w-6 h-6 -ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy={7} r={4} />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        {loading ? "Loading..." : "Sign Up"}
                                    </span>
                                </button>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by templatana &apos; s
                                    <a
                                        href="#"
                                        className="border-b border-gray-500 border-dotted"
                                    >
                                        Terms of Service
                                    </a>
                                    and its
                                    <a
                                        href="#"
                                        className="border-b border-gray-500 border-dotted"
                                    >
                                        Privacy Policy
                                    </a>
                                </p>
                                <p className="mt-6 text-lg text-gray-600 text-center">
                                    Already have a account{" "}
                                    <Link className="text-blue-600" href={"/login"}>
                                        Login
                                    </Link>
                                </p>
                            </form>
                        </div> */}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;
