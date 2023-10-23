import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useState } from "react";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleRegistering = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            {isRegistering ? "Create your account" : "Sign in to your account"}
          </h2>
        </div>
        {isRegistering ? <RegisterForm /> : <LoginForm />}
        <div className="mt-4 text-center">
          {isRegistering ? (
            <>
              <span>Already have an account? </span>
              <button
                onClick={toggleRegistering}
                className="text-blue-500 hover:text-blue-600"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <span>Don't have an account? </span>
              <button
                onClick={toggleRegistering}
                className="text-blue-500 hover:text-blue-600"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;