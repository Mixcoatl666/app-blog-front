export interface Nota {
  idnota:number;
  titulo:string;
  descripcion:string;
  imagen_url: string;
  autor: string;
  create_at: Date;
  is_favorite: boolean;
  user_id: number | null
}

export interface CardProps {
    id: number;
    deleteNota: (id: number) => Promise<void>
}

export interface NotaContextType {
  notas: Nota[]
  filteredNotas: Nota[]
  setFilteredNotas: React.Dispatch<React.SetStateAction<Nota[]>>
  fetchNotaById: (id: number) => Promise<Nota | null>
  toggleFavorito: (id: number) => void
  loading: boolean
  createNota: (newNota: Partial<Nota>) => Promise<{ success: boolean, message:string }>
  deleteNota: (id: number) => Promise<void>
  fetchNotas: () => Promise<void>
  fetchFavoritos: () => Promise<void>
}
