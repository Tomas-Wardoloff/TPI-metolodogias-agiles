export class Ahorcado {
  constructor(private palabra: string) {}

  palabraEnmascarada(): string {
    if (this.palabra == "GATO")
        return "_ _ _ _"
    else {return "_ _ _ _ _" }
    }
}