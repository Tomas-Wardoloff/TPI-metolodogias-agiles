import { expect, it } from "vitest";
import { Ahorcado } from "../src/domain/Ahorcado.js";

it("enmascara GATO como _ _ _ _", () => {
  const juego = new Ahorcado("GATO");
  expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
});

it("enmascara PERRO como _ _ _ _ _", () => {
  const juego = new Ahorcado("PERRO");
  expect(juego.palabraEnmascarada()).toBe("_ _ _ _ _");
})

it("revela la A de GATO", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("A");
  expect(juego.palabraEnmascarada()).toBe("_ A _ _");
});

it("la a minuscula revela la A de GATO", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("a");
  expect(juego.palabraEnmascarada()).toBe("_ A _ _");
});

it("revela las dos R de PERRO", () => {
  const juego = new Ahorcado("PERRO");
  juego.adivinar("R");
  expect(juego.palabraEnmascarada()).toBe("_ _ R R _");
});

it("una letra ausente deja la mascara igual", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("X");
  expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
});

it("comienza con 6 intentos", () => {
  const juego = new Ahorcado("GATO");
  expect(juego.intentosRestantes()).toBe(6);
});

it("resta un intento si la letra es incorrecta", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("X");
  expect(juego.intentosRestantes()).toBe(5);
});

it("no resta intentos si la letra es correcta", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("A");
  expect(juego.intentosRestantes()).toBe(6);
});

it("completar GATO gana", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("G");
  juego.adivinar("A");
  juego.adivinar("T");
  juego.adivinar("O");
  expect(juego.ganada()).toBe(true);
});

it("completar ALA con A y L gana", () => {
  const juego = new Ahorcado("ALA");
  juego.adivinar("A");
  juego.adivinar("L");
  expect(juego.ganada()).toBe(true);
});

it("el sexto fallo pierde", () => {
  const juego = new Ahorcado("GATO");
  for (const letra of ["E", "I", "S", "U", "B", "X"]) juego.adivinar(letra);
  expect(juego.perdida()).toBe(true);
});

it("el sexto fallo de PERRO pierde", () => {
  const juego = new Ahorcado("PERRO");
  for (const letra of ["A", "I", "S", "U", "B", "X"]) juego.adivinar(letra);
  expect(juego.perdida()).toBe(true);
});

it("al perder la palabra queda revelada", () => {
  const juego = new Ahorcado("GATO");
  for (const letra of ["E", "I", "S", "U", "B", "X"]) juego.adivinar(letra);
  expect(juego.palabraEnmascarada()).toBe("GATO");
});

it("al perder PERRO queda revelada", () => {
  const juego = new Ahorcado("PERRO");
  for (const letra of ["A", "I", "S", "U", "B", "X"]) juego.adivinar(letra);
  expect(juego.palabraEnmascarada()).toBe("PERRO");
});

it("al empezar no hay letras intentadas", () => {
  const juego = new Ahorcado("GATO");
  expect(juego.letrasIncorrectas()).toEqual([]);
});

it("GATO con A y X solo tiene incorrecta la X", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("A");
  juego.adivinar("X");
  expect(juego.letrasIncorrectas()).toEqual(["X"]);
});

it("GATO con X dos veces tiene incorrecta una sola X", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("X");
  juego.adivinar("X");
  expect(juego.letrasIncorrectas()).toEqual(["X"]);
});

it("repetir X en GATO deja 5 intentos", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("X");
  juego.adivinar("X");
  expect(juego.intentosRestantes()).toBe(5);
});

it("repetir A en PERRO deja 5 intentos", () => {
  const juego = new Ahorcado("PERRO");
  juego.adivinar("A");
  juego.adivinar("A");
  expect(juego.intentosRestantes()).toBe(5);
});

it("con 1 fallo esta la cabeza", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("E");
  expect(juego.dibujo()).toEqual(["cabeza"]);
});

it("PERRO con 1 fallo esta la cabeza", () => {
  const juego = new Ahorcado("PERRO");
  juego.adivinar("A");
  expect(juego.dibujo()).toEqual(["cabeza"]);
});

it("con 6 fallos estan las 6 partes en orden", () => {
  const juego = new Ahorcado("GATO");
  for (const letra of ["E", "I", "S", "U", "B", "X"]) juego.adivinar(letra);
  expect(juego.dibujo()).toEqual([
    "cabeza",
    "tronco",
    "brazo izquierdo",
    "brazo derecho",
    "pierna izquierda",
    "pierna derecha",
  ]);
});

it("PERRO con 6 fallos estan las 6 partes en orden", () => {
  const juego = new Ahorcado("PERRO");
  for (const letra of ["A", "I", "S", "U", "B", "X"]) juego.adivinar(letra);
  expect(juego.dibujo()).toEqual([
    "cabeza",
    "tronco",
    "brazo izquierdo",
    "brazo derecho",
    "pierna izquierda",
    "pierna derecha",
  ]);
});


it("tras perder, otro adivinar no baja intentosRestantes de 0", () => {
  const juego = new Ahorcado("GATO");
  for (const letra of ["E", "I", "S", "U", "B", "X"]) juego.adivinar(letra);
  juego.adivinar("Z");
  expect(juego.intentosRestantes()).toBe(0);
});

it("después de ganar un fallo no resta intentos", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("G");
  juego.adivinar("A");
  juego.adivinar("T");
  juego.adivinar("O");
  juego.adivinar("Z");
  expect(juego.intentosRestantes()).toBe(6);
});

it("después de ganar un fallo no resta intentos", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("G");
  juego.adivinar("A");
  juego.adivinar("T");
  juego.adivinar("O");
  juego.adivinar("Z");
  expect(juego.intentosRestantes()).toBe(6);
});

it("reiniciar restablece intentos y letras incorrectas", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("X");
  juego.adivinar("E");
  juego.reiniciar("GATO");
  expect(juego.intentosRestantes()).toBe(6);
  expect(juego.letrasIncorrectas()).toEqual([]);
  expect(juego.terminada()).toBe(false);
});

it("reiniciar con nueva palabra enmascara la nueva palabra", () => {
  const juego = new Ahorcado("GATO");
  for (const letra of ["E", "I", "S", "U", "B", "X"]) juego.adivinar(letra);
  juego.reiniciar("PERRO");
  expect(juego.palabraEnmascarada()).toBe("_ _ _ _ _");
  expect(juego.perdida()).toBe(false);
});

it("ganar GATO sin fallos da 210 puntos", () => {
  const juego = new Ahorcado("GATO");
  for (const letra of ["G", "A", "T", "O"]) juego.adivinar(letra);
  expect(juego.puntaje()).toBe(210);
});

it("ganar GATO con 2 fallos da 120 puntos", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("X");
  juego.adivinar("Z");
  for (const letra of ["G", "A", "T", "O"]) juego.adivinar(letra);
  expect(juego.puntaje()).toBe(120);
});

it("perder da 0 puntos", () => {
  const juego = new Ahorcado("GATO");
  for (const letra of ["E", "I", "S", "U", "B", "X"]) juego.adivinar(letra);
  expect(juego.puntaje()).toBe(0);
});