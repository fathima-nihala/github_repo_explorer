import React from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL;    


  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        data
      );
      toast.success("Login successful 🎉");
      console.log("Login Response:", response.data);

      const token = response.data?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        toast.error("No token received ❌");
      }

      reset();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 cursor-pointer text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
