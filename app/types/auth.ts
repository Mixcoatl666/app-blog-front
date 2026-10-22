export interface AuthContextType {
    isAuthenticated: boolean
    loading: boolean
    login: () => Promise<void>
    logout: () => Promise<void>
    usuario: string
    usuarioId: number | null
    register: (usuario:string, correo:string, password:string) => Promise<{'success':boolean, 'message':string}>
}
