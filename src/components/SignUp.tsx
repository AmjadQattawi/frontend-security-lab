import { useState } from "react";
import logo from "../assets/logo-22-Soft.webp";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Frontend Error
  const [validationError, setValidationError] = useState("");

  // API / Backend response error
  const [apiError, setApiError] = useState("");

  // Network / request failure
  const [networkError, setNetworkError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setValidationError("");
    setApiError("");
    setNetworkError("");
    setSuccessMsg("");
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      setSuccessMsg("");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          // I am telling the Backend that the data I am sending inside the body is in JSON format.
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setApiError(data.message);
        setSuccessMsg("");
        return;
      }
      setApiError("");
      setSuccessMsg("Account created successfully");
    } catch {
      setNetworkError("error with server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      id="signup"
      className="min-h-screen bg-slate-950 flex items-center justify-center px-4"
    >
      <section className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8">
        <img
          src={logo}
          alt="Logo"
          className="w-20 h-20 object-contain mx-auto mb-5"
        />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-slate-400 mt-2">Sign up to get started</p>
        </div>

        {networkError && (
          <section>
            <p className="mb-4 text-center text-sm text-red-400">
              {networkError}
            </p>
          </section>
        )}
        {apiError && (
          <section>
            <p className="mb-4 text-center text-sm text-red-400">{apiError}</p>
          </section>
        )}
        {successMsg && (
          <section>
            <p className="mb-4 text-center text-sm text-green-400">
              {successMsg}
            </p>
          </section>
        )}
        {validationError && (
          <p className="mb-4 text-center text-sm text-red-400">
            {validationError}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Username
            </label>

            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full bg-slate-800 border border-slate-700 text-white
                         rounded-lg px-4 py-3 outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full bg-slate-800 border border-slate-700 text-white
                         rounded-lg px-4 py-3 outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full bg-slate-800 border border-slate-700 text-white
                         rounded-lg px-4 py-3 outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white
                       font-semibold py-3 rounded-lg transition cursor-pointer"
          >
            {loading ? "loading..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Log In
          </Link>
        </p>
      </section>
    </main>
  );
}
