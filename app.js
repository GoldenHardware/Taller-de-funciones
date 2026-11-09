/* app.js
 * Conecta la página con los cálculos de funciones.js.
 * Cada manejador: 1) lee los campos, 2) comprueba, 3) calcula, 4) muestra.
 */

"use strict";

/**
 * Devuelve el valor de un campo por su id.
 * @param {string} id - id del elemento.
 * @returns {string} Su valor.
 */
function leer(id) {
  return document.getElementById(id).value;
}

/**
 * Escribe un resultado en la página (en verde o como error).
 * @param {string} id - id del elemento donde se muestra.
 * @param {string} mensaje - Texto a mostrar.
 * @param {boolean} [esError=false] - Si es un mensaje de error.
 */
function mostrar(id, mensaje, esError = false) {
  const salida = document.getElementById(id);
  salida.textContent = mensaje;
  salida.classList.toggle("error", esError);
}

/**
 * Lee un campo numérico opcional: si está vacío devuelve el valor por defecto.
 * @param {string} texto - Texto del campo.
 * @param {number} porDefecto - Valor si el campo está vacío.
 * @returns {number|null} El número, o null si no es válido.
 */
function numeroOpcional(texto, porDefecto) {
  if (texto.trim() === "") return porDefecto;
  return esNumeroValido(texto) ? Number(texto) : null;
}

/* ---------- 1 · IVA y descuentos ---------- */
function manejarIVA() {
  const textoPrecio = leer("precio");
  const tipo = numeroOpcional(leer("tipoIVA"), 21);
  const descuento = numeroOpcional(leer("descuento"), 0);

  if (!esNumeroValido(textoPrecio)) {
    mostrar("resultadoIVA", "Escribe un precio válido (no puede estar vacío).", true);
    return;
  }
  const precio = Number(textoPrecio);
  if (precio < 0) {
    mostrar("resultadoIVA", "El precio no puede ser negativo.", true);
    return;
  }
  if (tipo === null || tipo < 0) {
    mostrar("resultadoIVA", "El IVA tiene que ser un número (vacío = 21).", true);
    return;
  }
  if (descuento === null || descuento < 0 || descuento > 100) {
    mostrar("resultadoIVA", "El descuento tiene que estar entre 0 y 100 (vacío = 0).", true);
    return;
  }

  const conDescuento = aplicarDescuento(precio, descuento);
  const iva = calcularIVA(conDescuento, tipo);
  const total = precioConIVA(conDescuento, tipo);

  mostrar(
    "resultadoIVA",
    `Con descuento: ${formatearEuros(conDescuento)} · IVA (${tipo} %): ${formatearEuros(iva)} · Total: ${formatearEuros(total)}`
  );
}

/* ---------- 2 · Temperaturas ---------- */
function manejarTemperatura() {
  const texto = leer("temperatura");
  const de = leer("unidadDe");
  const a = leer("unidadA");

  if (!esNumeroValido(texto)) {
    mostrar("resultadoTemperatura", "Escribe una temperatura válida.", true);
    return;
  }
  const resultado = convertirTemperatura(Number(texto), de, a);
  mostrar("resultadoTemperatura", `${texto} °${de} = ${redondear(resultado, 2)} °${a}`);
}

/* ---------- 3 · Validador de contraseñas ---------- */
function manejarValidador() {
  const texto = leer("contrasena");
  if (texto === "") {
    mostrar("resultadoValidador", "Escribe una contraseña.", true);
    return;
  }
  const marca = (ok) => (ok ? "✔" : "✘");
  mostrar(
    "resultadoValidador",
    `Nivel: ${evaluarContrasena(texto)} · ` +
      `${marca(longitudSuficiente(texto))} 8+ caracteres ` +
      `${marca(tieneMayuscula(texto))} mayúscula ` +
      `${marca(tieneMinuscula(texto))} minúscula ` +
      `${marca(tieneNumero(texto))} número`
  );
}

/* ---------- 4 · Generador de contraseñas ---------- */
function manejarGenerador() {
  const texto = leer("longitud");
  if (!esNumeroValido(texto)) {
    mostrar("resultadoGenerador", "Escribe una longitud válida.", true);
    return;
  }
  const opciones = {
    mayusculas: document.getElementById("usarMayusculas").checked,
    numeros: document.getElementById("usarNumeros").checked,
  };
  const contrasena = generarContrasena(Number(texto), opciones);
  if (contrasena === null) {
    mostrar("resultadoGenerador", "La longitud tiene que ser un entero entre 6 y 30.", true);
    return;
  }
  mostrar("resultadoGenerador", contrasena);
}

/* ---------- 5 · Contador de palabras ---------- */
function manejarContador() {
  const texto = leer("textoContar");
  const ppm = numeroOpcional(leer("ppm"), 200);
  if (ppm === null || ppm <= 0) {
    mostrar("resultadoContador", "Las palabras por minuto tienen que ser un número mayor que 0.", true);
    return;
  }
  mostrar(
    "resultadoContador",
    `Palabras: ${contarPalabras(texto)} · ` +
      `Caracteres: ${contarCaracteres(texto)} (sin espacios: ${contarCaracteres(texto, false)}) · ` +
      `Más larga: "${palabraMasLarga(texto)}" · ` +
      `Lectura: ${minutosLectura(texto, ppm)} min`
  );
}

/* ---------- Conectar botones ---------- */
document.getElementById("btnIVA").addEventListener("click", manejarIVA);
document.getElementById("btnTemperatura").addEventListener("click", manejarTemperatura);
document.getElementById("btnValidador").addEventListener("click", manejarValidador);
document.getElementById("btnGenerador").addEventListener("click", manejarGenerador);
document.getElementById("btnContador").addEventListener("click", manejarContador);
