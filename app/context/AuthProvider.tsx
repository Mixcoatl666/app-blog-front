'use client'
import React, { createContext, useContext, useState, useEffect } from "react";

import { AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch("http://localhost:5001/check-auth", {
                    credentials: "include"
                })
                const data = await response.json()
                setIsAuthenticated(data.authenticated)
            } catch (error) {
                console.log('Error al verificar el estado de autenticación', error)
                setIsAuthenticated(false)
            } finally {
                setLoading(false)
            }
        }
        checkAuthStatus()
    }, [])

    const login = () => setIsAuthenticated(true)
    const logout = () => setIsAuthenticated(false)

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider")
    }
    return context
}