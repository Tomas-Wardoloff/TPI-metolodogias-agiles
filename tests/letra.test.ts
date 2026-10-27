import { describe, expect, it } from "vitest";
import { validarLetra } from "../src/domain/letra";

describe("validarLetra", () => {
  it("un número devuelve el aviso", () => {
    expect(validarLetra("3")).toBe("Ingresá una sola letra");
  });
  it("otro número devuelve el aviso", () => {
    expect(validarLetra("7")).toBe("Ingresá una sola letra");
  });
});
