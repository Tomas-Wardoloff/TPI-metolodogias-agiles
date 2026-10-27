# language: es
@HU-RE1
Característica: Jugar de nuevo
  Como jugador
  quiero reiniciar la partida
  para jugar otra vez rápidamente

  @CA-1
  Escenario: Al perder, jugar de nuevo restablece el estado
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "E"
    Y ingresa la letra "I"
    Y ingresa la letra "S"
    Y ingresa la letra "U"
    Y ingresa la letra "B"
    Y ingresa la letra "X"
    Entonces se ve "PERDISTE"
    Cuando presiona "Jugar de nuevo"
    Entonces se ven 6 intentos restantes
    Y no se ven letras intentadas
    Y no se ve estado de partida

  @CA-2
  Escenario: Al reiniciar se puede jugar con otra palabra
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "G"
    Y ingresa la letra "A"
    Y ingresa la letra "T"
    Y ingresa la letra "O"
    Entonces se ve "GANASTE"
    Cuando presiona "Jugar de nuevo"
    Entonces se ven 6 intentos restantes
    Y no se ve estado de partida