# language: es
@HU-J5
Característica: Ver letras intentadas
  Como jugador
  quiero ver las letras que ya intenté
  para no repetirlas

  @CA-1
  Escenario: Al empezar no hay letras intentadas
    Dado una partida con la palabra "GATO"
    Entonces no se ven letras intentadas
