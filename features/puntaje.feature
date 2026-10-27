# language: es
@HU-VP1
Característica: Cálculo del puntaje
  Como jugador
  quiero que el juego calcule mi puntaje al terminar la partida
  para conocer mi desempeño

  @CA-1
  Escenario: Ganar sin fallos otorga el puntaje máximo con bonus
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "G"
    Y ingresa la letra "A"
    Y ingresa la letra "T"
    Y ingresa la letra "O"
    Entonces se ve "GANASTE"
    Y se ve el puntaje 210

  @CA-2
  Escenario: Perder la partida da 0 puntos
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "E"
    Y ingresa la letra "I"
    Y ingresa la letra "S"
    Y ingresa la letra "U"
    Y ingresa la letra "B"
    Y ingresa la letra "X"
    Entonces se ve "PERDISTE"
    Y se ve el puntaje 0