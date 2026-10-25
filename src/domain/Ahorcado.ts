export class Ahorcado {
  private acertadas = new Set<string>();
  private intentos = 6;
  private intentadas: string[] = [];

  constructor(private palabra: string) {}

  adivinar(letra: string): void {
    const normalizada = letra.toUpperCase();
    if (this.palabra.toUpperCase().includes(normalizada)) {
      this.acertadas.add(normalizada);
    } else {
      this.intentadas.push(normalizada);
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

  ganada(): boolean {
    return this.palabra
      .toUpperCase()
      .split("")
      .every((letra) => this.acertadas.has(letra));
  }

  perdida(): boolean {
    return this.intentosRestantes() === 0;
  }

  letrasIntentadas(): string[] {
    return this.intentadas;
  }
}