import React, { useState } from "react";
import { validateRegisterFormField } from "../utils/RegisterFormValidation";
import axios from "axios";
import { BASE_URL } from "../App";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const validateField = (name: keyof typeof formData, value: string) => {
    let errors = { ...formErrors };
    errors[name] = validateRegisterFormField(name, value);
    setFormErrors(errors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof typeof formData, value);
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        await axios.post(`${BASE_URL}/register`, formData);
    } catch (error) {
        setServerError("Failed to register. Please try again later.");
    }
};

  return (
    <form className="mt-8" onSubmit={register}>
      <div className="rounded-md shadow-sm">
        <div>
          <input
            aria-label="Username"
            name="username"
            type="text"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {formErrors.username && (
            <p className="text-red-500 text-xs mt-1">{formErrors.username}</p>
          )}
        </div>
        <div className="mt-2">
          <input
            aria-label="Password"
            name="password"
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {formErrors.password && (
            <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
          )}
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-800 transition duration-150 ease-in-out"
          disabled={Object.values(formErrors).some((error) => error)}
        >
          Register
        </button>
        {serverError && <p className="mt-2 text-red-500">{serverError}</p>}
      </div>
    </form>
  );
};

export default RegisterForm;