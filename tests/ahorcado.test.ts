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
