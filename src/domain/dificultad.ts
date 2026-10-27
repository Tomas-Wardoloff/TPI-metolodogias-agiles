export function niveles(): string[] {
    return ["Fácil", "Medio", "Difícil"];
}

export function validarDificultad(nivel: string): string | null {
    if (nivel.trim() === "") return "Elegí un nivel de dificultad";
    return null;
}

export function palabraPara(_dificultad: string, _pick = 0): string {
    return "";
}