'use client'
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import AuthBg from "@/components/ui/AuthBg";


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
    <AuthBg>
        <form className="flex flex-col gap-2 w-full">
        <div className="flex w-full flex-col items-start gap-1">
            <label htmlFor="email">Email</label>
            <input 
                className="py-1 px-2 w-full bg-[#5A7191]/60 rounded-lg focus:outline-none focus:border-gray-600 text-white"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email"
                />
        </div>
        
        <button 
        className="p-2 mt-2 text-center w-full bg-gradient-to-b from-[#5A93C1]/60 to-[#235D8C]/60 rounded-lg  focus:outline-none focus:border-gray-600"
        disabled={buttonDisabled}
        onClick={onForgetPass}
        >
        {loading ? "Processing" : "RESET"}
        </button>
        <label className="text-white text-center mt-2">Remember your password? <a href="/login" className="text-blue-500">Login</a></label>
    </form>
    </AuthBg>
    );
};

function useContext(GlobalContext: any): { loading: any; passwordRecoveryEmailError: any; sendPasswordRecoveryEmail: any; } {
    throw new Error("Function not implemented.");
}

