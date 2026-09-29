import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-indigo-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Blog de Notas</h1>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/">Home</a>
                        <a href="/crear">Crear</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;