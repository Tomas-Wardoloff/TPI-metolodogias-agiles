import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, Then, When } = createBdd();

Given("una partida con la palabra {string}", async ({ page }, palabra: string) => {
  await page.goto(`/?word=${palabra}`);
});

When("ingresa la letra {string}", async ({ page }, letra: string) => {
  const input = page.getByRole("textbox");
  await input.fill(letra);
  await input.press("Enter");
});

Then("se ve la palabra {string}", async ({ page }, esperada: string) => {
  await expect(page.getByTestId("word")).toHaveText(esperada);
});

Then("se ven {int} intentos restantes", async ({ page }, intentos: number) => {
  await expect(page.getByTestId("intentos")).toHaveText(intentos.toString());
});

Then("se ve {string}", async ({ page }, texto: string) => {
  await expect(page.getByTestId("status")).toHaveText(texto);
});

Then("no se ven letras intentadas", async ({ page }) => {
  await expect(page.getByTestId("letras-intentadas")).toHaveText("");
});

Then("se ven las letras intentadas {string}", async ({ page }, letras: string) => {
  await expect(page.getByTestId("letras-intentadas")).toHaveText(letras);
});

Then("se ve el dibujo {string}", async ({ page }, dibujo: string) => {
  await expect(page.getByTestId("dibujo")).toHaveText(dibujo);
});

When("presiona {string}", async ({ page }, textoBoton: string) => {
  await page.getByRole("button", { name: textoBoton }).click();
});

Then("no se ve estado de partida", async ({ page }) => {
  await expect(page.getByTestId("status")).toHaveCount(0);
});

Then("se ve el puntaje {int}", async ({ page }, puntaje: number) => {
  await expect(page.getByTestId("puntaje")).toHaveText(puntaje.toString());
});

Then("se ve el aviso de letra {string}", async ({ page }, aviso: string) => {
  await expect(page.getByTestId("aviso-letra")).toHaveText(aviso);
});

Then("no se pueden ingresar más letras", async ({ page }) => {
  await expect(page.getByRole("textbox")).toHaveCount(0);
});
