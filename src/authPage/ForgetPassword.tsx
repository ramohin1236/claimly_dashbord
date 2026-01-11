import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useForgetPasswordMutation } from "../store/api/authApi";
import { toast } from "sonner";
import mainLogo from "/Logo 3 (1).svg";
import { ArrowLeft } from "lucide-react";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Sending verification code...");
    try {
      const res = await forgetPassword(data).unwrap();

      if (res.success) {
        toast.success(res.message || "Verification code sent!", { id: toastId });
        // Store email to autofill or use in next step if needed
        localStorage.setItem("resetEmail", data.email);
        navigate("/auth/verify-otp");
      } else {
        toast.error(res.message || "Failed to send code", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-white shadow-xl p-6 md:p-10 rounded-xl w-full max-w-lg border border-gray-100 relative">
        <Link to="/auth/login" className="absolute top-6 left-6 text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft size={20} />
        </Link>

        <div className="flex flex-col items-center mb-8 mt-4">
          <img src={mainLogo} alt="Claimly Logo" className="h-12 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Forget Password?</h1>
          <p className="text-gray-500 text-center text-sm">Please enter your email to get verification code</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all text-sm ${errors.email ? "border-red-500 focus:ring-red-500" : "border-[#CBD5E1] focus:ring-blue-600"}`}
            />
            {errors.email && <span className="text-red-500 text-xs">{(errors.email as any).message}</span>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white! font-medium py-3.5 rounded-lg transition-colors duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Continue"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Remember your password?{" "}
            <Link to="/auth/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;