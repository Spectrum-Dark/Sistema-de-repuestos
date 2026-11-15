/**
 * Función auxiliar para evitar problemas de precisión con decimales flotantes en JavaScript.
 * Utiliza Number.EPSILON para asegurar un redondeo matemático preciso a dos decimales.
 */
const redondear = (numero) => Math.round((numero + Number.EPSILON) * 100) / 100;

/**
 * Calcula el subtotal de una línea de detalle (cantidad por precio unitario),
 * asegurando que los valores se traten como números y aplicando el redondeo.
 */
export const subtotalDetalle = (cantidad, precio) =>
  redondear(Number(cantidad) * Number(precio));

/**
 * Calcula los totales generales a partir de un conjunto de filas (detalles de factura/pedido).
 */
export function calcularTotales(filas) {
  // Suma los subtotales de cada fila usando reduce y aplica el redondeo global.
  const subtotal = redondear(
    filas.reduce(
      (suma, f) => suma + subtotalDetalle(f.cantidad, f.precio_unitario),
      0
    )
  );

  // Las compras no aplican IVA: el total corresponde al subtotal.
  return { subtotal, impuesto: 0, total: subtotal };
}
