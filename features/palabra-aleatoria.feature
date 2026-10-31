# language: es
@HU-CP3
Característica: Palabra aleatoria
  Como jugador
  quiero que la palabra se elija al azar según el nivel
  para que cada partida sea distinta

  @CA-1
  Escenario: La palabra se elige al azar dentro del nivel
    Dado que el jugador está en la pantalla de inicio con el azar en "0.2"
    Cuando ingresa el nombre "Yamila"
    Y elige el nivel "Fácil"
    Y confirma
    Entonces se ve la palabra "_ _ _ _ _ _ _ _ _ _ _"


  @CA-2
  Escenario: La palabra no se repite en la partida siguiente
    Dado que el jugador está en la pantalla de inicio
    Cuando ingresa el nombre "Yamila"
    Y elige el nivel "Fácil"
    Y confirma
    Y ingresa la letra "W"
    Y ingresa la letra "X"
    Y ingresa la letra "Y"
    Y ingresa la letra "Z"
    Y ingresa la letra "K"
    Y ingresa la letra "Q"
    Entonces se ve "PERDISTE"
    Cuando presiona "Jugar de nuevo"
    Y elige el nivel "Fácil"
    Y confirma
    Entonces se ve la palabra "_ _ _ _ _ _ _ _ _ _ _"
