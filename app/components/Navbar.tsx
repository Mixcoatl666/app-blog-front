import React, { useState, useEffect } from "react";
import {
  ArrowLeftEndOnRectangleIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const Navbar = () => {
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
        <div className="flex-grow">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Buscar notas..."
              className="bg-gray-300 text-black  px-2 rounded-full pl-10 pr-4 py-2 w-full focus:outline"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
        </div>
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
