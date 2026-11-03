# Ahorcado — TPI Metodologías Ágiles (Grupo 10)

Juego del Ahorcado en el navegador, desarrollado con TDD (unit tests del dominio) y ATDD (acceptance tests en Gherkin sobre la app real), con integración continua en GitHub Actions.

- **App en producción:** https://tomas-wardoloff.github.io/TPI-metolodogias-agiles/
- **Story Map / historias de usuario:** https://miro.com/app/board/uXjVHsffG1k=/
- **Trazabilidad Historia → criterio → escenario (AT) → unit tests:** ver [NOTES.md](NOTES.md)

## Cómo jugar

1. Ingresá tu nombre (solo letras, espacios y guiones).
2. Elegí un nivel de dificultad: Fácil, Medio o Difícil. La palabra se elige al azar dentro del nivel, y no se repite la de la partida anterior.
3. Escribí una letra y apretá Enter. Tenés 6 intentos.
4. Al ganar o perder se muestra el puntaje y podés jugar de nuevo.

## Estructura

```
src/
  domain/      lógica del juego, sin DOM (Ahorcado, nombre, letra, dificultad)
  ui/          pantalla: lee el input y muestra el estado
  index.ts     arranque: lee ?word= y ?posicion= (solo para tests) y monta la app
tests/         unit tests del dominio (Vitest)
features/      acceptance tests en Gherkin (.feature) y sus steps (Playwright + playwright-bdd)
```

## Comandos

```bash
npm install
npx playwright install chromium

npm run dev                 # app en http://localhost:5173
npx vitest run              # unit tests
npx vitest run --coverage   # unit tests + cobertura (umbral 90% sobre src/domain)
npm run at                  # acceptance tests contra la app real
npx tsc --noEmit            # compilación / chequeo de tipos
npm run lint                # análisis estático con Biome (falla ante cualquier hallazgo)
```

Los acceptance tests fijan la palabra y el azar por URL: `/?word=GATO` arranca una partida con esa palabra, y `/?posicion=0` hace que el sorteo elija siempre la primera palabra del nivel.

## Método de trabajo

- Un commit por transición de test: `RED:` (test que falla), `GREEN:` (código mínimo que lo hace pasar) y `REFACTOR:` cuando corresponde.
- Cada integrante arranca sus tests con su propia identidad de git.
- El pipeline (`.github/workflows/CI.yml`) corre en cada push: compilación, unit tests con cobertura (el reporte queda en el summary del run y como artifact), acceptance tests y análisis estático con Biome como quality gate, más CodeQL para seguridad. El deploy a GitHub Pages corre solo si esas etapas pasan. Las evidencias de que la coverage y el análisis estático cortan el pipeline están en [NOTES.md](NOTES.md#evidencias-de-corte).
