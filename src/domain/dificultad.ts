export function niveles(): string[] {
    return ["Fácil", "Medio", "Difícil"];
}

export function validarDificultad(nivel: string): string | null {
    if (nivel.trim() === "") return "Elegí un nivel de dificultad";
    return null;
}

export const PALABRAS = [
  "SOL", "GATO", "PERRO", "CAMINO", "PLANETA", "ESTRELLA",
  "MURCIELAGO", "COMPUTADORA", "BIBLIOTECA",
  "HIPOPOTAMO", "TELEVISION", "UNIVERSIDAD", "CHOCOLATE", "REFRIGERADOR",
  "MARIPOSA", "ELEFANTE", "VENTANA", "GUITARRA", "CIUDAD",
  "LUNA", "MESA", "FLOR", "LIBRO", "ZORRO", "KIWI",
];

function palabrasDe(dificultad: string): string[] {
  return PALABRAS.filter((palabra) => {
    if (dificultad === "facil") return palabra.length >= 9;
    if (dificultad === "medio") return palabra.length >= 6 && palabra.length <= 8;
    return palabra.length >= 3 && palabra.length <= 5;
  });
}

export function palabraPara(dificultad: string, pick = 0): string {
  return palabrasDe(dificultad)[pick] ?? "";
}

export function palabraAlAzar(dificultad: string, azar: () => number): string {
  const lista = palabrasDe(dificultad);
  return lista[Math.floor(azar() * lista.length)];
}