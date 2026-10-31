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
    const entrada = juego.terminada()
      ? ""
      : `<input type="text" />
      <p data-testid="aviso-letra"></p>`;

    root.innerHTML = `
      <p data-testid="intentos">${juego.intentosRestantes()}</p>
      <p data-testid="dificultad"></p>
      <p data-testid="word"></p>
      <p data-testid="letras-intentadas"></p>
      <p data-testid="dibujo"></p>
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