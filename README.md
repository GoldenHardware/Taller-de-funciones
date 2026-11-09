# Taller de funciones

Práctica 1 de Desarrollo Web en Entorno Cliente (2º DAW): una página con cinco herramientas hechas con funciones propias de JavaScript.

1. **IVA y descuentos**: aplica un descuento, calcula el IVA y el total en euros.
2. **Conversor de temperaturas**: °C ↔ °F.
3. **Validador de contraseñas**: nivel débil / media / fuerte según longitud, mayúscula, minúscula y número.
4. **Generador de contraseñas**: longitud de 6 a 30, con o sin mayúsculas y números.
5. **Contador de palabras**: palabras, caracteres, palabra más larga y minutos de lectura.

## Archivos

| Archivo | Contenido |
|---|---|
| `index.html` | La página, una sección por herramienta. |
| `estilos.css` | El diseño. |
| `funciones.js` | Solo cálculos: reciben datos y devuelven resultados, no tocan la página. Documentadas con JSDoc. |
| `app.js` | Un manejador por botón: lee los campos, comprueba, calcula y muestra. |
| `pruebas.js` | `probar()` con `console.assert` y 70 pruebas. Botón «Ejecutar pruebas». |
| `notas.md` | Apuntes y respuestas de cada fase. |

## Cómo usarla

Abre `index.html` en el navegador. No necesita servidor ni librerías.

## Publicación

GitHub Pages: Settings → Pages → Branch `main` / root. Enlace: https://goldenhardware.github.io/Taller-de-funciones/
