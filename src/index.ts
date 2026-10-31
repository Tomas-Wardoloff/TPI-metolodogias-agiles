import { mountApp, mountGame } from "./ui/main";

const root = document.getElementById("app")!;
const params = new URLSearchParams(window.location.search);
const word = params.get("word");
const azarFijo = params.get("azar");

if (word) {
  mountGame(root, word);
} else {
  mountApp(root, azarFijo === null ? Math.random : () => Number(azarFijo));
}