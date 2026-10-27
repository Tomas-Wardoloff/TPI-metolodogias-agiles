import { expect, it } from "vitest";
import { niveles, validarDificultad } from "../src/domain/dificultad"

it("los niveles son Facil, Medio y Dificil", () => {
    expect(niveles()).toEqual(["Fácil", "Medio", "Difícil"]);
});

it("sin nivel devuelve el aviso", () => {
  expect(validarDificultad("")).toBe("Elegí un nivel de dificultad");
});

it("un nivel con solo espacios devuelve el aviso", () => {
    expect(validarDificultad("   ")).toBe("Elegí un nivel de dificultad");
});