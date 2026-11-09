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

/* =========================================================
 * Fase 3 · A · Temperaturas
 * ========================================================= */

/**
 * Convierte grados Celsius a Fahrenheit.
 * @param {number} c - Grados Celsius.
 * @returns {number} Grados Fahrenheit.
 */
function celsiusAFahrenheit(c) {
  return (c * 9) / 5 + 32;
}

/**
 * Convierte grados Fahrenheit a Celsius.
 * @param {number} f - Grados Fahrenheit.
 * @returns {number} Grados Celsius.
 */
function fahrenheitACelsius(f) {
  return ((f - 32) * 5) / 9;
}

/**
 * Convierte una temperatura entre "C" y "F".
 * Usa celsiusAFahrenheit y fahrenheitACelsius.
 * @param {number} valor - Temperatura de partida.
 * @param {string} de - Unidad de partida: "C" o "F".
 * @param {string} a - Unidad de destino: "C" o "F".
 * @returns {number} La temperatura convertida (la misma si las unidades coinciden).
 */
function convertirTemperatura(valor, de, a) {
  if (de === a) {
    return valor;
  }
  if (de === "C") {
    return celsiusAFahrenheit(valor);
  }
  return fahrenheitACelsius(valor);
}

/* =========================================================
 * Fase 3 · B · Validador de contraseñas
 * ========================================================= */

/**
 * Comprueba si un texto llega a una longitud mínima.
 * @param {string} texto - Texto a comprobar.
 * @param {number} [minimo=8] - Longitud mínima.
 * @returns {boolean} true si texto.length >= minimo.
 */
function longitudSuficiente(texto, minimo = 8) {
  return texto.length >= minimo;
}

/**
 * Comprueba si un texto tiene alguna letra mayúscula.
 * Si al pasarlo a minúsculas cambia, es que tenía alguna mayúscula.
 * @param {string} texto - Texto a comprobar.
 * @returns {boolean} true si tiene al menos una mayúscula.
 */
function tieneMayuscula(texto) {
  return texto !== texto.toLowerCase();
}

/**
 * Comprueba si un texto tiene alguna letra minúscula.
 * @param {string} texto - Texto a comprobar.
 * @returns {boolean} true si tiene al menos una minúscula.
 */
function tieneMinuscula(texto) {
  return texto !== texto.toUpperCase();
}

/**
 * Comprueba si un texto tiene algún dígito.
 * @param {string} texto - Texto a comprobar.
 * @returns {boolean} true si tiene al menos un número.
 */
function tieneNumero(texto) {
  for (const caracter of texto) {
    if (caracter >= "0" && caracter <= "9") {
      return true;
    }
  }
  return false;
}

/**
 * Evalúa el nivel de una contraseña según 4 requisitos:
 * longitud, mayúscula, minúscula y número.
 * @param {string} texto - Contraseña a evaluar.
 * @returns {string} "fuerte" (4 requisitos), "media" (3) o "débil" (menos).
 */
function evaluarContrasena(texto) {
  const requisitos = [
    longitudSuficiente(texto),
    tieneMayuscula(texto),
    tieneMinuscula(texto),
    tieneNumero(texto),
  ];
  const cumplidos = requisitos.filter(Boolean).length;

  if (cumplidos === 4) return "fuerte";
  if (cumplidos === 3) return "media";
  return "débil";
}

/* =========================================================
 * Fase 3 · C · Generador de contraseñas
 * ========================================================= */

const MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
const MAYUSCULAS = MINUSCULAS.toUpperCase();
const NUMEROS = "0123456789";

/**
 * Devuelve un entero al azar entre min y max, los dos incluidos.
 * @param {number} min - Entero mínimo.
 * @param {number} max - Entero máximo.
 * @returns {number} Un entero entre min y max.
 */
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Devuelve un carácter al azar de un texto. Usa numeroAleatorio.
 * @param {string} conjunto - Texto con los caracteres posibles.
 * @returns {string} Un carácter del conjunto.
 */
function caracterAleatorio(conjunto) {
  return conjunto.charAt(numeroAleatorio(0, conjunto.length - 1));
}

/**
 * Genera una contraseña aleatoria. Siempre usa minúsculas.
 * Usa caracterAleatorio.
 * @param {number} longitud - Entero entre 6 y 30.
 * @param {{mayusculas?: boolean, numeros?: boolean}} [opciones] - Por defecto las dos a true.
 * @returns {string|null} La contraseña, o null si la longitud no es válida.
 */
function generarContrasena(longitud, opciones = {}) {
  if (!Number.isInteger(longitud) || longitud < 6 || longitud > 30) {
    return null;
  }
  const { mayusculas = true, numeros = true } = opciones;

  let conjunto = MINUSCULAS;
  if (mayusculas) conjunto += MAYUSCULAS;
  if (numeros) conjunto += NUMEROS;

  let resultado = "";
  for (let i = 0; i < longitud; i++) {
    resultado += caracterAleatorio(conjunto);
  }
  return resultado;
}

/* =========================================================
 * Fase 3 · D · Contador de palabras
 * ========================================================= */

/**
 * Separa un texto en palabras, ignorando espacios repetidos y saltos de línea.
 * @param {string} texto - Texto de entrada.
 * @returns {string[]} Lista de palabras (vacía si no hay ninguna).
 */
function palabras(texto) {
  return texto.split(/\s+/).filter((p) => p !== "");
}

/**
 * Cuenta las palabras de un texto. Usa palabras.
 * @param {string} texto - Texto de entrada.
 * @returns {number} Número de palabras.
 */
function contarPalabras(texto) {
  return palabras(texto).length;
}

/**
 * Cuenta los caracteres de un texto.
 * @param {string} texto - Texto de entrada.
 * @param {boolean} [conEspacios=true] - Si es false, no cuenta los espacios.
 * @returns {number} Número de caracteres.
 */
function contarCaracteres(texto, conEspacios = true) {
  if (conEspacios) {
    return texto.length;
  }
  return texto.replaceAll(" ", "").length;
}

/**
 * Devuelve la palabra más larga (la primera si hay empate). Usa palabras.
 * @param {string} texto - Texto de entrada.
 * @returns {string} La palabra más larga, o "" si no hay palabras.
 */
function palabraMasLarga(texto) {
  let masLarga = "";
  for (const palabra of palabras(texto)) {
    if (palabra.length > masLarga.length) {
      masLarga = palabra;
    }
  }
  return masLarga;
}

/**
 * Calcula los minutos de lectura, redondeando hacia arriba. Usa contarPalabras.
 * @param {string} texto - Texto de entrada.
 * @param {number} [ppm=200] - Palabras que se leen por minuto.
 * @returns {number} Minutos de lectura.
 */
function minutosLectura(texto, ppm = 200) {
  return Math.ceil(contarPalabras(texto) / ppm);
}

