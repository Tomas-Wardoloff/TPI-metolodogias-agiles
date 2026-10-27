export function validarLetra(letra: string): string | null {
  if (letra === "") return "Ingresá una sola letra";
  if (letra.length > 1) return "Ingresá una sola letra";
  if (/[^\p{L}]/u.test(letra)) return "Ingresá una sola letra";
  return null;
}
