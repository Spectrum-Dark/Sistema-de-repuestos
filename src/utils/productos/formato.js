// Formatea un número como moneda en Córdobas Nicaragüenses (ej. C$ 1,250.00).
// Utiliza un valor por defecto (0) en caso de que 'valor' sea null o undefined (Nullish Coalescing Operator ??).
// 'toLocaleString' con formato 'en-US' asegura la separación de miles con coma y dos decimales fijos.
export const formatearPrecio = (valor) =>
  `C$ ${Number(valor ?? 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const formatearEtiquetaProducto = (
  producto,
  compatibilidades = [],
  modelos = [],
  marcas = []
) => {
  const idsModelos = compatibilidades
    .filter(
      (compatibilidad) =>
        String(compatibilidad.id_producto) === String(producto.id_producto)
    )
    .map((compatibilidad) => String(compatibilidad.id_modelo));
  const marcasPorId = Object.fromEntries(
    marcas.map((marca) => [String(marca.id_marca), marca.nombre_marca])
  );
  const compatibles = modelos
    .filter((modelo) => idsModelos.includes(String(modelo.id_modelo)))
    .map((modelo) =>
      [marcasPorId[String(modelo.id_marca)], modelo.nombre_modelo]
        .filter(Boolean)
        .join(' ')
    );
  const nombreBase = `${producto.codigo_producto} - ${producto.nombre_producto}`;
  const nombresCompatibles = [...new Set(compatibles)];

  return nombresCompatibles.length
    ? `${nombreBase} - ${nombresCompatibles.join(', ')}`
    : nombreBase;
};

/**
 * Determina si un producto ha alcanzado el umbral de stock bajo.
 * Regla de negocio:
 * 1. La 'existencia_minima' debe ser un valor configurado (mayor a 0).
 * 2. La 'existencia' actual debe ser menor o igual a ese mínimo configurado.
 *
 * Se fuerza la conversión explícita a tipo Number en cada campo para evitar
 * errores de comparación causados por valores tipo string (provenientes de la BD o inputs).
 */
export const tieneStockBajo = (producto) =>
  Number(producto.existencia_minima) > 0 &&
  Number(producto.existencia) <= Number(producto.existencia_minima);
