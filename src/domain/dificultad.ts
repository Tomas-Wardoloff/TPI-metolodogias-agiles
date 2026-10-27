export function niveles(): string[] {
    return ["Fácil", "Medio", "Difícil"];
}

export function validarDificultad(nivel: string): string | null {
    if (nivel.trim() === "") return "Elegí un nivel de dificultad";
    return null;
}

export const PALABRAS = [
  "SOL",
  "GATO",
  "PERRO",
  "CAMINO",
  "PLANETA",
  "ESTRELLA",
  "MURCIELAGO",
  "COMPUTADORA",
  "BIBLIOTECA",
];

export function palabraPara(dificultad: string, pick = 0): string {
  if (dificultad === "dificil" && pick === 0) return "SOL";
  return "";
}