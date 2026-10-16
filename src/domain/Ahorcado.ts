export class Ahorcado {
  private acertadas = new Set<string>();
  constructor(private palabra: string) {}
  adivinar(letra: string): void {
    if (this.palabra.includes(letra)) this.acertadas.add(letra);
  }
  palabraEnmascarada(): string {
    return this.palabra
      .split("")
      .map((letra) => (this.acertadas.has(letra) ? letra : "_"))
      .join(" ");
  }
}