"use client";
import React, { useEffect, useState, use } from "react";
import Layout from "../../../components/layout";

interface Nota {
  id: string;
  titulo: string;
  descripcion: string;
}

const NotaPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [nota, setNota] = useState<Nota | null>(null);

  console.log(nota);

  useEffect(() => {
    fetch(`http://localhost:5001/notas/${id}`)
      .then((response) => response.json())
      .then((data) => setNota(data))
      .catch((error) => console.log("Error al obtener nota:", error));
  }, [id]);

  if (!nota) {
    return (
      <Layout>
        <div className="container mx-auto py-10">
          <p className="text-center">Cargando Nota...</p>
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
