import { SignupForm } from "@/components/auth/signup-form"
import { useEffect } from "react"

export default function SignUp(){
    useEffect(() => {
        document.title = "SignUp | AutStack"
    }, [])
    return (
        <SignupForm />
    )
}