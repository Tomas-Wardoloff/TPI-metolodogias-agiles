import { Ahorcado } from "../domain/Ahorcado";
import { validarNombre } from "../domain/nombre";
import { validarLetra } from "../domain/letra";
import { niveles, validarDificultad } from "../domain/dificultad";

const PALABRAS_DISPONIBLES = ["GATO", "PERRO", "CASA", "ARBOL"];

function obtenerSiguientePalabra(actual: string): string {
  const alternativas = PALABRAS_DISPONIBLES.filter(
    (p) => p.toUpperCase() !== actual.toUpperCase()
  );
  return alternativas[0] ?? actual;
}

export function mountApp(root: HTMLElement, palabra: string): void {
  let nivelElegido = "";
  const botonesNiveles = niveles()
    .map((nivel) => `<button type="button">${nivel}</button>`)
    .join("");

  root.innerHTML = `
    <input data-testid="input-nombre" type="text" />
    ${botonesNiveles}
    <button>Continuar</button>
    <p data-testid="aviso"></p>
    <p data-testid="saludo"></p>
  `;

  const input = root.querySelector<HTMLInputElement>('[data-testid="input-nombre"]')!;
  const boton = [...root.querySelectorAll("button")].find(
    (b) => b.textContent === "Continuar"
  )!;
  const aviso = root.querySelector<HTMLElement>('[data-testid="aviso"]')!;
  const saludo = root.querySelector<HTMLElement>('[data-testid="saludo"]')!;

  for (const botonNivel of root.querySelectorAll<HTMLButtonElement>("button[type='button']")) {
    botonNivel.addEventListener("click", () => {
      nivelElegido = botonNivel.textContent ?? "";
    });
  }

  boton.addEventListener("click", () => {
    const error = validarNombre(input.value);
    if (error) {
      aviso.textContent = error;
      return;
    }

    const errorNivel = validarDificultad(nivelElegido);
    if (errorNivel) {
      aviso.textContent = errorNivel;
      return;
    }

    aviso.textContent = "";
    saludo.textContent = `Hola, ${input.value}`;
    input.remove();
    boton.remove();
    for (const botonNivel of root.querySelectorAll("button[type='button']")) {
      botonNivel.remove();
    }
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
      <p data-testid="aviso-letra"></p>
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
    const avisoLetra = root.querySelector<HTMLElement>('[data-testid="aviso-letra"]')!;
    input.addEventListener("keydown", (evento) => {
      if (evento.key !== "Enter") return;
      const error = validarLetra(input.value);
      if (error) {
        avisoLetra.textContent = error;
        return;
      }
      juego.adivinar(input.value);
      dibujar();
    });
  };

  dibujar();
}