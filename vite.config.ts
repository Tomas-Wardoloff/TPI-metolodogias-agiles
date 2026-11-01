import { defineConfig } from "vite";

// Rutas relativas: en GitHub Pages la app vive en /TPI-metolodogias-agiles/,
// no en la raíz del dominio. Con base absoluta (/assets/...) el sitio carga en blanco.
export default defineConfig({
  base: "./",
});
