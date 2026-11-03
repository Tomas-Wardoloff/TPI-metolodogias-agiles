import { mountApp, mountGame } from "./ui/main";
import "./ui/styles.css";


const root = document.getElementById("app")!;
const params = new URLSearchParams(window.location.search);
const word = params.get("word");
const posicionFija = params.get("posicion");

// En el juego real la posición sale de Math.random; los acceptance tests
// la fijan con ?posicion= para que la palabra sea siempre la misma.
const elegirPosicion =
  posicionFija === null
    ? (cantidad: number) => Math.floor(Math.random() * cantidad)
    : () => Number(posicionFija);

if (word) {
  mountGame(root, word);
} else {
  mountApp(root, elegirPosicion);
}