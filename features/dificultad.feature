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

  @CA-2
  Escenario: Sin nivel aparece un aviso y no avanza
    Dado que el jugador está en la pantalla de inicio
    Cuando ingresa el nombre "Yamila"
    Y confirma
    Entonces ve el aviso "Elegí un nivel de dificultad"
    Y no empieza la partida

  @CA-3
  Escenario: El nivel elegido queda guardado
    Dado que el jugador está en la pantalla de inicio
    Cuando ingresa el nombre "Yamila"
    Y elige el nivel "Fácil"
    Y confirma
    Entonces queda guardado el nivel "Fácil"

  @CA-4
  Escenario: Dificil usa una palabra de 3 a 5 letras
    Dado que el jugador está en la pantalla de inicio
    Cuando ingresa el nombre "Yamila"
    Y elige el nivel "Difícil"
    Y confirma
    Entonces se ve la palabra "_ _ _"