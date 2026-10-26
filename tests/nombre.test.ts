import { describe, expect, it } from "vitest";
import { nombreValido } from "../src/domain/nombre";

describe("nombreValido", () => {
  it("un nombre vacío no es válido", () => {
    expect(nombreValido("")).toBe(false);
  });
});