import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function ForgetPassPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onForgetPass = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgetpass", user);
            console.log("ForgetPass success", response.data);
            toast.success("ForgetPass success");
            router.push("/login");
        } catch (error:any) {
            console.log("ForgetPass failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "ForgetPass"}</h1>
        <hr />
        
        <label htmlFor="email">Email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="Email"
            />
        <button 
        className="p-2 bg-gray-800 text-white rounded-lg"
            disabled={buttonDisabled}
            onClick={onForgetPass}
            >
            {loading ? "Processing" : "ForgetPass"}
            </button>
    </div>
    )
}