import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { AuthContext } from "../context/Auth/AuthContext";

export default function HomePage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must not be undefined");
  }

  const { setAccessToken } = auth;

  async function handleLogout() {
    setLogoutError("");
    setLogoutLoading(true);

    try {
      const response = await fetch("http://localhost:4000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        setLogoutError("Logout failed. Please try again.");
        return;
      }

      setAccessToken("");
      navigate("/login");
    } catch {
      setLogoutError("Unable to connect to the server.");
    } finally {
      setLogoutLoading(false);
    }
  }

  function closeDialog() {
    if (logoutLoading) return;
    setOpenDialog(false);
    setLogoutError("");
  }

  
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold">Frontend Security Lab</h1>
            <p className="text-sm text-slate-400">
              Authentication & Security Practice
            </p>
          </div>

          <button
            onClick={() => setOpenDialog(true)}
            className="rounded-lg border border-red-500/40 bg-red-500/10
                       px-4 py-2 text-sm font-semibold text-red-400
                       transition hover:bg-red-500/20 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Page Content */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Profile</h2>
          <p className="mt-1 text-slate-400">
            Test your protected API endpoint.
          </p>
        </div>

        <Profile />
      </section>

      {/* Logout Dialog */}
      {openDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/70 px-4 backdrop-blur-sm"
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl border border-slate-700
                       bg-slate-900 p-6 shadow-2xl"
          >
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">
                Confirm Logout
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Are you sure you want to log out of your account?
              </p>
            </div>

            {logoutError && (
              <p
                className="mb-5 rounded-lg border border-red-500/20
                           bg-red-500/10 p-3 text-sm text-red-400"
              >
                {logoutError}
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={closeDialog}
                disabled={logoutLoading}
                className="rounded-lg bg-slate-700 px-4 py-2
                           font-medium text-slate-200 transition
                           hover:bg-slate-600 disabled:cursor-not-allowed
                           disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="rounded-lg bg-red-600 px-4 py-2
                           font-semibold text-white transition
                           hover:bg-red-500 disabled:cursor-not-allowed
                           disabled:opacity-50 cursor-pointer"
              >
                {logoutLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}