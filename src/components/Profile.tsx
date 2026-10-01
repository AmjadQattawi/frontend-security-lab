import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth/AuthContext";
import { useApiFetch } from "../api/useApiFetch";

interface IProfileData {
  id: number;
  username: string;
  role: string;
  secretMessage: string;
}

export default function Profile() {
  const [profileData, setProfileData] = useState<IProfileData | null>(null);
  // API / Backend response error
  const [apiError, setApiError] = useState("");

  // Network / request failure
  const [networkError, setNetworkError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiFetch = useApiFetch();
  
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("must not be undefined");
  }
  // const { accessToken, setAccessToken } = auth;

 

  async function getProfile() {
    setApiError("");
    setNetworkError("");
    setLoading(true);
    try {
      const response = await apiFetch("http://localhost:4000/api/profile", {
        method: "GET",
      });

      const data = await response.json();
      if (!response.ok) {
        setApiError(data.message);
        setProfileData(null);
        return;
      }
      setProfileData(data);
    } catch {
      setNetworkError("server error");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <section className="flex flex-col gap-4 m-12 bg-slate-800 text-white p-5 rounded-xl">
      <button
        disabled={loading}
        className="p-4 rounded-xl bg-blue-600 cursor-pointer"
        onClick={getProfile}
      >
        {loading ? "loading..." : "Get Profile"}
      </button>
      {/* <button onClick={refreshAccessToken}>Refresh Access Token</button> */}

      {apiError && (
        <p className="rounded-lg bg-red-500/10 p-3 text-red-400">{apiError}</p>
      )}

      {networkError && (
        <p className="rounded-lg bg-red-500/10 p-3 text-red-400">
          {networkError}
        </p>
      )}

      {profileData && (
        <div className="rounded-lg bg-slate-700 p-4 space-y-2">
          <p>ID: {profileData.id}</p>
          <p>Username: {profileData.username}</p>
          <p>Role: {profileData.role}</p>
          <p>Message: {profileData.secretMessage}</p>
        </div>
      )}
    </section>
  );
}
