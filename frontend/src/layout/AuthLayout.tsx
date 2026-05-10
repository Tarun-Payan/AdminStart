import { Outlet } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";

export default function AuthLayout(){
    return (
        <div className="h-screen min-h-screen flex flex-col">
            <nav className="h-16 shrink-0 px-4 flex items-center justify-between">
                <span className="font-semibold text-2xl">Auth<span className="text-blue-200">Stack</span></span>
                <ModeToggle />
            </nav>
            <div className="flex-1 flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-4xl">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}