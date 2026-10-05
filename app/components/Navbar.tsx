import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  ArrowLeftEndOnRectangleIcon,
  PlusCircleIcon
} from "@heroicons/react/24/solid";

import SearchBar from "./SearchBar";
import { Nota } from "../types/nota";

  interface NavbarProps {
    notas: Nota[]; 
    setFilteredNotas?: (notas: Nota[]) => void;
  }

const Navbar: React.FC<NavbarProps> = ({ notas, setFilteredNotas }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5001/check-auth", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.log("Error al verificar la autenticación:", error);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5001/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
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
            <li>
              <Link
                href="/crear"
                className="flex items-center hover:text-gray-300"
              >
                <PlusCircleIcon className="mr-2 h-6 w-6" />
                Crear Nota
              </Link>
            </li>
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
                onClick={handleLogout}
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
