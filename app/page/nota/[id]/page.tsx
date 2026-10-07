"use client";
import React, { useEffect, useState } from "react";

import Layout from "../../../components/Layout";

import { useNotaContext } from "../../../context/NotaProvider";
import { Nota } from "@/app/types/nota";

const NotaPage = ({ params }: { params: Promise<{ id: string }> }) => { 
  const [nota, setNota] = useState<Nota | null>(null)
  const { fetchNotaById } = useNotaContext()

  useEffect(() => {
    const loadNota = async () => {
      try {
        const resolvedParams = await params
        const notaData = await fetchNotaById(parseInt(resolvedParams.id))
        setNota(notaData)
      } catch (error) {
        console.error('Error al obtener la nota', error)
      }
    }
    loadNota()
  }, [params, fetchNotaById])

  if (!nota) {
    return (
      <Layout>
        <div className="container mx-auto py-10">
          <p className="text-center text-gray-500 mt-8">Cargando Nota...</p>
        </div>
      </Layout> 
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        {
          nota.imagen_url && (
            <div className="mb-6">
              <img src={nota.imagen_url} alt={nota.titulo} className="w-full h-full object-cover rounded-lg shadow-md"/>
            </div>
          )
        }
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">{nota.titulo}</h1>
        <div className="flex items-center text-gray-500 mb-6">
          <p className="text-sm">Publicado: {(new Date(nota.create_at)).toLocaleDateString()}</p>
          <span className="mx-2"> | </span>
          <p className="text-sm">Autor: {nota.autor}</p>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">{nota.descripcion}</p>
      </div>
    </Layout>
  );
};

export default NotaPage;
