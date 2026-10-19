"use client";
import { useState } from "react";

import { AuthProvider } from "./context/AuthProvider";
import { NotaProvider, useNotaContext } from "./context/NotaProvider";

import Card from "./components/Card";
import Layout from "./components/Layout";
import { CreateNotaModal } from "./components/CreateNotaModal";

export default function Home() {
return (
  <NotaProvider>
    <AuthProvider>
      <HomeContent />
    </AuthProvider> 
  </NotaProvider>
)
}

function HomeContent(){
  const { filteredNotas, loading, createNota } = useNotaContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleModalOpen = () => {
    setIsModalOpen(true)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
  }


  if (loading) {
    return <p>Cargando Articulos...</p>;
  }

  return (
      <Layout onOpenCreateModal={handleModalOpen}>
        <div className="container mx-auto py-10">
          <h1 className="text-4xl font-bold mb-6 text-indigo-600 text-center">
            Notas
          </h1>
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNotas.map((nota) => (
              <Card
                key={nota.idnota}
                id={nota.idnota} 
              />
            ))}
          </div>
          {isModalOpen && <CreateNotaModal onClose={handleModalClose} onSubmit={createNota}/>}
        </div>
      </Layout>
  );
}