export function validarLetra(letra: string): string | null {
  if (/\d/.test(letra)) return "Ingresá una sola letra";
  return null;
}
