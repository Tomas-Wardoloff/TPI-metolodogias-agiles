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

  @CA-2
  Escenario: Se ven las letras ingresadas en el orden en que se ingresaron
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "A"
    Y ingresa la letra "X"
    Entonces se ven las letras intentadas "A X"
