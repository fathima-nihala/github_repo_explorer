// import React from "react";
// import { useForm } from "react-hook-form";
// import axios, { AxiosError } from "axios";
// import toast, { Toaster } from "react-hot-toast";

// interface SignupFormInputs {
//   username: string;
//   email: string;
//   password: string;
// }

// const Signup: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<SignupFormInputs>();

//   const onSubmit = async (data: SignupFormInputs) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         data
//       );
//       toast.success("Signup successful 🎉");
//       console.log(response.data);
//       reset();
//     } catch (err) {
//       const error = err as AxiosError<{ message: string }>;
//       toast.error(error.response?.data?.message || "Signup failed ❌");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       {/* Toast notifications */}
//       <Toaster position="top-right" reverseOrder={false} />

//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
//         <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Username */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Username</label>
//             <input
//               type="text"
//               {...register("username", { required: "Username is required" })}
//               className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
//                 errors.username ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your username"
//             />
//             {errors.username && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.username.message}
//               </p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: "Enter a valid email",
//                 },
//               })}
//               className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <input
//               type="password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters",
//                 },
//               })}
//               className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your password"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {isSubmitting ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

interface SignupFormInputs {
  username: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormInputs>();

  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );
      toast.success("Signup successful 🎉 Redirecting to login...");
      console.log(response.data);

      reset();

      // ⏳ small delay so user sees the toast before redirect
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
