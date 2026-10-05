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
    id: string;
    titulo: string;
    descripcion: string;
    imagen_url: string;
    autor: string;
    create_at: Date;
    is_favorite: boolean;
    toggleFavorito: (id: number) => void;
}