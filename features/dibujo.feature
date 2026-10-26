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

  @CA-2
  Escenario: Al sexto fallo se ve el dibujo completo
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "E"
    Y ingresa la letra "I"
    Y ingresa la letra "S"
    Y ingresa la letra "U"
    Y ingresa la letra "B"
    Y ingresa la letra "X"
    Entonces se ve el dibujo "cabeza, tronco, brazo izquierdo, brazo derecho, pierna izquierda, pierna derecha"
