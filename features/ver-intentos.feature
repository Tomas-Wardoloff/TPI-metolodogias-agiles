# language: es
@HU-J3
Característica: Ver intentos restantes
  Como jugador quiero ver cuántos intentos me quedan, para decidir mi estrategia

  @CA-1
  Escenario: Inicio de partida
    Dado una partida con la palabra "GATO"
    Entonces se ven 6 intentos restantes

  @CA-2
  Escenario: Letra incorrecta resta un intento
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "X"
    Entonces se ven 5 intentos restantes

  @CA-3
  Escenario: Letra correcta no resta intentos
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "A"
    Entonces se ven 6 intentos restantes