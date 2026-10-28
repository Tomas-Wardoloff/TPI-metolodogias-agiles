const PARTES = [
  "cabeza",
  "tronco",
  "brazo izquierdo",
  "brazo derecho",
  "pierna izquierda",
  "pierna derecha",
];

const INTENTOS_INICIALES = 6;
const PUNTOS_POR_LETRA = 10;
const PUNTOS_POR_INTENTO = 20;
const BONUS_PERFECTO = 50;

export class Ahorcado {
  private acertadas = new Set<string>();
  private intentos = INTENTOS_INICIALES;
  private incorrectas: string[] = [];

  constructor(private palabra: string, private nivel = "") {}

  dificultad(): string {
    return this.nivel;
  }

  adivinar(letra: string): void {
    if (this.terminada()) return;
    const normalizada = letra.toUpperCase();
    if (this.palabra.toUpperCase().includes(normalizada)) {
      this.acertadas.add(normalizada);
    } else {
      if (this.incorrectas.includes(normalizada)) return;
      this.incorrectas.push(normalizada);
      this.intentos--;
    }
  }

  palabraEnmascarada(): string {
    if (this.perdida()) return this.palabra.toUpperCase();
    return this.palabra
      .split("")
      .map((letra) => (this.acertadas.has(letra.toUpperCase()) ? letra.toUpperCase() : "_"))
      .join(" ");
  }

  intentosRestantes(): number {
    return this.intentos;
  }

  terminada(): boolean {
    return this.ganada() || this.perdida();
  }

  ganada(): boolean {
    return this.palabra
      .toUpperCase()
      .split("")
      .every((letra) => this.acertadas.has(letra));
  }

  perdida(): boolean {
    return this.intentosRestantes() <= 0;
  }

  letrasIncorrectas(): string[] {
    return this.incorrectas;
  }

  dibujo(): string[] {
    const fallos = INTENTOS_INICIALES - this.intentosRestantes();
    return PARTES.slice(0, fallos);
  }

  reiniciar(nuevaPalabra?: string): void {
    if (nuevaPalabra) {
      this.palabra = nuevaPalabra;
    }
    this.intentos = INTENTOS_INICIALES;
    this.acertadas.clear();
    this.incorrectas = [];
  }

  puntaje(): number {
    if (!this.ganada()) return 0;
    const puntosPalabra = this.palabra.length * PUNTOS_POR_LETRA;
    const puntosIntentos = this.intentosRestantes() * PUNTOS_POR_INTENTO;
    const bonus = this.intentosRestantes() === INTENTOS_INICIALES ? BONUS_PERFECTO : 0;
    return puntosPalabra + puntosIntentos + bonus;
  }
}