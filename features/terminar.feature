# language: es
@HU-J9
Característica: Terminar la partida
  Como jugador
  quiero que el juego se detenga cuando gano o pierdo
  para que mi resultado no cambie

  @CA-1
  Escenario: Después de perder no se pueden ingresar más letras
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "E"
    Y ingresa la letra "I"
    Y ingresa la letra "S"
    Y ingresa la letra "U"
    Y ingresa la letra "B"
    Y ingresa la letra "X"
    Entonces se ve "PERDISTE"
    Y se ve la palabra "GATO"
    Y no se pueden ingresar más letras

  @CA-2
  Escenario: Después de ganar, otra letra no cambia nada
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "G"
    Y ingresa la letra "A"
    Y ingresa la letra "T"
    Y ingresa la letra "O"
    Y ingresa la letra "Z"
    Entonces se ve "GANASTE"
    Y se ven 6 intentos restantes
