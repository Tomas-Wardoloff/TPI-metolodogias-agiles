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