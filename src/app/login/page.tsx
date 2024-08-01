"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import AuthBg from "@/components/ui/AuthBg";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        
    })

     
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response =  signIn('crendentials', { 
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
    });
    console.log(response);
    }

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/dashboard");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]
);

    return (
        <AuthBg>
            <form onSubmit={handleSubmit}>
            <div className="flex w-full flex-col items-start gap-1">
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
                <button type="submit" disabled={buttonDisabled}
                onClick={onLogin}
                className="p-2 mt-2 text-center w-full bg-gradient-to-b from-[#5A93C1]/60 to-[#235D8C]/60 rounded-lg  focus:outline-none focus:border-gray-600">Login</button>
            </div>
            </form>
            <Link href="/signup">Don't have an account? Signup</Link>
        </AuthBg>
    )


}