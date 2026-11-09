# Notas · Taller de funciones

> Las predicciones son orientativas: cámbialas por lo que pensabas tú antes de ejecutar cada línea.

## Fase 1 · Exploración de funciones predefinidas

| Línea | Mi predicción | Resultado | Tipo |
|---|---|---|---|
| `parseInt("42")` | 42 | `42` | number |
| `parseInt("12px")` | NaN | `12` | number |
| `parseInt("px12")` | 12 | `NaN` | number |
| `Number("")` | NaN | `0` | number |
| `isNaN("")` | true | `false` | boolean |
| `Math.round(-2.5)` | -3 | `-2` | number |
| `"oso".replace("o", "0")` | "0s0" | `"0so"` | string |
| `"a,b,c".split(",")` | ["a","b","c"] | `["a", "b", "c"]` | object (array) |
| `0.1 + 0.2` | 0.3 | `0.30000000000000004` | number |
| `(1.005).toFixed(2)` | "1.01" | `"1.00"` | string |

**Sorpresas:** `NaN` es de tipo `number`; `Number("")` da 0; `Math.round` redondea los .5 hacia arriba (hacia +∞), por eso -2.5 → -2; `replace` con texto solo cambia la primera coincidencia; `toFixed` devuelve un **texto** y además redondea mal 1.005.

### Grupos

- **Convertir:** `parseInt`, `Number`, `toFixed`, `String`, `parseFloat`
- **Comprobar:** `isNaN`, `Number.isInteger`, `Number.isFinite`
- **Matemáticas:** `Math.round`, `Math.floor`, `Math.ceil`, `Math.random`
- **Texto:** `replace`, `split`, `toLowerCase`, `toUpperCase`, `trim`

Tres más que conozco: `parseFloat("3.5kg")` → 3.5, `Math.max(3, 9, 1)` → 9, `"  hola ".trim()` → "hola".

### Preguntas

1. **¿Qué da `Number("")`? ¿Por qué es un problema en un formulario?**
   Da `0`. Si el usuario deja un campo vacío, el programa creerá que ha escrito 0 y calculará con ese valor sin avisar (por ejemplo, un producto gratis). Además `isNaN("")` da `false`, así que tampoco lo detecta. Hay que comprobar el vacío aparte.

2. **¿Qué diferencia hay entre `parseInt("12px")` y `parseInt("px12")`?**
   `parseInt` lee desde el principio y se para en el primer carácter que no es número. En `"12px"` lee 12 y se para en la "p". En `"px12"` el primer carácter ya no es un número, así que devuelve `NaN`.

3. **¿Por qué `0.1 + 0.2` no da 0.3? ¿Qué problema crearía en una tienda?**
   Los números se guardan en binario (coma flotante IEEE 754) y 0.1 y 0.2 no tienen representación exacta, así que se arrastra un error minúsculo. En una tienda saldrían totales como 0,30000000000000004 €, comparaciones como `total === 0.3` darían `false` y los redondeos podrían cobrar un céntimo de más o de menos. Por eso hay que redondear siempre los importes (función `redondear`).

## Fase 2 · Funciones de precios

1. **Parámetro y argumento.** En `function calcularIVA(precio, tipo = 21)`, `precio` y `tipo` son **parámetros**: los nombres que usa la función por dentro. En la llamada `calcularIVA(100, 10)`, `100` y `10` son los **argumentos**: los valores reales que se le pasan.

2. **Valor por defecto.** Se usa cuando el argumento no se pasa (llega `undefined`). Por ejemplo `calcularIVA(100)` usa `tipo = 21`, el IVA general, y `redondear(2.567)` usa 2 decimales.

3. **La copia con `console.log`.** Hice:
   ```js
   function calcularIVALog(precio, tipo = 21) { console.log(precio * tipo / 100); }
   function precioConIVALog(precio, tipo = 21) { return precio + calcularIVALog(precio, tipo); }
   precioConIVALog(50, 10); // muestra 5 en consola, pero devuelve NaN
   ```
   Se ve `5` en la consola, pero el resultado es `NaN`. `console.log` solo **muestra** el valor; la función no tiene `return`, así que devuelve `undefined`, y `50 + undefined` es `NaN`. Para que otra función pueda usar un resultado hay que **devolverlo** con `return`.

