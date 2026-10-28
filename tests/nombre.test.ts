import { describe, expect, it } from "vitest";
import { validarNombre } from "../src/domain/nombre";

describe("validarNombre", () => {
  it("un nombre vacío devuelve el aviso de vacío", () => {
    expect(validarNombre("")).toBe("El nombre no puede estar vacío");
  });
   it("un nombre de solo espacios devuelve el aviso de vacío", () => {
    expect(validarNombre("   ")).toBe("El nombre no puede estar vacío");
  });
  it("un nombre con un número devuelve el aviso de caracteres", () => {
    expect(validarNombre("Ana1")).toBe("El nombre solo puede tener letras, espacios y guiones");
  });
  it("un nombre con un símbolo devuelve el aviso de caracteres", () => {
    expect(validarNombre("Ana@")).toBe("El nombre solo puede tener letras, espacios y guiones");
  });
    it("un nombre válido no devuelve aviso", () => {
    expect(validarNombre("María-José Núñez")).toBeNull();
  });
});