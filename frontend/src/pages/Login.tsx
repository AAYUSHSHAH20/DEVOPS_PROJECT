import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
    token: string;
}

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const login = async (): Promise<void> => {
        try {
            const res = await axios.post<LoginResponse>(
                import.meta.env.VITE_API_URL + "/api/auth/login",
                { email, password }
            );

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

            <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
                    Welcome Back 👋
                </h2>

                <p className="text-gray-500 text-center mb-6">
                    Login to your account
                </p>

                <div className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    />

                    <button
                        onClick={login}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
                    >
                        Login
                    </button>
                    <p className="text-center text-sm text-gray-600 mt-3">
                        Don't have an account?{" "}
                        <span
                            className="text-indigo-600 cursor-pointer font-semibold hover:underline"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
}
