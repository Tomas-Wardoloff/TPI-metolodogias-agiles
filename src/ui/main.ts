import { Ahorcado } from "../domain/Ahorcado";
import { validarNombre } from "../domain/nombre";
import { validarLetra } from "../domain/letra";

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
  let partesDibujadas = 0;

  const dibujar = () => {
    const estado = juego.ganada()
      ? `<p data-testid="status" class="ganaste">GANASTE</p>`
      : juego.perdida()
        ? `<p data-testid="status" class="perdiste">PERDISTE</p>`
        : "";
    const puntajeHtml = juego.terminada()
      ? `<p data-testid="puntaje">${juego.puntaje()}</p>`
      : "";
    const botonReiniciar = juego.terminada()
      ? `<button data-testid="boton-reiniciar">Jugar de nuevo</button>`
      : "";

    root.innerHTML = `
      <p data-testid="intentos">${juego.intentosRestantes()}</p>
      <svg class="horca${juego.perdida() ? " perdida" : ""}" viewBox="0 0 120 140" aria-hidden="true">
        <g class="estructura">
          <line x1="10" y1="130" x2="70" y2="130" />
          <line x1="30" y1="130" x2="30" y2="10" />
          <line x1="30" y1="10" x2="85" y2="10" />
          <line x1="85" y1="10" x2="85" y2="28" />
        </g>
        <g class="cuerpo">
          <circle data-parte="cabeza" cx="85" cy="40" r="12" />
          <line data-parte="tronco" x1="85" y1="52" x2="85" y2="90" />
          <line data-parte="brazo izquierdo" x1="85" y1="62" x2="70" y2="78" />
          <line data-parte="brazo derecho" x1="85" y1="62" x2="100" y2="78" />
          <line data-parte="pierna izquierda" x1="85" y1="90" x2="72" y2="115" />
          <line data-parte="pierna derecha" x1="85" y1="90" x2="98" y2="115" />
          <g class="ojos">
            <line x1="78" y1="36" x2="82" y2="40" />
            <line x1="82" y1="36" x2="78" y2="40" />
            <line x1="88" y1="36" x2="92" y2="40" />
            <line x1="92" y1="36" x2="88" y2="40" />
          </g>
        </g>
      </svg>
      <p data-testid="word"></p>
      <p data-testid="letras-intentadas"></p>
      <p data-testid="dibujo" class="solo-lectores"></p>
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

    // Muestra en el SVG las partes que ya decidió el dominio;
    // solo la parte recién agregada lleva la animación.
    const partes = juego.dibujo();
    partes.forEach((parte, i) => {
      const elemento = root.querySelector(`[data-parte="${parte}"]`);
      elemento?.classList.add("visible");
      if (i >= partesDibujadas) elemento?.classList.add("nueva");
    });
    partesDibujadas = partes.length;

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