export function nombreValido(nombre: string): boolean {
  return nombre.trim() !== "" && /^[\p{L} -]+$/u.test(nombre);
}
export function validarNombre(nombre: string): string | null {
  if (nombre === "") return "El nombre no puede estar vacío";
  return null;
}