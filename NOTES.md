# NOTES — Ahorcado (Grupo 10)

## Trazabilidad Historia → AT → UT

Mecanismo elegido: etiquetas de Gherkin (`@HU-XX` sobre la Característica,
`@CA-X` sobre el escenario) + una Característica por historia + referencia
a la historia en los mensajes de commit.

Story Map: https://miro.com/app/board/uXjVHsffG1k=/

---

## HU-RI1 — Ingresar nombre

> Como jugador quiero ingresar mi nombre para poder jugar.

Regla de validez: solo letras (con acentos y ñ), espacios y guiones.

| Criterio                                           | Escenario (AT)            | Unit Tests   | Estado              |
| -------------------------------------------------- | ------------------------- | ------------ | ------------------- |
| CA-1 — nombre vacío → aviso, no avanza             | fuera de este corte       | —            | fuera de este corte |
| CA-2 — caracteres no permitidos → aviso, no avanza | fuera de este corte       | —            | fuera de este corte |
| CA-3 — nombre válido → ve su nombre en pantalla    | `ingresar-nombre.feature` | — (ver nota) | verde               |
| CA-4 — al confirmar empieza la partida y la URL no muestra la palabra | `ingresar-nombre.feature` | — | verde               |

**Nota sobre CA-3 (sin unit tests):** decidimos seguir el camino "bancar el AT
rojo" (Guía §2.1). CA-3 no tiene lógica de negocio: la UI toma el valor del
input y lo muestra. El objeto de dominio aparece en CA-2, donde hay que decidir
si un nombre es válido — ahí sí hay una regla unit-testeable sin navegador.

## HU-J1 — Ver palabra oculta

> Como jugador quiero ver la palabra con guiones por cada letra, para saber qué tan larga es.

| Criterio                                      | Escenario (AT)                 | Unit Tests                                      | Estado |
| --------------------------------------------- | ------------------------------ | ----------------------------------------------- | ------ |
| CA-1 — GATO se ve _ _ _ _ , PERRO se ve _ _ _ _ _ | `ver-palabra-oculta.feature` | enmascara GATO; enmascara PERRO | verde |

## HU-J2 — Ingresar una letra

> Como jugador quiero ingresar la primera letra para descubrir la palabra.

| Criterio                                           | Escenario (AT)             | Unit Tests                   | Estado |
| -------------------------------------------------- | -------------------------- | ---------------------------- | ------ |
| CA-1 — Letra en palabra → se revela                | `ingresar-letra.feature`   | revela A en GATO, R en PERRO | verde  |
| CA-2 — Letra ausente → máscara queda igual         | `ingresar-letra.feature`   | X en GATO deja _ _ _ _       | verde  |

## HU-J3 — Ver intentos restantes

> Como jugador quiero ver cuántos intentos me quedan, para decidir mi estrategia.

| Criterio                                           | Escenario (AT)             | Unit Tests                   | Estado |
| -------------------------------------------------- | -------------------------- | ---------------------------- | ------ |
| CA-1 — Inicio de partida → 6 intentos              | `ver-intentos.feature`     | comienza con 6 intentos      | verde  |
| CA-2 — Letra incorrecta → resta un intento         | `ver-intentos.feature`     | resta si es incorrecta       | verde  |
| CA-3 — Letra correcta → no resta intentos          | `ver-intentos.feature`     | no resta si es correcta      | verde  |


---