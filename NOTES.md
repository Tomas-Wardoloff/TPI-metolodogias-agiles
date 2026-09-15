# NOTES — Ahorcado (Grupo 10)

## Trazabilidad Historia → AT → UT

Mecanismo elegido: etiquetas de Gherkin (`@HU-XX` sobre la Característica,
`@CA-X` sobre el escenario) + una Característica por historia + referencia
a la historia en los mensajes de commit.

Story Map: https://miro.com/app/board/uXjVHsffG1k=/

---

## HU-IN1 — Ingresar nombre

> Como jugador quiero ingresar mi nombre para poder jugar.

Regla de validez: solo letras (con acentos y ñ), espacios y guiones.

| Criterio                                           | Escenario (AT)            | Unit Tests   | Estado |
| -------------------------------------------------- | ------------------------- | ------------ | ------ |
| CA-1 — nombre vacío → aviso, no avanza             | pendiente                 | pendiente    | 🔴     |
| CA-2 — caracteres no permitidos → aviso, no avanza | pendiente                 | pendiente    | 🔴     |
| CA-3 — nombre válido → ve su nombre en pantalla    | `ingresar-nombre.feature` | — (ver nota) | 🔴     |

**Nota sobre CA-3 (sin unit tests):** decidimos seguir el camino "bancar el AT
rojo" (Guía §2.1). CA-3 no tiene lógica de negocio: la UI toma el valor del
input y lo muestra. El objeto de dominio aparece en CA-2, donde hay que decidir
si un nombre es válido — ahí sí hay una regla unit-testeable sin navegador.
