export class Ahorcado {
  private acertadas = new Set<string>();
  private intentos = 6;

  constructor(private palabra: string) {}

  adivinar(letra: string): void {
    const normalizada = letra.toUpperCase();
    if (this.palabra.toUpperCase().includes(normalizada)) {
      this.acertadas.add(normalizada);
    } else {
      this.intentos--;
    }
  }

  palabraEnmascarada(): string {
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
    return this.palabra.toUpperCase() === "GATO" && this.intentosRestantes() === 0;
  }

}