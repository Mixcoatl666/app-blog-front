'use client'
import React, { createContext, useContext, useState, useEffect } from "react";

import { Nota, NotaContextType } from "../types/nota";

const NotaContext = createContext<NotaContextType | undefined>(undefined);

export const NotaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [filteredNotas, setFilteredNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch("http://localhost:5001/notas");
        const data = await response.json();
        setNotas(data);
        setFilteredNotas(data);
        setLoading(false);
      } catch (error) {
        console.log("Error al obtener notas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotas();
  }, []);

  const fetchNotaById = async (id: number): Promise<Nota | null> => {
    const existingNota = notas.find((nota) => nota.idnota === id);
    if (existingNota) return existingNota;

    try {
      const response = await fetch(`http://localhost:5001/notas/${id}`);
      if (!response.ok) throw new Error("Nota no encontrada");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener la nota:", error);
      return null;
    }
  };

  const toggleFavorito = (id: number) => {
    setNotas((prevNotas) =>
      prevNotas.map((nota) =>
        nota.idnota === id
          ? {
              ...nota,
              is_favorite: !nota.is_favorite,
            }
          : nota,
      ),
    );

    const updateNotas = notas.find((nota) => nota.idnota === id);

    fetch(`http://localhost:5001/notas/favoritos/${updateNotas?.idnota}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_favorite: updateNotas ? !updateNotas.is_favorite : false,
      }),
    }).catch((error) => console.log("Error al actualizar favorito:", error));
  };

  return (
    <NotaContext.Provider
      value={{
        notas,
        filteredNotas,
        setFilteredNotas,
        toggleFavorito,
        loading,
        fetchNotaById,
      }}
    >
      {children}
    </NotaContext.Provider>
  );
};

export const useNotaContext = () => {
  const context = useContext(NotaContext);
  if (!context) {
    throw new Error("useNotaContext debe de usarse dentro de un NotaProvider");
  }
  return context;
};
