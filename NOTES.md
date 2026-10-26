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

## HU-J5 — Ver letras intentadas

> Como jugador quiero ver las letras que ya intenté, para no repetirlas.

| Criterio                                           | Escenario (AT)                    | Unit Tests                          | Estado |
| -------------------------------------------------- | --------------------------------- | ----------------------------------- | ------ |
| CA-1 — al empezar no hay letras intentadas         | `ver-letras-intentadas.feature`   | al empezar no hay letras intentadas | verde  |
| CA-2 — solo se ven las letras incorrectas          | `ver-letras-intentadas.feature`   | GATO con A y X solo tiene incorrecta la X | verde  |
| CA-3 — una letra incorrecta repetida no se ve dos veces | `ver-letras-intentadas.feature` | GATO con X dos veces tiene incorrecta una sola X | verde  |

**Cambio de criterio (CA-2):** la primera versión mostraba todas las letras
intentadas, acertadas y erradas (de `RED: AT HU-J5 se ven las letras intentadas`
a `GREEN: AT HU-J5 se ven las letras intentadas`). Al probar el juego vimos que
las acertadas ya aparecen en la palabra (`_ A _ _`), así que listarlas de nuevo
no ayuda al jugador. Decidimos mostrar solo las incorrectas, como en el ahorcado
clásico, y rehicimos el ciclo de CA-2 desde un RED AT
(`RED: AT HU-J5 se ven solo las letras incorrectas`).

**Nota sobre CA-2 (un solo UT):** el GREEN de "GATO con A y X" guarda cada
letra errada, que ya es la solución general. Un segundo UT para triangular
pasaría sin ponerse en rojo, así que no lo agregamos.

**Nota sobre CA-3:** lo agregamos junto con el cambio de CA-2, para que la
lista de letras incorrectas no muestre la misma letra dos veces. CA-3 solo
cubre lo que se ve: repetir una letra incorrecta todavía resta un intento.
Esa regla toca HU-J3 (intentos) y queda pendiente para otra historia.

## HU-J7 — Ganar la partida

> Como jugador quiero completar la palabra para ver que gané.

| Criterio                                      | Escenario (AT)     | Unit Tests                         | Estado |
| --------------------------------------------- | ------------------ | ---------------------------------- | ------ |
| CA-1 — al revelar todas las letras se ve GANASTE | `ganar.feature` | completar GATO; completar ALA      | verde  |

## HU-J8 — Perder la partida

> Como jugador quiero agotar los intentos para saber que perdí.

| Criterio                                      | Escenario (AT)     | Unit Tests                         | Estado |
| --------------------------------------------- | ------------------ | ---------------------------------- | ------ |
| CA-1 — al sexto fallo se ve PERDISTE          | `perder.feature`   | el sexto fallo pierde              | verde  |
| CA-2 — al perder se ve la palabra             | `perder.feature`   | al perder la palabra queda revelada; al perder PERRO queda revelada | verde  |

## HU-J4 — Ver el dibujo

> Como jugador quiero ver el dibujo del ahorcado para saber cuánto me falta perder.

| Criterio                                      | Escenario (AT)     | Unit Tests                         | Estado |
| --------------------------------------------- | ------------------ | ---------------------------------- | ------ |
| CA-1 — al primer fallo se ve cabeza           | `dibujo.feature`   | con 1 fallo esta la cabeza; PERRO con 1 fallo esta la cabeza | verde  |
| CA-2 — al sexto fallo se ve el dibujo completo | `dibujo.feature`  | con 6 fallos estan las 6 partes en orden; PERRO con 6 fallos estan las 6 partes en orden | verde  |

## HU-J6 — Repetir una letra incorrecta

> Como jugador quiero que una letra incorrecta ya usada no cuente de nuevo, para no perder un intento al repetirla.

| Criterio                                      | Escenario (AT)            | Unit Tests                         | Estado |
| --------------------------------------------- | ------------------------- | ---------------------------------- | ------ |
| CA-1 — repetir una incorrecta no resta        | `repetir-letra.feature`   | repetir X en GATO deja 5 intentos  | verde  |

---