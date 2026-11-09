/* pruebas.js
 * Pruebas automáticas de funciones.js.
 */

"use strict";

/** Resultados de la última ejecución. */
let resultados = [];

/**
 * Compara dos valores. Para listas y objetos compara su JSON.
 * @param {*} a - Primer valor.
 * @param {*} b - Segundo valor.
 * @returns {boolean} true si son iguales.
 */
function sonIguales(a, b) {
  if (typeof a === "object" || typeof b === "object") {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

/**
 * Ejecuta una prueba y guarda su resultado.
 * console.assert solo escribe en consola si la condición es false.
 * @param {string} descripcion - Qué se prueba.
 * @param {*} obtenido - Lo que devuelve la función.
 * @param {*} esperado - Lo que debería devolver.
 * @returns {boolean} true si la prueba pasa.
 */
function probar(descripcion, obtenido, esperado) {
  const pasa = sonIguales(obtenido, esperado);
  console.assert(pasa, `FALLA: ${descripcion}`, { obtenido, esperado });
  resultados.push({ descripcion, obtenido, esperado, pasa });
  return pasa;
}

/**
 * Lanza todas las pruebas.
 * @returns {Array<object>} La lista de resultados.
 */
function ejecutarPruebas() {
  resultados = [];

  // IVA y descuentos
  probar("calcularIVA(100) → 21", calcularIVA(100), 21);
  probar("calcularIVA(100, 10) → 10", calcularIVA(100, 10), 10);
  probar("precioConIVA(50, 10) → 55", precioConIVA(50, 10), 55);
  probar("límite: precioConIVA(0) → 0", precioConIVA(0), 0);
  probar("aplicarDescuento(80, 25) → 60", aplicarDescuento(80, 25), 60);
  probar("límite: aplicarDescuento(80, 0) → 80", aplicarDescuento(80, 0), 80);
  probar("normal y flecha dan lo mismo", aplicarDescuentoFlecha(80, 25), aplicarDescuento(80, 25));
  probar("redondear(2.567) → 2.57", redondear(2.567), 2.57);
  probar("redondear(2.5, 0) → 3", redondear(2.5, 0), 3);
  probar("límite: redondear(1.005) → 1.01", redondear(1.005), 1.01);
  probar('formatearEuros(1234.5) → "1234,50 €"', formatearEuros(1234.5), "1234,50 €");
  probar('límite: formatearEuros(0) → "0,00 €"', formatearEuros(0), "0,00 €");

  // Temperaturas
  probar("celsiusAFahrenheit(100) → 212", celsiusAFahrenheit(100), 212);
  probar("fahrenheitACelsius(32) → 0", fahrenheitACelsius(32), 0);
  probar("límite: -40 °C = -40 °F", celsiusAFahrenheit(-40), -40);
  probar('convertirTemperatura(100, "C", "F") → 212', convertirTemperatura(100, "C", "F"), 212);
  probar('convertirTemperatura(212, "F", "C") → 100', convertirTemperatura(212, "F", "C"), 100);
  probar('límite: convertirTemperatura(25, "C", "C") → 25', convertirTemperatura(25, "C", "C"), 25);

  // Validador
  probar('longitudSuficiente("1234567") → false', longitudSuficiente("1234567"), false);
  probar('límite: longitudSuficiente("12345678") → true', longitudSuficiente("12345678"), true);
  probar('tieneMayuscula("aBc") → true', tieneMayuscula("aBc"), true);
  probar('tieneMayuscula("abc") → false', tieneMayuscula("abc"), false);
  probar('tieneMinuscula("aBC") → true', tieneMinuscula("aBC"), true);
  probar('tieneMinuscula("ABC") → false', tieneMinuscula("ABC"), false);
  probar('tieneNumero("abc1") → true', tieneNumero("abc1"), true);
  probar('tieneNumero("abc") → false', tieneNumero("abc"), false);
  probar('evaluarContrasena("Abcdefg1") → "fuerte"', evaluarContrasena("Abcdefg1"), "fuerte");
  probar('evaluarContrasena("Abcdefgh") → "media"', evaluarContrasena("Abcdefgh"), "media");
  probar('evaluarContrasena("abc") → "débil"', evaluarContrasena("abc"), "débil");
  probar('límite: evaluarContrasena("") → "débil"', evaluarContrasena(""), "débil");

  // Generador
  probar("caracterAleatorio(\"x\") → \"x\"", caracterAleatorio("x"), "x");
  probar("límite: generarContrasena(3) → null", generarContrasena(3), null);
  probar("límite: generarContrasena(31) → null", generarContrasena(31), null);
  probar("límite: generarContrasena(6.5) → null", generarContrasena(6.5), null);
  probar(
    "sin mayúsculas ni números: solo minúsculas",
    /^[a-z]+$/.test(generarContrasena(20, { mayusculas: false, numeros: false })),
    true
  );
  let dadoCorrecto = true;
  for (let i = 0; i < 100; i++) {
    const n = numeroAleatorio(1, 6);
    if (!Number.isInteger(n) || n < 1 || n > 6) dadoCorrecto = false;
  }
  probar("numeroAleatorio(1, 6) siempre entre 1 y 6 (100 veces)", dadoCorrecto, true);
  for (let i = 1; i <= 20; i++) {
    probar(`generarContrasena(12) tiene 12 caracteres (vez ${i}/20)`, generarContrasena(12).length, 12);
  }

  // Contador
  probar('palabras("hola   mundo") → ["hola","mundo"]', palabras("hola      mundo"), ["hola", "mundo"]);
  probar("límite: palabras con saltos de línea", palabras("  uno\n\ndos  "), ["uno", "dos"]);
  probar('contarPalabras("hola   mundo") → 2', contarPalabras("hola      mundo"), 2);
  probar('límite: contarPalabras("") → 0', contarPalabras(""), 0);
  probar('contarCaracteres("a b c") → 5', contarCaracteres("a b c"), 5);
  probar('contarCaracteres("a b c", false) → 3', contarCaracteres("a b c", false), 3);
  probar('palabraMasLarga("El perro rápido") → "rápido"', palabraMasLarga("El perro rápido"), "rápido");
  probar('límite: palabraMasLarga("") → ""', palabraMasLarga(""), "");
  probar('minutosLectura("hola") → 1', minutosLectura("hola"), 1);
  probar('límite: minutosLectura("") → 0', minutosLectura(""), 0);

  // Validación de entradas
  probar('esNumeroValido("12") → true', esNumeroValido("12"), true);
  probar('límite: esNumeroValido("") → false', esNumeroValido(""), false);
  probar('esNumeroValido("12px") → false', esNumeroValido("12px"), false);
  probar('límite: esNumeroValido("   ") → false', esNumeroValido("   "), false);

  return resultados;
}

/** Muestra el resumen de las pruebas en la página. */
function manejarPruebas() {
  const lista = ejecutarPruebas();
  const pasan = lista.filter((r) => r.pasa).length;
  const fallan = lista.filter((r) => !r.pasa);

  const resumen = document.getElementById("resumenPruebas");
  resumen.textContent = `Pasan ${pasan} de ${lista.length}.`;
  resumen.classList.toggle("error", fallan.length > 0);

  const ul = document.getElementById("listaFallos");
  ul.innerHTML = "";
  for (const fallo of fallan) {
    const li = document.createElement("li");
    li.textContent = `${fallo.descripcion} · obtenido: ${JSON.stringify(fallo.obtenido)} · esperado: ${JSON.stringify(fallo.esperado)}`;
    ul.appendChild(li);
  }
  console.table(lista);
}

if (typeof document !== "undefined") {
  document.getElementById("btnPruebas").addEventListener("click", manejarPruebas);
}
