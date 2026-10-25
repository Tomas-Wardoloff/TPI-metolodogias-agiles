import { Ahorcado } from "../domain/Ahorcado";

export function mountApp(root: HTMLElement, palabra: string): void {
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
    const tablero = document.createElement("div");
    root.appendChild(tablero);
    mountGame(tablero, palabra);
  });
}

export function mountGame(root: HTMLElement, palabra: string): void {
  const juego = new Ahorcado(palabra);

  const dibujar = () => {
    const estado = juego.ganada()
      ? `<p data-testid="status">GANASTE</p>`
      : juego.perdida()
        ? `<p data-testid="status">PERDISTE</p>`
        : "";
    root.innerHTML = `
      <p data-testid="intentos">${juego.intentosRestantes()}</p>
      <p data-testid="word"></p>
      <p data-testid="letras-intentadas"></p>
      ${estado}
      <input type="text" />
    `;

    root.querySelector<HTMLElement>('[data-testid="word"]')!.textContent =
      juego.palabraEnmascarada();
    root.querySelector<HTMLElement>('[data-testid="letras-intentadas"]')!.textContent =
      juego.letrasIntentadas().join(" ");
    
    const input = root.querySelector("input")!;
    input.addEventListener("keydown", (evento) => {
      if (evento.key !== "Enter") return;
      juego.adivinar(input.value);
      dibujar();
    });
  };

  dibujar();
}