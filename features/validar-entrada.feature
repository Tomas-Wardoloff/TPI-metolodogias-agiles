# language: es
@HU-J6
Característica: Validar entrada inválida
  Como jugador
  quiero que el sistema rechace lo que no sea una letra válida
  para evitar estados inconsistentes

  @CA-1
  Escenario: Repetir una incorrecta no resta
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "X"
    Y ingresa la letra "X"
    Entonces se ven 5 intentos restantes
    Y se ve el dibujo "cabeza"
