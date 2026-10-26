export function nombreValido(nombre: string): boolean {
  return nombre.trim() !== "" && !nombre.includes("1");
}