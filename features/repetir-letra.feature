# language: es
@HU-J6
Característica: Repetir una letra incorrecta
  Como jugador
  quiero que una letra incorrecta ya usada no cuente de nuevo
  para no perder un intento al repetirla

  @CA-1
  Escenario: Repetir una incorrecta no resta
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "X"
    Y ingresa la letra "X"
    Entonces se ven 5 intentos restantes
    Y se ve el dibujo "cabeza"
