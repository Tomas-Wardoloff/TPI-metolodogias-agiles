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

  @CA-2
  Escenario: Un número muestra un aviso y no resta
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "3"
    Entonces se ve el aviso de letra "Ingresá una sola letra"
    Y se ven 6 intentos restantes

  @CA-3
  Escenario: Un símbolo muestra un aviso y no resta
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "#"
    Entonces se ve el aviso de letra "Ingresá una sola letra"
    Y se ven 6 intentos restantes

  @CA-4
  Escenario: Confirmar sin escribir muestra un aviso
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra ""
    Entonces se ve el aviso de letra "Ingresá una sola letra"
    Y se ven 6 intentos restantes
