import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
    const [loading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/users/register", formData);
            console.log("Registration response:",response.data);
      alert("Registration successful");

      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
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
                    Create Account
                </h2>

                <p
                    className="
text-gray-500
text-center
mb-8
"
                >
                    Register to start your journey
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="
space-y-5
"
                >
                    <Input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />

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
                        placeholder="Create password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <Button type="submit" loading={loading}>
                        Register
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
                    Already have an account?
                    <span
                        className="
text-blue-600
cursor-pointer
ml-1
"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
