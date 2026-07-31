import { useState } from "react";

import Input from "../components/common/Input";
import Button from "../components/common/Button";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      console.log(formData);

    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/auth/login", formData);
      console.log("Login response:", response.data);
      alert("Login successful");

      localStorage.setItem("token", response.data.token);
      navigate("/availability");
      console.log(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        px-4
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-md
          p-8
          rounded-2xl
          shadow-lg
        "
      >
        <h2
          className="
            text-3xl
            font-bold
            text-center
            mb-2
          "
        >
          Welcome Back
        </h2>

        <p
          className="
            text-gray-500
            text-center
            mb-8
          "
        >
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button loading={loading} onClick={handleSubmit}>
            Login
          </Button>
        </form>

        <p
          className="
            text-center
            text-sm
            text-gray-500
            mt-6
          "
        >
          Don't have an account?
          <span
            className="
              text-blue-600
              cursor-pointer
              ml-1
            "
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