Las dos versiones de `aplicarDescuento` (normal y flecha) dan lo mismo: `aplicarDescuento(80, 25)` y `aplicarDescuentoFlecha(80, 25)` → 60.

## Fase 3 · Funciones pequeñas

1. **¿Qué funciones usa `evaluarContrasena`? ¿Y `generarContrasena`?**
   `evaluarContrasena` usa `longitudSuficiente`, `tieneMayuscula`, `tieneMinuscula` y `tieneNumero`.
   `generarContrasena` usa `caracterAleatorio`, que a su vez usa `numeroAleatorio` (y la predefinida `Math.random`). También usa `Number.isInteger` para validar la longitud.

2. **¿Cuál fue la más difícil?** `numeroAleatorio`. `Math.random()` da un número entre 0 (incluido) y 1 (sin incluir), así que hay que multiplicar por `max - min + 1` (no por `max - min`) para que el máximo también pueda salir, usar `Math.floor` y sumar `min`. Con `Math.round` los extremos saldrían la mitad de veces que el resto.

## Fase 4 · Interfaz

1. **¿Por qué el precio vacío no puede tratarse como 0?** Porque un campo vacío significa que el usuario se ha olvidado de escribirlo, no que el producto sea gratis. Si lo convertimos con `Number("")` saldría 0 y mostraríamos un total de 0,00 € como si fuera correcto. Con el IVA o el descuento sí hay un valor razonable por defecto (21 y 0), pero con el precio no, así que se muestra un error.

2. **Tres funciones predefinidas usadas:**
   - `Number()` para pasar el texto de los campos a número.
   - `trim()` (dentro de `esNumeroValido`) para detectar campos vacíos o con solo espacios.
   - `Number.isFinite()` para comprobar que el resultado es un número de verdad (descarta `NaN` e `Infinity`).
   - (También `document.getElementById` y `addEventListener` para leer campos y conectar botones.)

## Fase 5 · Pruebas

`probar(descripcion, obtenido, esperado)` compara los valores (las listas con `JSON.stringify`), llama a `console.assert`, que solo escribe en consola cuando la condición es `false`, y guarda cada resultado en un array. El botón «Ejecutar pruebas» muestra cuántas pasan y la lista de las que fallan, y saca la tabla completa con `console.table`. Hay 70 pruebas: casos normales, casos límite (precio 0, texto vacío, longitud 3 y 31, -40 °C) y la del generador repetida 20 veces.

1. **¿Qué fallo introduje y qué prueba lo detectó?** En `celsiusAFahrenheit` cambié el `+ 32` por `- 32`. Fallaron `celsiusAFahrenheit(100) → 212` (daba 148), `límite: -40 °C = -40 °F` y `convertirTemperatura(100, "C", "F") → 212`, porque esta usa la anterior. Lo arreglé y volvieron a pasar las 70.

2. **¿Por qué no sirve una prueba que siempre pasa?** Porque no da información: si pasa tanto cuando el código está bien como cuando está mal, no detecta ningún error. Por eso se rompe el código a propósito, para comprobar que la prueba de verdad falla.

## Fase 6 · Documentación y revisión

Todas las funciones de `funciones.js` tienen comentario JSDoc (`/** ... */`, `@param`, `@returns`). Revisión: nombres descriptivos en español, sin código repetido (los manejadores usan `leer`, `mostrar` y `numeroOpcional`) y la consola sin errores.

**Un error que me encontré:** la primera versión de `redondear` era `Number(numero.toFixed(decimales))`. Las pruebas pasaban con 2.567, pero `redondear(1.005)` daba `1` en vez de `1.01`. Puse un **breakpoint** dentro de la función en la pestaña Sources de las DevTools y miré el valor de `numero * 100` en el panel de variables: era `100.49999999999999`, porque 1.005 no se puede guardar exacto en binario, y por eso redondeaba hacia abajo. Lo arreglé desplazando la coma con notación exponencial: `Number(Math.round(numero + "e" + decimales) + "e-" + decimales)`. `"1.005e2"` se convierte exactamente en 100.5, se redondea a 101 y `"101e-2"` da 1.01.
