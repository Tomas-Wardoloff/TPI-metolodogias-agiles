// Evidencia de corte por análisis estático: la variable sinUsar rompe el
// quality gate de Biome (noUnusedVariables) y el pipeline debe fallar.
// NO MERGEAR.
export function evidenciaLint(): number {
  const sinUsar = 1;
  return 2;
}
