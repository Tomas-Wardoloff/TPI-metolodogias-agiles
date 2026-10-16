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
  expect(juego.palabraEnmascarada()).toBe(" A  _");
});