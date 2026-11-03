// Evidencia de corte por coverage: este archivo no tiene tests a propósito.
// Baja la coverage de src/domain/ por debajo del 90% y el pipeline debe fallar.
// NO MERGEAR.
export function sinTestUno(valor: number): number {
  const doble = valor * 2;
  const triple = valor * 3;
  return doble + triple;
}

export function sinTestDos(texto: string): string {
  const limpio = texto.trim();
  const mayusculas = limpio.toUpperCase();
  return mayusculas;
}

export function sinTestTres(lista: string[]): number {
  const largos = lista.map((item) => item.length);
  const total = largos.reduce((suma, largo) => suma + largo, 0);
  return total;
}
