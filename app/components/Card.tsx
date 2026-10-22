"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

import { useAuth } from "../context/AuthProvider";
import { useNotaContext } from "../context/NotaProvider";

import { CardProps } from "../types/nota";
import { formatNotaDate } from "../utils/date";

const Card: React.FC<CardProps> = ({ id, deleteNota }) => {
  const { isAuthenticated, usuarioId } = useAuth();
  const { notas, toggleFavorito } = useNotaContext();
  const nota = notas.find((n) => n.idnota === Number(id));

  if (!nota) {
    return null;
  }

  const isDuenio = usuarioId === nota.user_id;

  const confirmDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estas seguro?",
      text: "El cambio es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
    });

    if (!result.isConfirmed) return;

    await deleteNota(nota.idnota);
    await Swal.fire({
      title: "Eliminado",
      text: "La nota fue eliminada",
      icon: "success",
    });
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60">
      {isAuthenticated && (
        <>
          {isDuenio && (
            <div className="absolute right-3 top-3 z-10 flex gap-2">
              <button
                type="button"
                onClick={() => toggleFavorito(Number(id))}
                aria-label={
                  nota.is_favorite
                    ? "Quitar de favoritos"
                    : "Añadir a favoritos"
                }
                aria-pressed={nota.is_favorite}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <HeartIcon
                  className={`h-5 w-5 transition-colors ${nota.is_favorite ? "fill-red-500 stroke-red-500" : "fill-none stroke-slate-500 hover:stroke-red-400"}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </>
      )}

      {nota.imagen_url && (
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <Image
            src={nota.imagen_url}
            alt={nota.titulo}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            unoptimized
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <header>
          <h2 className="mb-2 line-clamp-2 text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-indigo-600">
            {nota.titulo}
          </h2>
          <p className="line-clamp-3 text-sm leading-6 text-slate-600">
            {nota.descripcion.length > 100
              ? `${nota.descripcion.slice(0, 100)}...`
              : nota.descripcion}
          </p>
        </header>

        <footer className="mt-auto pt-5">
          <div className="mb-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold uppercase text-indigo-700">
              {nota.autor?.charAt(0)}
            </span>
            <span className="truncate font-medium text-slate-700">
              {nota.autor}
            </span>
            <span aria-hidden="true">·</span>
            <time className="whitespace-nowrap">
              {formatNotaDate(nota.create_at)}
            </time>
          </div>
          <div className="flex items-center justify-between gap-3">
            {isAuthenticated && (
              <>
                {isDuenio && (
                  <button
                    type="button"
                    onClick={() => void confirmDelete()}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold bg-red-100 text-red-700 transition-colors hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <TrashIcon className="h-4 w-4" aria-hidden="true" />
                    Eliminar
                  </button>
                )}
              </>
            )}
            <Link
              href={`page/nota/${nota.idnota}`}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Leer más
              <ArrowRightIcon
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default Card;
