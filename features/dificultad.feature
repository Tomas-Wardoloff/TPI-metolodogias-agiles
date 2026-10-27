# language: es
@HU-CP2
Característica: Elegir dificultad
  Como jugador
  quiero elegir un nivel de dificultad
  para ajustar cuántos intentos tengo o qué tan larga es la palabra

  @CA-1
  Escenario: Se muestran los tres niveles
    Dado que el jugador está en la pantalla de inicio
    Entonces se ve el nivel "Fácil"
    Y se ve el nivel "Medio"
    Y se ve el nivel "Difícil"