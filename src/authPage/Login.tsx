import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "/Logo 3 (1).svg";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../store/api/authApi";
import { toast } from "sonner";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        const toastId = toast.loading("Logging in...");
        try {
            const res = await login(data).unwrap();

            if (res.success) {
                toast.success(res.message || "Login successful", { id: toastId });
                localStorage.setItem("accessToken", res.data.accessToken);
                navigate("/");
            } else {
                toast.error(res.message || "Login failed", { id: toastId });
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong", { id: toastId });
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="bg-white shadow-xl p-6 md:p-10 rounded-xl w-full max-w-lg border border-gray-100">
                <div className="flex flex-col items-center mb-8">
                    <img src={mainLogo} alt="Claimly Logo" className="h-12 mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Login to Account</h1>
                    <p className="text-gray-500 text-center text-sm">Please enter your email and password to continue</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all text-sm ${errors.email ? "border-red-500 focus:ring-red-500" : "border-[#CBD5E1] focus:ring-blue-600"}`}
                        />
                        {errors.email && <span className="text-red-500 text-xs">{(errors.email as any).message}</span>}
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required" })}
                                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all text-sm pr-10 ${errors.password ? "border-red-500 focus:ring-red-500" : "border-[#CBD5E1] focus:ring-blue-600"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500 text-xs">{(errors.password as any).message}</span>}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-sm text-gray-600 select-none cursor-pointer">Remember me</label>
                        </div>
                        <Link to="/auth/forget-password" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Forgot Password?</Link>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white! font-medium py-3.5 rounded-lg transition-colors duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;