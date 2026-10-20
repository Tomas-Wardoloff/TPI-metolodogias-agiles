export class Ahorcado {
  private acertadas = new Set<string>();
  private intentos = 6;

  constructor(private palabra: string) {}

  adivinar(letra: string): void {
    if (this.palabra.includes(letra)) {
      this.acertadas.add(letra);
    } else {
      this.intentos--;
    }
  }

  palabraEnmascarada(): string {
    return this.palabra
      .split("")
      .map((letra) => (this.acertadas.has(letra) ? letra : "_"))
      .join(" ");
  }

  intentosRestantes(): number {
    return this.intentos;
  }

  ganada(): boolean {
    return this.palabra.split("").every((letra) => this.acertadas.has(letra));
  }
}