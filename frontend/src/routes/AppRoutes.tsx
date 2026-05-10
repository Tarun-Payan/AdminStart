import { BrowserRouter, Routes, Route } from "react-router";

import App from '@/App.tsx'
import AuthLayout from "@/layout/AuthLayout.tsx";
import Login from "@/pages/auth/Login.tsx";
import SignUp from "@/pages/auth/SignUp";

export default function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} /> 

                <Route element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}