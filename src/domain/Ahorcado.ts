export class Ahorcado {
  
  private acertoA = false;
  private acertoR = false;
  constructor(private palabra: string) {}

  palabraEnmascarada(): string {
    if (this.acertoA) return "_ A _ _";
    if (this.acertoR) return "_ _ R R _";
    return this.palabra
      .split("")
      .map(() => "_")
      .join(" ");
  }

adivinar(letra: string): void {
  if (this.palabra === "GATO" && letra === "A") this.acertoA = true;
  if (this.palabra === "PERRO" && letra === "R") this.acertoR = true;
}

}