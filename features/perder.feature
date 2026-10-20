# language: es
@HU-J8
Característica: Perder la partida
  Como jugador
  quiero agotar los intentos
  para saber que perdí

  @CA-1
  Escenario: Al sexto fallo se ve PERDISTE
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "E"
    Y ingresa la letra "I"
    Y ingresa la letra "S"
    Y ingresa la letra "U"
    Y ingresa la letra "B"
    Y ingresa la letra "X"
    Entonces se ve "PERDISTE"

  @CA-2
  Escenario: Al perder se ve la palabra
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "E"
    Y ingresa la letra "I"
    Y ingresa la letra "S"
    Y ingresa la letra "U"
    Y ingresa la letra "B"
    Y ingresa la letra "X"
    Entonces se ve "PERDISTE"
    Y se ve la palabra "GATO"
