import React from "react"
import { useNavigate } from "react-router"
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";

function Login() {

  const {loading, setLoading, user, setUser, handleLogin} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    handleLogin({ email, password });
    navigate("/");
  };

  if(loading){
    return (
      <main className="flex min-h-screen items-center justify-center bg-linear-to-r from-indigo-600 to-purple-600">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Loading...
          </h1>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-r from-indigo-600 to-purple-600">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Login
        </h1>

        <form className="space-y-5" onSubmit={submitHandler}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-indigo-700 active:scale-95"
          >
            Login
          </button>
        </form>

        <p>
          Don't Have an account?{" "}
          <span
            className="cursor-pointer text-indigo-600 hover:underline mt-5"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
      </div>
    </main>
  );
}

export default Login;