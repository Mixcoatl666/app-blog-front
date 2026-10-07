'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

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
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-indigo-100/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white">
                        Iniciar Sesión
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Ingresa tus credenciales para continuar
                    </p>
                </div>

                {error && (
                    <p
                        role="alert"
                        className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400"
                    >
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="correo" className={labelClass}>Correo</label>
                        <input
                            id="correo"
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder="tu@correo.com"
                            autoComplete="email"
                            className={inputClass}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className={labelClass}>Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            className={inputClass}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;
