export interface Nota {
  idnota:number;
  titulo:string;
  descripcion:string;
  imagen_url: string;
  autor: string;
  create_at: Date;
  is_favorite: boolean;
}

export interface CardProps {
    id: number;
}

export interface NotaContextType {
  notas: Nota[]
  filteredNotas: Nota[]
  setFilteredNotas: React.Dispatch<React.SetStateAction<Nota[]>>
  fetchNotaById: (id: number) => Promise<Nota | null>
  toggleFavorito: (id: number) => void
  loading: boolean
  createNota: (newNota: Partial<Nota>) => Promise<{ success: boolean, message:string }>
}