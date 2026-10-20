# language: es
@HU-RI1
Característica: Ingresar nombre
  Como jugador
  quiero ingresar mi nombre
  para poder jugar

  @CA-3
  Escenario: El jugador ingresa un nombre válido
    Dado que el jugador está en la pantalla de inicio
    Cuando ingresa el nombre "Yamila"
    Y confirma
    Entonces ve el saludo "Hola, Yamila"

  @CA-4
  Escenario: Al confirmar empieza la partida sin mostrar la palabra
    Dado que el jugador está en la pantalla de inicio
    Cuando ingresa el nombre "Yamila"
    Y confirma
    Entonces ve el saludo "Hola, Yamila"
    Y ve una palabra oculta
    Y la dirección no contiene "word"