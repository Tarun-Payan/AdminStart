import LoginForm from "@/components/auth/login-form"
import { useEffect } from "react"

export default function Login(){
    useEffect(() => {
        document.title = "Login | AuthStack"
    }, [])

    return (
        <LoginForm />
    )
}