import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: 'v8',
      include: ['src/domain/**/*.ts'], // Solo mide la carpeta domain
      // text: en el log del job · html: reporte navegable (artifact) · json-summary: para el summary del run
      reporter: ['text', 'html', 'json-summary'],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90
      }
    }
  },
});