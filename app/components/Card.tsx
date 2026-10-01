 import React from "react";
 import Link from "next/link";

 interface CardProps {
    id: string;
    titulo: string;
    descripcion: string;
    imagen_url: string;
 }

 const Card: React.FC<CardProps> = ({ id, titulo, descripcion, imagen_url }) => {
    return (
        <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {
                imagen_url && (
                    <img src={imagen_url} alt={titulo} className="w-full h-48 object-cover"/>
                )
            }
            <div className="p-6">
                <h2 className="text-2xl font-bold text-indigo-600 mb-2">{titulo}</h2>
                <p className="text-gray-700">{descripcion.slice(0, 100)}... </p>
            </div>
            <div className="p-4 bg-indigo-600 text-center">
                <Link href={`page/nota/${id}`} className="text-white font-bold hover:underline">
                    <span className="text-white font-semibold hover:text-gray-300 cursor-pointer">Leer más...</span>
                </Link>
            </div>  
        </div>
    )
 };

export default Card;