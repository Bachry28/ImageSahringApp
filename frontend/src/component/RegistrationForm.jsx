import React, { useState } from "react";
import { registerUser } from "../modules/fetch/index";

export default function RegistrationModal({ isOpen, onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [foto, setFoto] = useState("")
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("foto", foto); // Assuming photo is a File object
  
      await registerUser(formData);
      console.log("Registration successful");
      onClose();
    } catch (error) {
      setError(error.message || "Something went wrong");
      console.error("Registration failed:", error);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white px-10 py-20 rounded-3xl border-2">
      <h1 className="text-3xl font-semibold mb-8 mt-2 text-center">Registration Form</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          className="border-2 border-gray-100 rounded-xl p-2"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="border-2 border-gray-100 rounded-xl p-2"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="col-span-2 border-2 border-gray-100 rounded-xl p-2"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="col-span-2 border-2 border-gray-100 rounded-xl p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="col-span-2 border-2 border-gray-100 rounded-xl p-2"
          type="file"
          onChange={(e) => setFoto(e.target.files[0])}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="py-2 px-4 mr-2 rounded-xl bg-blue-500 text-white font-bold"
          onClick={handleRegister}
        >
          Register
        </button>
        <button
          className="py-2 px-4 rounded-xl bg-gray-300 text-black"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  </div>
  
  );
}
