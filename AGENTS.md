# Instrucciones del repositorio

## Estructura del proyecto

- Es una aplicación única de Next.js 16.3.6 con App Router; el código de la aplicación está en `app/`.
- `app/layout.tsx` proporciona `AuthProvider` y `NotaProvider`; comprueba el alcance de los providers antes de añadir otro en una página.
- Los flujos principales son la lista de notas en `app/page.tsx`, el login en `app/page/login` y el detalle de una nota en `app/page/nota/[id]`.
- `NotaProvider` gestiona la obtención, creación, eliminación, favoritos, filtrado y llamadas a la API de notas.
- El frontend llama directamente a un backend independiente en `http://localhost:5001`; las peticiones que requieren autenticación usan cookies y necesitan que el backend y CORS estén disponibles.
- Las fechas de la API pueden llegar como `DD-MM-YYYY`; usa `app/utils/date.ts` en lugar de pasar esas cadenas directamente a `new Date()`.

## Comandos

- Usa pnpm (`packageManager` es `pnpm@11.25.0`): `pnpm install`, `pnpm dev`, `pnpm lint`, `pnpm build` y `pnpm start`.
- No hay un script ni una suite de tests configurada. Para comprobar los tipos, ejecuta `pnpm exec tsc --noEmit`.
- Tailwind CSS está conectado mediante `postcss.config.mjs` y `@tailwindcss/postcss`; no busques un archivo de configuración independiente de Tailwind.

## Convenciones y restricciones

- No escribas código a menos que el usuario lo solicite explícitamente.
- Al modificar código, sigue las skills `ponytail` y `clean-code` del repositorio y conserva la estructura existente de componentes y providers.
- Usa `@heroicons/react` para los iconos de la interfaz en lugar de SVG inline escritos manualmente o caracteres usados como iconos.
- `.next/`, `out/`, los artefactos de build, `node_modules/`, los archivos de entorno y `.agents/` están ignorados o son generados; no edites los artefactos generados como código fuente.
