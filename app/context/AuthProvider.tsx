'use client'
import React, { createContext, useContext, useState, useEffect } from "react";

import { AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [usuario, setUsuario] = useState("")
    const [usuarioId, setUsuarioId] = useState<number | null>(null)

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch("http://localhost:5001/check-auth", {
                    credentials: "include"
                })
                const data = await response.json()
                if (data.authenticated) {
                    setIsAuthenticated(data.authenticated)
                    setUsuario(data.usuario)
                    setUsuarioId(data.user_id)
                } else {
                    setIsAuthenticated(false)
                     setUsuario("")
                     setUsuarioId(null)
                }
            } catch (error) {
                console.error('Error al verificar el estado de autenticación', error)
                setIsAuthenticated(false)
                setUsuario("")
                setUsuarioId(null)
            } finally {
                setLoading(false)
            }
        }
        checkAuthStatus()
    }, [])

    const register = async (usuario:string, correo:string, password:string ): Promise<{'success':boolean, 'message':string}> => {
        try {
            const response = await fetch("http://localhost:5001/register",{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({usuario, correo, password})
            })

            if (response.ok) {
                return {success: true, message:'Registro exitoso'}
            } else {
                const data = await response.json()
                return {success: false, message: data.error || 'Registro no exitoso'}
            }
        } catch (error) {
            console.error('Error al registrarse: ', error)
            return {success: false, message:'Registro no exitoso'}
        }
    }

    const login = async () => {
        const response = await fetch("http://localhost:5001/check-auth", {
            credentials: "include",
        })
        if (!response.ok) throw new Error("No se pudo verificar la sesión")

        const data = await response.json()
        if (!data.authenticated) throw new Error("La sesión no está activa")

        setIsAuthenticated(true)
        setUsuario(data.usuario)
        setUsuarioId(data.user_id)
    }
    const logout = async () => {
        try {
            await fetch("http://localhost:5001/logout", {
                method: "POST",
                credentials: "include",
            })
        } catch (error) {
            console.error("Error al cerrar sesión:", error)
        } finally {
            setIsAuthenticated(false)
            setUsuario("")
            setUsuarioId(null)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, usuario, register, usuarioId }}>
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
