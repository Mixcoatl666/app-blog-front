# Blog de Notas

![Estado](https://img.shields.io/badge/estado-terminado%20%7C%20archivado-lightgrey)
![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react)
![Flask](https://img.shields.io/badge/API-Flask-black?logo=flask)
![PostgreSQL](https://img.shields.io/badge/Base%20de%20datos-PostgreSQL-4169E1?logo=postgresql)

> **Proyecto terminado y archivado.** Se creó como ejercicio de aprendizaje de Next.js, Flask y PostgreSQL. No se planean nuevas funciones ni desarrollo activo.

Aplicación web para publicar y consultar notas. El frontend está hecho con Next.js y consume una API Flask independiente, que persiste los datos en PostgreSQL.

## Funcionalidades

- Registro e inicio/cierre de sesión con cookies de sesión.
- Listado, búsqueda y detalle de notas.
- Creación y eliminación de notas propias.
- Filtro de notas favoritas y estado visual del favorito.
- Diseño adaptable con Tailwind CSS.

## Tecnologías

- Next.js `16.3.6` y React `19.2.8`
- TypeScript y Tailwind CSS `4`
- Flask API y PostgreSQL (backend independiente)
- Heroicons y SweetAlert2

## Ejecución local

Necesitas Node.js y pnpm. La API Flask debe estar configurada y ejecutándose en `http://localhost:5001`; consulta el README del repositorio del backend para configurar Python, PostgreSQL y sus variables de entorno.

```bash
pnpm install
pnpm dev
```

Abre <http://localhost:3000>.

## Verificación

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

No hay una suite de pruebas automatizadas configurada.

## Rutas principales

- `/` — lista de notas.
- `/page/login` — inicio de sesión.
- `/page/register` — registro.
- `/page/nota/[id]` — detalle de una nota.

La URL de la API está definida actualmente en el frontend como `http://localhost:5001`. Las peticiones de sesión dependen de cookies y de que Flask permita credenciales por CORS.
