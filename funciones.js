/* funciones.js
 * Solo cálculos: estas funciones no tocan la página.
 * Reciben datos y devuelven resultados.
 */

"use strict";

/* =========================================================
 * Fase 2 · Precios, IVA y descuentos
 * ========================================================= */

/**
 * Calcula cuánto IVA hay que pagar por un precio.
 * @param {number} precio - Precio sin IVA.
 * @param {number} [tipo=21] - Porcentaje de IVA.
 * @returns {number} El importe del IVA.
 */
function calcularIVA(precio, tipo = 21) {
  return (precio * tipo) / 100;
}

/**
 * Calcula el precio final sumando el IVA. Usa calcularIVA.
 * @param {number} precio - Precio sin IVA.
 * @param {number} [tipo=21] - Porcentaje de IVA.
 * @returns {number} El precio con el IVA incluido.
 */
function precioConIVA(precio, tipo = 21) {
  return precio + calcularIVA(precio, tipo);
}

/**
 * Aplica un descuento en porcentaje a un precio.
 * @param {number} precio - Precio original.
 * @param {number} porcentaje - Porcentaje de descuento (0 a 100).
 * @returns {number} El precio después del descuento.
 */
function aplicarDescuento(precio, porcentaje) {
  return precio - (precio * porcentaje) / 100;
}

/**
 * Lo mismo que aplicarDescuento, escrita como función flecha.
 * @param {number} precio - Precio original.
 * @param {number} porcentaje - Porcentaje de descuento.
 * @returns {number} El precio después del descuento.
 */
const aplicarDescuentoFlecha = (precio, porcentaje) =>
  precio - (precio * porcentaje) / 100;

/**
 * Redondea un número a los decimales indicados.
 * Usa notación exponencial ("1.005e2") para evitar el fallo de
 * toFixed y de 1.005 * 100 = 100.49999999999999.
 * @param {number} numero - Número a redondear.
 * @param {number} [decimales=2] - Cantidad de decimales.
 * @returns {number} El número redondeado.
 */
function redondear(numero, decimales = 2) {
  return Number(Math.round(numero + "e" + decimales) + "e-" + decimales);
}

/**
 * Da formato de euros a un número: dos decimales, coma decimal y "€".
 * @param {number} numero - Cantidad a formatear.
 * @returns {string} Texto del tipo "1234,50 €".
 */
function formatearEuros(numero) {
  return redondear(numero, 2).toFixed(2).replace(".", ",") + " €";
}

