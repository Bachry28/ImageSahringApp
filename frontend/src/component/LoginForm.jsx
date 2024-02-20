import React, { useState } from "react";
import { loginUser } from "../modules/fetch/index"; 

export default function LoginForm({ onRegisterClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleLogin = async () => {
    try {
      const userData = await loginUser(username, password);
      console.log("Login successful:", userData);
    } catch (error) {
      setError(error.message);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2">
      <h1 className="text-5xl font-semibold">Image App</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Sign Up If you Don't Have Account
      </p>
      <div className="mt-8">
        <div>
          <label className="text-lg font-medium">User Name</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter Your User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="text-lg font-medium">Password</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter Your Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-y-4">
        <button
          className="active:scale-[.98] active:duration-75 transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold"
          onClick={handleLogin}
        >
          Sign In
        </button>
        <button
          className="py-3 rounded-xl bg-blue-100 text-black"
          onClick={onRegisterClick}
        >
          Sign Up
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
