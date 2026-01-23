// src/lib/api-utils.ts

import type { FetchDataParams, FilterConfig } from "@/hooks/useServerTable"; // Asegúrate de exportar estos tipos desde tu hook

/**
 * Construye un objeto URLSearchParams a partir del estado de la tabla (paginación, filtros, ordenación).
 * Esta función actúa como un "traductor" entre el estado de TanStack Table y lo que tu API espera.
 *
 * @param params - El objeto que contiene la paginación, filtros y ordenación
 * @param filterConfigs - La configuración que mapea los IDs de columna a los nombres de los parámetros de la API.
 * @returns Un objeto URLSearchParams listo para ser añadido a la URL de tu API.
 */
export function buildApiParams(
  params: FetchDataParams,
  filterConfigs: FilterConfig[] = [],
): URLSearchParams {
  const searchParams = new URLSearchParams();

  // 1. Manejar Paginación
  // La mayoría de las APIs esperan una página 1-based, mientras que pageIndex es 0-based.
  searchParams.append("page", String(params.pagination.pageIndex + 1));
  // Puedes cambiar 'limit' por 'pageSize' o lo que tu API requiera.
  searchParams.append("pageSize", String(params.pagination.pageSize));

  // 2. Manejar Ordenación
  if (params.sorting.length > 0) {
    const sortItem = params.sorting[0];
    // Puedes cambiar 'sortBy' y 'sortOrder' por lo que tu API requiera (ej: '_sort', '_order').
    searchParams.append("sortBy", sortItem.id);
    searchParams.append("sortOrder", sortItem.desc ? "desc" : "asc");
  }

  // 3. Manejar Filtros
  for (const filter of params.filters) {
    // Encuentra la configuración para el filtro actual para obtener el nombre del parámetro correcto.
    const config = filterConfigs.find((c) => c.columnId === filter.id);

    if (config && filter.value) {
      // Formatea el valor. Si es un array (de un filtro de facetas), únelo con comas.
      const paramValue = Array.isArray(filter.value)
        ? filter.value.join(",")
        : String(filter.value);

      // Solo añade el parámetro si el valor no está vacío.
      if (paramValue) {
        searchParams.append(config.param, paramValue);
      }
    }
  }

  return searchParams;
}
