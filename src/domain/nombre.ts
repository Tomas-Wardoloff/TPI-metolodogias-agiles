export function nombreValido(nombre: string): boolean {
  return nombre.trim() !== "" && /^[\p{L} -]+$/u.test(nombre);
}