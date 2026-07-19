import { api } from "@/lib/axios";
import { toast } from "sonner"
import { type LoginFormValues, type SignupFormValues } from "@/validator/auth.schema"
// import { useRouter } from "next/navigation";

export function useAuth(){
    // const router = useRouter()

    const register = async (data: SignupFormValues) => {
        try {
            const { confirmPassword, ...payload } = data;
            const res = await api.post(`/api/register`, {
                ...payload
            })

            console.log("Register response: ", res)
            if (res.data.error) {
                console.log("Error: ", res)
                toast.error(res.data.message || "Failed to register!")
                return
            }

            toast.success("Registered successfully!")
            // router.push('/dashboard');
        } catch (error: any) {
            console.log('Failed to register', error)
            const errorMessage = error.response?.data?.message || "Failed to register!"
            toast.error(errorMessage)
        }
    }

    const login = async (data: LoginFormValues) => {
        try {
            const res = await api.post(`/api/login`, data)

            if (res.data.error) {
                console.log("Error: ", res)
                toast.error(res.data.message || "Failed to login!")
                return
            }

            toast.success("Logged in successfully!")
            // router.push('/dashboard');
        } catch (error: any) {
            console.log('Failed to login', error)
            const errorMessage = error.response?.data?.message || "Failed to login!"
            toast.error(errorMessage)
        }
    }

    const logout = async () => {
        try {
            const res = await api.post(`/api/auth/logout`)
            if (res.data.error) {
                console.log("Error: ", res)
                toast.error(res.data.message || "Failed to logout!")
                return
            }

            toast.success("Logged out successfully!")
            // router.push('/sign-in');
        } catch (error: any) {
            console.log('Failed to logout', error)
            const errorMessage = error.response?.data?.message || "Failed to logout!"
            toast.error(errorMessage)
        }
    }

    return { login, logout, register }
}
