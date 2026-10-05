import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Nota } from "../types/nota";

interface LayoutProps {
    children: React.ReactNode
    notas: Nota[]
    setFilteredNotas?: (notas: Nota[]) => void
}

const Layout: React.FC<LayoutProps> =  ({ children, notas, setFilteredNotas }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar notas={notas} setFilteredNotas={setFilteredNotas} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;