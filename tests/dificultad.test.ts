import { expect, it } from "vitest";
import { niveles, palabraPara, validarDificultad } from "../src/domain/dificultad"

it("los niveles son Facil, Medio y Dificil", () => {
    expect(niveles()).toEqual(["Fácil", "Medio", "Difícil"]);
});

it("sin nivel devuelve el aviso", () => {
  expect(validarDificultad("")).toBe("Elegí un nivel de dificultad");
});

it("un nivel con solo espacios devuelve el aviso", () => {
    expect(validarDificultad("   ")).toBe("Elegí un nivel de dificultad");
});

it("dificil con pick 0 devuelve SOL", () => {
  expect(palabraPara("dificil", 0)).toBe("SOL");
  expect(palabraPara("dificil", 99)).toBe("");
});

it("medio con pick 0 devuelve CAMINO", () => {
  expect(palabraPara("medio", 0)).toBe("CAMINO");
});

it("facil con pick 0 devuelve MURCIELAGO", () => {
  expect(palabraPara("facil", 0)).toBe("MURCIELAGO");
});