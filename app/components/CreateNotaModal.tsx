import React, { useState } from "react";

import { Nota } from "../types/nota";

interface CreateNotaModalProps {
    onClose: () => void
    onSubmit: (newNota: Partial<Nota>) => Promise<{success: boolean, message: string}>
}

export const CreateNotaModal: React.FC<CreateNotaModalProps> = ({ onClose, onSubmit } ) => {
    const [titulo, setNewTitulo] = useState("")
    const [descripcion, setNewDescripcion] = useState("")
    const [imagen_url, setImageUrl] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await onSubmit({ titulo, descripcion, imagen_url })
        onClose()
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Crear un nuevo articulo</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Título</label>
                        <input 
                        type="text"
                        className="w-full p-2 border-gray-300 rounded"
                        value={titulo}
                        onChange={(e) => setNewTitulo(e.target.value )}
                        required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Descripcion</label>
                        <textarea 
                        className="w-full p-2 border-gray-300 rounded"
                        value={descripcion}
                        onChange={(e) => setNewDescripcion(e.target.value )}
                        required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Imagen URL</label>
                        <input
                        type="text" 
                        className="w-full p-2 border-gray-300 rounded"
                        value={imagen_url}
                        onChange={(e) => setImageUrl(e.target.value )}
                        required 
                        />
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 rounded mr-2" type="button" onClick={onClose}>Cancelar</button>
                        <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 rounded mr-2" type="submit">Crear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}