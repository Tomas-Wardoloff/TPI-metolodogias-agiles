import { expect, it } from "vitest";
import { niveles } from "../src/domain/dificultad"

it("el primer nivel es Facil", () => {
  expect(niveles()).toEqual(["Fácil"]);
});