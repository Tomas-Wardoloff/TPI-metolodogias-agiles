import { Ahorcado } from "../domain/Ahorcado";
import { validarNombre } from "../domain/nombre";
import { validarLetra } from "../domain/letra";
import { niveles, palabraAlAzar, validarDificultad } from "../domain/dificultad";

const PALABRAS_DISPONIBLES = ["GATO", "PERRO", "CASA", "ARBOL"];

function obtenerSiguientePalabra(actual: string): string {
  const alternativas = PALABRAS_DISPONIBLES.filter(
    (p) => p.toUpperCase() !== actual.toUpperCase()
  );
  return alternativas[0] ?? actual;
}

function htmlRadios(): string {
  return niveles()
    .map(
      (nivel) =>
        `<label><input type="radio" name="dificultad" value="${nivel}" /> ${nivel}</label>`
    )
    .join("");
}

function codigoDe(nivel: string): string {
  if (nivel === "Fácil") return "facil";
  if (nivel === "Medio") return "medio";
  return "dificil";
}

export function mountApp(root: HTMLElement, azar: () => number): void {
  root.innerHTML = `
    <input data-testid="input-nombre" type="text" />
    <div data-testid="niveles">${htmlRadios()}</div>
    <button>Continuar</button>
    <p data-testid="aviso"></p>
    <p data-testid="saludo"></p>
  `;

  const input = root.querySelector<HTMLInputElement>('[data-testid="input-nombre"]')!;
  const aviso = root.querySelector<HTMLElement>('[data-testid="aviso"]')!;
  const saludo = root.querySelector<HTMLElement>('[data-testid="saludo"]')!;
  const cajaNiveles = root.querySelector<HTMLElement>('[data-testid="niveles"]')!;

  const empezar = (nivelVisible: string) => {
    root.querySelector("button")?.remove();
    cajaNiveles.innerHTML = "";
    aviso.textContent = "";
    const codigo = codigoDe(nivelVisible);
    const tablero = document.createElement("div");
    root.appendChild(tablero);
    mountGame(tablero, palabraAlAzar(codigo, azar), codigo, nivelVisible, () => {
      tablero.remove();
      cajaNiveles.innerHTML = htmlRadios();
      const seguir = document.createElement("button");
      seguir.textContent = "Continuar";
      aviso.before(seguir);
      seguir.addEventListener("click", () => {
        const elegido = root.querySelector<HTMLInputElement>('input[name="dificultad"]:checked');
        const nivelElegido = elegido?.value ?? "";
        const errorNivel = validarDificultad(nivelElegido);
        if (errorNivel) {
          aviso.textContent = errorNivel;
          return;
        }
        empezar(nivelElegido);
      });
    });
  };

  const boton = root.querySelector("button")!;
  boton.addEventListener("click", () => {
    const error = validarNombre(input.value);
    if (error) {
      aviso.textContent = error;
      return;
    }

    const elegido = root.querySelector<HTMLInputElement>('input[name="dificultad"]:checked');
    const nivelElegido = elegido?.value ?? "";
    const errorNivel = validarDificultad(nivelElegido);
    if (errorNivel) {
      aviso.textContent = errorNivel;
      return;
    }

    saludo.textContent = `Hola, ${input.value}`;
    input.remove();
    empezar(nivelElegido);
  });
}

export function mountGame(
  root: HTMLElement,
  palabra: string,
  codigo = "",
  nivelVisible = "",
  alVolverAJugar?: () => void
): void {
  let palabraActual = palabra;
  const juego = new Ahorcado(palabraActual, codigo);
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
    const entrada = juego.terminada()
      ? ""
      : `<input type="text" />
      <p data-testid="aviso-letra"></p>`;

    root.innerHTML = `
      <p data-testid="intentos">${juego.intentosRestantes()}</p>
      <p data-testid="dificultad"></p>
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
      ${entrada}
    `;

    root.querySelector<HTMLElement>('[data-testid="dificultad"]')!.textContent = nivelVisible;
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
        if (alVolverAJugar) {
          alVolverAJugar();
          return;
        }
        palabraActual = obtenerSiguientePalabra(palabraActual);
        juego.reiniciar(palabraActual);
        dibujar();
      });
    }

    const input = root.querySelector("input");
    if (!input) return;
    // Cada dibujar() crea un input nuevo: le devolvemos el foco
    // para que el jugador pueda seguir escribiendo sin hacer clic.
    input.focus();
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