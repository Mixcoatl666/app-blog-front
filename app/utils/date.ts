export const formatNotaDate = (
  value: string | Date | null | undefined,
): string => {
  if (!value) return "Fecha no disponible";

  let date: Date;

  if (value instanceof Date) {
    date = value;
  } else if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    const [day, month, year] = value.split("-").map(Number);
    date = new Date(year, month - 1, day);

    // Evita aceptar fechas imposibles, como 31-02-2026.
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return "Fecha no disponible";
    }
  } else {
    date = new Date(value);
  }

  return Number.isNaN(date.getTime())
    ? "Fecha no disponible"
    : date.toLocaleDateString("es-ES");
};
