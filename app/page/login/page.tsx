'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5001/login", {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ correo, password }),
});

        if (response.ok) {
            router.push("/");
        } else {
            const data = await response.json();
            setError(data.message || "Error al iniciar sesión");
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-white">Correo</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-indigo-500">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    )
}

export default Login;