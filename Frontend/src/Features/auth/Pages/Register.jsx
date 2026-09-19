import { useNavigate } from "react-router";

function Register() {

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-r from-indigo-600 to-purple-600">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Register
        </h1>

        <form className="space-y-5" onSubmit={submitHandler}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

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
              required
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-indigo-700 active:scale-95"
          >
            Register
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <span
            className="cursor-pointer text-indigo-600 hover:underline mt-5"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </main>
  );
}

export default Register;