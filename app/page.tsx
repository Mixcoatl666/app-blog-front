'use client';
import { useState, useEffect } from "react";

import Layout from "./components/layout";

interface Nota {
  id:number;
  titulo:string;
  descripcion:string;
  create_at: Date;
}

export default function Home() {

  const [notas, setNotas] = useState<Nota[]>([]);
  console.log(notas);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/notas")
      .then(response => response.json())
      .then(data => setNotas(data))
      .catch(error => console.log("Error al obtener notas:", error))
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6 text-indigo-600 text-center">Notas</h1>
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            notas.map((nota) => (
              <div key={nota.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-black text-2xl font-bold mb-2">{nota.titulo}</h2>
                <p className="text-gray-700">{nota.descripcion.slice(0, 100)}{nota.descripcion.length > 100 ? "..." : ""}</p>
                <a href={`/nota/${nota.id}`} className="text-indigo-600 font-semibold hover:text-indigo-800">Leer más</a>
                <p className="text-gray-500 text-sm mt-2">{new Date(nota.create_at).toLocaleDateString()}</p>
              </div> 
            ))
          }
        </div>
      </div>
    </Layout>
  );
}
