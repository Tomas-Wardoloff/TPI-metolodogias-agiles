# language: es
@HU-J7
Característica: Ganar la partida
  Como jugador
  quiero completar la palabra
  para ver que gané

  @CA-1
  Escenario: Al revelar todas las letras se ve GANASTE
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "G"
    Y ingresa la letra "A"
    Y ingresa la letra "T"
    Y ingresa la letra "O"
    Entonces se ve "GANASTE"
