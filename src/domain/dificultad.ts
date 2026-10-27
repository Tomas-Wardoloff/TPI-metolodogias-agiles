export function niveles(): string[] {
    return ["Fácil", "Medio", "Difícil"];
}

export function validarDificultad(nivel: string): string | null {
    if (nivel === "") return "Elegí un nivel de dificultad";
    return null;
}