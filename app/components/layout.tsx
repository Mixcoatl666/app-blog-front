import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { useNotaContext } from "../context/NotaProvider";

interface LayoutProps {
    children: React.ReactNode
    onOpenCreateModal?: () => void
}

const Layout: React.FC<LayoutProps> =  ({ children, onOpenCreateModal  }) => {
    const { notas, setFilteredNotas } = useNotaContext()

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar notas={notas} setFilteredNotas={setFilteredNotas} onOpenCreateModal={onOpenCreateModal} />
            <main className="flex-grow">
                { children }
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
