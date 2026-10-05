import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { Nota } from "../types/nota";

interface SearchBarProps {
    notas: Nota[];
    setFilteredNotas?: (notas: Nota[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ notas, setFilteredNotas }) => {
  
    const [query, setQuery] = useState("")

    useEffect(() => {
        if (query  === "") {
            setFilteredNotas?.(notas)
        } else {
             setFilteredNotas?.(
                notas.filter( 
                    nota =>  
                        nota.titulo.toLowerCase().includes(query.toLowerCase()) || 
                        nota.descripcion.toLowerCase().includes(query.toLowerCase())
                )
             )
        }
    }, [query, notas, setFilteredNotas ])
  
    return (
    <div className="flex-grow">
      <div className="relative max-w-md mx-auto">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Buscar notas..."
          className="bg-gray-300 text-black  px-2 rounded-full pl-10 pr-4 py-2 w-full focus:outline"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      </div>
    </div>
  );
};

export default SearchBar;
