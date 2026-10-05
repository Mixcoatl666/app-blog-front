'use client';
import { useState, useEffect } from "react";

import Card from "./components/Card";
import Layout from "./components/Layout";
import { Nota } from "./types/nota";

export default function Home() {

  const [notas, setNotas] = useState<Nota[]>([]);
  console.log(notas);

  const [filteredNotas, setFilteredNotas] = useState<Nota[]>([]); 

  useEffect(() => {
    fetch("http://localhost:5001/notas")
      .then(response => response.json())
      .then(data => setNotas(data))
      .catch(error => console.log("Error al obtener notas:", error))
  }, []);

  const toggleFavorito = (id: number) => {
    setNotas(
      prevNotas => prevNotas.map( nota => 
        nota.idnota === id ? {
          ...nota,
          is_favorite: !nota.is_favorite
        }
        : nota
      )
    )
  

  const updateNotas = notas.find(nota => nota.idnota === id )

  fetch(`http://localhost:5001/notas/favoritos/${updateNotas?.idnota}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"     
    },
    body: JSON.stringify({ is_favorite: updateNotas ? ! updateNotas.is_favorite : false })
  }).catch(error => console.log("Error al actualizar favorito:", error))
}

  return (
    <Layout notas={notas} setFilteredNotas={setFilteredNotas}>
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6 text-indigo-600 text-center">Notas</h1>
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            filteredNotas.map((nota) => (
              <Card
                key={nota.idnota}
                id={nota.idnota.toString()}
                titulo={nota.titulo}
                descripcion={nota.descripcion}
                imagen_url={nota.imagen_url}
                autor={nota.autor}
                create_at={nota.create_at}
                is_favorite={nota.is_favorite}
                toggleFavorito={toggleFavorito}
              />  
            ))
          }
        </div>
      </div>
    </Layout>
  );
}
