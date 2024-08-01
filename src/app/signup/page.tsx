"use client";
import Link from "next/link";
import React, { FormEvent, useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import AuthBg from "@/components/ui/AuthBg";
import { NextResponse } from "next/server";



export default function SignupPage() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password"),
            }),
        });
        console.log(response);
    }
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        name: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.name.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
    <AuthBg>
        <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-col items-start gap-0.8">
            <label htmlFor="email">Email</label>
            <input 
            className="py-1 px-2 w-full bg-[#5A7191]/60 rounded-lg focus:outline-none focus:border-gray-600 text-white"
            id="email"
            name="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email"
                />
        </div> 
        <div className="flex w-full flex-col items-start gap-2">
            <label htmlFor="name">Name</label>
            <input 
            className="py-1 px-2 w-full bg-[#5A7191]/60 rounded-lg focus:outline-none focus:border-gray-600 text-white"
            id="name"
            name="name"
                type="text"
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
                placeholder="Name"
                />
        </div> <br />
        <div className="flex w-full flex-col items-start gap-0.5">
            <label htmlFor="password">Password</label>
            <input 
            className="py-1 px-2 w-full bg-[#5A7191]/60 rounded-lg focus:outline-none focus:border-gray-600 text-white"
            id="password"
            name="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
                />
        </div>
        <br />
        <button
        type="submit" 
        className="p-2 mt-2 text-center w-full bg-gradient-to-b from-[#5A93C1]/60 to-[#235D8C]/60 rounded-lg  focus:outline-none focus:border-gray-600"
        disabled={buttonDisabled}
        >
        {loading ? "Processing" : "SIGNUP"}
        </button>
        </form>
        <Link href="/login">Already have an account? Log in</Link>
    </AuthBg>
    )

}