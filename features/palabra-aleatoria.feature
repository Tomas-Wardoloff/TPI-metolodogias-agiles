# language: es
@HU-CP3
Característica: Palabra aleatoria
  Como jugador
  quiero que la palabra se elija al azar según el nivel
  para que cada partida sea distinta

  @CA-1
  Escenario: La palabra se elige al azar dentro del nivel
    Dado que el jugador está en la pantalla de inicio con el azar en "0.5"
    Cuando ingresa el nombre "Yamila"
    Y elige el nivel "Fácil"
    Y confirma
    Entonces se ve la palabra "_ _ _ _ _ _ _ _ _ _ _"
