export function mountApp(root: HTMLElement): void {
  root.innerHTML = `
    <input data-testid="input-nombre" type="text" />
    <button>Continuar</button>
    <p data-testid="saludo"></p>
  `;

  const input = root.querySelector<HTMLInputElement>('[data-testid="input-nombre"]')!;
  const boton = root.querySelector("button")!;
  const saludo = root.querySelector<HTMLElement>('[data-testid="saludo"]')!;

  boton.addEventListener("click", () => {
    saludo.textContent = `Hola, ${input.value}`;
    input.remove();
    boton.remove();
  });
}

import { Ahorcado } from "../domain/Ahorcado";

export function mountGame(root: HTMLElement, palabra: string): void {
  const juego = new Ahorcado(palabra);
  root.innerHTML = 
    `<p data-testid="word"></p>`;
  root.querySelector<HTMLElement>('[data-testid="word"]')!.textContent =
    juego.palabraEnmascarada();
}