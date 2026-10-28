import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Given("que el jugador está en la pantalla de inicio", async ({ page }) => {
  await page.goto("/");
});

When("ingresa el nombre {string}", async ({ page }, nombre: string) => {
  await page.getByTestId("input-nombre").fill(nombre);
});

When("elige el nivel {string}", async ({ page }, nivel: string) => {
  await page.getByRole("button", { name: nivel }).click();
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

Then("ve el aviso {string}", async ({ page }, aviso: string) => {
  await expect(page.getByTestId("aviso")).toHaveText(aviso);
});

Then("no empieza la partida", async ({ page }) => {
  await expect(page.getByTestId("word")).toHaveCount(0);
});

Then("se ve el nivel {string}", async ({ page }, nivel: string) => {
  await expect(page.getByRole("button", { name: nivel })).toBeVisible();
});

Then("se ve el radio {string}", async ({ page }, nivel: string) => {
  await expect(page.getByRole("radio", { name: nivel })).toBeVisible();
});

Then("queda guardado el nivel {string}", async ({ page }, nivel: string) => {
  await expect(page.getByTestId("dificultad")).toHaveText(nivel);
});