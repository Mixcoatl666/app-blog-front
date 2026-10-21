import React, { useState } from "react";
import Link from "next/link";

import {
  ArrowLeftEndOnRectangleIcon,
  HeartIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import SearchBar from "./SearchBar";
import { Nota } from "../types/nota";
import { useNotaContext } from "../context/NotaProvider";
import { useAuth } from "../context/AuthProvider";

interface NavbarProps {
  notas: Nota[]
  setFilteredNotas?: (notas: Nota[]) => void
  onOpenCreateModal: () => void
}

const Navbar: React.FC<NavbarProps> = ({ notas, setFilteredNotas, onOpenCreateModal }) => {
  const [showingFavorites, setShowingFavorites] = useState(false);
  const { fetchNotas, fetchFavoritos } = useNotaContext()
  const { isAuthenticated, logout, usuario } = useAuth()

  const handleFavorites = async () => {
    if (showingFavorites) {
      await fetchNotas();
    } else {
      await fetchFavoritos();
    }

    setShowingFavorites((prev) => !prev);
  };

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Blog de Notas
        </Link>

        <SearchBar 
          notas={notas} 
          setFilteredNotas={setFilteredNotas} 
        />

        <ul className="flex space-x-6 items-center">
          {isAuthenticated && (
            <>
              {
                usuario && (
                  <li className="flex items-center gap-2">
                    <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                    <span>{usuario}</span>
                  </li>
                )
              }
              <button
                className="flex items-center hover:text-gray-300"
                onClick={() => void handleFavorites()}
                aria-pressed={showingFavorites}
              >
                <HeartIcon className="mr-2 h-5 w-5" />
                Favoritos
              </button>
              <li>
                <button
                  onClick={onOpenCreateModal}
                  className="flex items-center hover:text-gray-300"
                >
                  <PlusCircleIcon className="mr-2 h-6 w-6" />
                  Crear Nota
                </button>
              </li>
            </>
          )}
          {!isAuthenticated ? (
            <li>
              <Link
                href="/page/login"
                className="flex items-center hover:text-gray-300"
              >
                <ArrowLeftEndOnRectangleIcon className="mr-2 h-6 w-6" />
                Iniciar Sesión
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={logout}
                className="flex items-center hover:text-gray-300"
              >
                <ArrowLeftEndOnRectangleIcon className="mr-2 h-6 w-6" />
                Cerrar Sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
