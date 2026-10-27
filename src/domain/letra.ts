export function validarLetra(letra: string): string | null {
  if (/[^\p{L}]/u.test(letra)) return "Ingresá una sola letra";
  return null;
}
