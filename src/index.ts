import { mountApp, mountGame } from "./ui/main";

const root = document.getElementById("app")!;
const word = new URLSearchParams(window.location.search).get("word");

if (word) {
  mountGame(root, word);
} else {
  mountApp(root, "GATO");
}