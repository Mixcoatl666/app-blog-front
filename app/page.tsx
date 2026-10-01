'use client';
import { useState, useEffect } from "react";
import Card from "./components/Card";
import Layout from "./components/layout";

interface Nota {
  idnota:number;
  titulo:string;
  descripcion:string;
  imagen_url: string;
  create_at: Date;
}

export default function Home() {

  const [notas, setNotas] = useState<Nota[]>([]);
  console.log(notas);

  useEffect(() => {
    fetch("http://localhost:5001/notas")
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
              <Card
                key={nota.idnota}
                id={nota.idnota.toString()}
                titulo={nota.titulo}
                descripcion={nota.descripcion}
                imagen_url={nota.imagen_url}
              />  
            ))
          }
        </div>
      </div>
    </Layout>
  );
}
