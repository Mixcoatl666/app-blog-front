'use client'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
    void fetchNotas();
  }, []);

  const fetchNotaById = useCallback(async (id: number): Promise<Nota | null> => {
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
  }, [notas]);

  const deleteNota = useCallback(async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5001/notas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Hubo un error al eliminar la nota")
      }

      setNotas(prev => prev.filter(notas => notas.idnota !== id))
      setFilteredNotas(prev => prev.filter(nota => nota.idnota !== id))
    } catch (error) {
      console.log('Error al eliminar la nota', error)
    }
  }, [])

  const createNota = useCallback(async (newNota: Partial<Nota>): Promise<{ success: boolean, message:string }> => {
    try {
      const response = await fetch("http://localhost:5001/create-nota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
        body: JSON.stringify(newNota),
      })

      if (response.ok) {
        const createdNota = await response.json()
        setNotas((prevNotas) => [...prevNotas, createdNota])
        return { success: true, message: "Nota creada correctamente" }
      } else {
        return { success: false, message: "Error al crear la nota" }
      }
    } catch (error) {
      console.error("Error en la solicitud: ", error)
      return { success: false, message: "Error en la solicitud" }
    }
  }, []);

  const toggleFavorito = useCallback((id: number) => {
    const nota = notas.find((n) => n.idnota === id);
    if (!nota) return;

    const nuevoValor = !nota.is_favorite;

    setNotas((prevNotas) =>
      prevNotas.map((n) =>
        n.idnota === id ? { ...n, is_favorite: nuevoValor } : n,
      ),
    );

    fetch(`http://localhost:5001/notas/favoritos/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_favorite: nuevoValor }),
    }).catch((error) => console.log("Error al actualizar favorito:", error))
  }, [notas]);

  const value = useMemo(
    () => ({
      notas,
      filteredNotas,
      setFilteredNotas,
      toggleFavorito,
      loading,
      fetchNotaById,
      createNota,
      deleteNota
    }),
    [notas, filteredNotas, toggleFavorito, loading, fetchNotaById, createNota, deleteNota],
  );

  return (
    <NotaContext.Provider value={value}>
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
