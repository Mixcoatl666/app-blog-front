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
         <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60">
             {imagen_url && (
                 <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                     <img
                         src={imagen_url}
                         alt={titulo}
                         className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                 </div>
             )}

             <div className="flex flex-1 flex-col p-6">
                 <h2 className="mb-3 line-clamp-2 text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-indigo-600">
                     {titulo}
                 </h2>
                 <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                     {descripcion.length > 100 ? `${descripcion.slice(0, 100)}...` : descripcion}
                 </p>

                 <Link
                     href={`page/nota/${id}`}
                     className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                 >
                     Leer más
                     <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                 </Link>
             </div>
         </article>
     )
 };

export default Card;
