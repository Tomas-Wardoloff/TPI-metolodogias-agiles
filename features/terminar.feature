# language: es
@HU-J9
Característica: Terminar la partida
  Como jugador
  quiero que el juego se detenga cuando gano o pierdo
  para que mi resultado no cambie

  @CA-1
  Escenario: Después de perder, otra letra no cambia nada
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "E"
    Y ingresa la letra "I"
    Y ingresa la letra "S"
    Y ingresa la letra "U"
    Y ingresa la letra "B"
    Y ingresa la letra "X"
    Y ingresa la letra "Z"
    Entonces se ve "PERDISTE"
    Y se ve la palabra "GATO"

