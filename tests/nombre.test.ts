import { describe, expect, it } from "vitest";
import { nombreValido } from "../src/domain/nombre";

describe("nombreValido", () => {
  it("un nombre vacío no es válido", () => {
    expect(nombreValido("")).toBe(false);
  });
  it("un nombre de solo espacios no es válido", () => {
    expect(nombreValido("   ")).toBe(false);
  });
  it("un nombre con un número no es válido", () => {
    expect(nombreValido("Ana1")).toBe(false);
  });
  it("un nombre con un símbolo no es válido", () => {
    expect(nombreValido("Ana@")).toBe(false);
  });
});