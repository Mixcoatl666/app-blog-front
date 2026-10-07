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
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6">{nota.titulo}</h1>
        <p>{nota.descripcion}</p>
      </div>
    </Layout>
  );
};

export default NotaPage;
