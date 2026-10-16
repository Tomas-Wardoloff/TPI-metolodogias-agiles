export class Ahorcado {
  
  private acertoA = false;
  constructor(private palabra: string) {}

  palabraEnmascarada(): string {
    if (this.acertoA) return "_ A _ _";
    return this.palabra
      .split("")
      .map(() => "_")
      .join(" ");
  }

adivinar(letra: string): void {
  if (this.palabra === "GATO" && letra === "A") this.acertoA = true;
}
}