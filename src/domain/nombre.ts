export function nombreValido(nombre: string): boolean {
  return nombre.trim() !== "" && /^[\p{L} -]+$/u.test(nombre);
}
export function validarNombre(nombre: string): string | null {
  if (nombre.trim() === "") return "El nombre no puede estar vacío";
  if (!/^[\p{L} -]+$/u.test(nombre)) return "El nombre solo puede tener letras, espacios y guiones";
  return null;
}