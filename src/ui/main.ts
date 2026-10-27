import { Ahorcado } from "../domain/Ahorcado";
import { validarNombre } from "../domain/nombre";

const PALABRAS_DISPONIBLES = ["GATO", "PERRO", "CASA", "ARBOL"];

function obtenerSiguientePalabra(actual: string): string {
  const alternativas = PALABRAS_DISPONIBLES.filter(
    (p) => p.toUpperCase() !== actual.toUpperCase()
  );
  return alternativas[0] ?? actual;
}

export function mountApp(root: HTMLElement, palabra: string): void {
  root.innerHTML = `
    <input data-testid="input-nombre" type="text" />
    <button>Continuar</button>
    <p data-testid="aviso"></p>
    <p data-testid="saludo"></p>
  `;

  const input = root.querySelector<HTMLInputElement>('[data-testid="input-nombre"]')!;
  const boton = root.querySelector("button")!;
  const aviso = root.querySelector<HTMLElement>('[data-testid="aviso"]')!;
  const saludo = root.querySelector<HTMLElement>('[data-testid="saludo"]')!;

  boton.addEventListener("click", () => {
    const error = validarNombre(input.value);
    if (error) {
      aviso.textContent = error;
      return;
    }

    aviso.textContent = "";
    saludo.textContent = `Hola, ${input.value}`;
    input.remove();
    boton.remove();
    const tablero = document.createElement("div");
    root.appendChild(tablero);
    mountGame(tablero, palabra);
  });
}

export function mountGame(root: HTMLElement, palabra: string): void {
  let palabraActual = palabra;
  const juego = new Ahorcado(palabraActual);

  const dibujar = () => {
    const estado = juego.ganada()
      ? `<p data-testid="status">GANASTE</p>`
      : juego.perdida()
        ? `<p data-testid="status">PERDISTE</p>`
        : "";
    const puntajeHtml = juego.terminada()
      ? `<p data-testid="puntaje">${juego.puntaje()}</p>`
      : "";
    const botonReiniciar = juego.terminada()
      ? `<button data-testid="boton-reiniciar">Jugar de nuevo</button>`
      : "";

    root.innerHTML = `
      <p data-testid="intentos">${juego.intentosRestantes()}</p>
      <p data-testid="word"></p>
      <p data-testid="letras-intentadas"></p>
      <p data-testid="dibujo"></p>
      ${estado}
      ${puntajeHtml}
      ${botonReiniciar}
      <input type="text" />
    `;

    root.querySelector<HTMLElement>('[data-testid="word"]')!.textContent =
      juego.palabraEnmascarada();
    root.querySelector<HTMLElement>('[data-testid="letras-intentadas"]')!.textContent =
      juego.letrasIncorrectas().join(" ");
    root.querySelector<HTMLElement>('[data-testid="dibujo"]')!.textContent =
      juego.dibujo().join(", ");

    const btnReiniciar = root.querySelector<HTMLButtonElement>('[data-testid="boton-reiniciar"]');
    if (btnReiniciar) {
      btnReiniciar.addEventListener("click", () => {
        palabraActual = obtenerSiguientePalabra(palabraActual);
        juego.reiniciar(palabraActual);
        dibujar();
      });
    }

    const input = root.querySelector("input")!;
    input.addEventListener("keydown", (evento) => {
      if (evento.key !== "Enter") return;
      juego.adivinar(input.value);
      dibujar();
    });
  };

  dibujar();
}