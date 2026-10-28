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
  const lista = PALABRAS.filter((palabra) => {
    if (dificultad === "facil") return palabra.length >= 9;
    if (dificultad === "medio") return palabra.length >= 6 && palabra.length <= 8;
    return palabra.length >= 3 && palabra.length <= 5;
  });
  return lista[pick] ?? "";
}

export function palabraAlAzar(dificultad: string, azar: () => number): string {
  return "";
}