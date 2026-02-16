import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RegisterResponse {
  message: string;
}

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const register = async (): Promise<void> => {
    try {
      await axios.post<RegisterResponse>(
        "/api/auth/register",
        { name, email, password }
      );

      // After successful registration → go to login
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Create Account 🚀
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Register to get started
        </p>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />

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
            onClick={register}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600 mt-3">
            Already have an account?{" "}
            <span
              className="text-indigo-600 cursor-pointer font-semibold hover:underline"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}
