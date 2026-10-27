import { expect, it } from "vitest";
import { niveles } from "../src/domain/dificultad"

it("los niveles son Facil, Medio y Dificil", () => {
    expect(niveles()).toEqual(["Fácil", "Medio", "Difícil"]);
});