import React, { useState } from "react";
import LoginForm from "../component/LoginForm";
import RegistrationForm from "../component/RegistrationForm";

function UserLogin() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <LoginForm onRegisterClick={openRegisterModal} />
      </div>

      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-blue-100">
        <div className="text-3xl">Hi What You Wont To Sharing for As</div>
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to bg-pink-400 rounded-full animate-bounce"></div>
        <div className="w-full h-1/1 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
      </div>

      {/* Pass the isOpen and onClose props to the RegistrationForm */}
      <RegistrationForm
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
      />
    </div>
  );
}

export default UserLogin;
