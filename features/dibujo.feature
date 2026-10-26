# language: es
@HU-J4
Característica: Ver el dibujo
  Como jugador
  quiero ver el dibujo del ahorcado
  para saber cuánto me falta perder

  @CA-1
  Escenario: El primer fallo muestra la cabeza
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "E"
    Entonces se ve el dibujo "cabeza"
