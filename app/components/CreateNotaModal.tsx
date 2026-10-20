import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Nota } from "../types/nota";

interface CreateNotaModalProps {
    onClose: () => void;
    onSubmit: (newNota: Partial<Nota>) => Promise<{ success: boolean; message: string }>;
}

export const CreateNotaModal: React.FC<CreateNotaModalProps> = ({ onClose, onSubmit }) => {
    const [titulo, setNewTitulo] = useState("");
    const [descripcion, setNewDescripcion] = useState("");
    const [imagen_url, setImageUrl] = useState("");

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({ titulo, descripcion, imagen_url });
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 px-4 py-8 backdrop-blur-sm"
            role="presentation"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-nota-title"
                className="w-full max-w-lg rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xl shadow-slate-950/20 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40 sm:p-8"
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            Nueva nota
                        </p>
                        <h2 id="create-nota-title" className="text-2xl font-bold text-slate-900 dark:text-white">
                            Crear una nueva nota
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Cerrar modal"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="nota-titulo" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Título
                        </label>
                        <input
                            id="nota-titulo"
                            type="text"
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                            value={titulo}
                            onChange={(e) => setNewTitulo(e.target.value)}
                            placeholder="Escribe el título de tu nota"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="nota-descripcion" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Descripción
                        </label>
                        <textarea
                            id="nota-descripcion"
                            rows={5}
                            className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                            value={descripcion}
                            onChange={(e) => setNewDescripcion(e.target.value)}
                            placeholder="Escribe una breve descripción"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="nota-imagen" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            URL de la imagen
                        </label>
                        <input
                            id="nota-imagen"
                            type="url"
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                            value={imagen_url}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            required
                        />
                    </div>
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus:ring-offset-slate-900"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                        >
                            Crear nota
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
