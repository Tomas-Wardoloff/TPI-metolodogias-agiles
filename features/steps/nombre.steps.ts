import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Given("que el jugador está en la pantalla de inicio", async ({ page }) => {
  await page.goto("/");
});

When("ingresa el nombre {string}", async ({ page }, nombre: string) => {
  await page.getByTestId("input-nombre").fill(nombre);
});

When("confirma", async ({ page }) => {
  await page.getByRole("button", { name: "Continuar" }).click();
});

Then("ve el saludo {string}", async ({ page }, saludo: string) => {
  await expect(page.getByTestId("saludo")).toHaveText(saludo);
});

Then("ve una palabra oculta", async ({ page }) => {
  await expect(page.getByTestId("word")).toHaveText(/^(_( _)*)$/);
});

Then("la dirección no contiene {string}", async ({ page }, texto: string) => {
  expect(page.url()).not.toContain(texto);
});