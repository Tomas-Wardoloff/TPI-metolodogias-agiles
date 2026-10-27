# language: es
@HU-RI1
Característica: Ingresar nombre
  Como jugador
  quiero ingresar mi nombre
  para poder jugar

  @CA-1
  Escenario: Un nombre vacío muestra un aviso y no empieza la partida
    Dado que el jugador está en la pantalla de inicio
    Cuando confirma
    Entonces ve el aviso "El nombre no puede estar vacío"
    Y no empieza la partida

  @CA-2
  Escenario: Un nombre con caracteres no permitidos muestra un aviso y no empieza la partida
    Dado que el jugador está en la pantalla de inicio
    Cuando ingresa el nombre "Ana123"
    Y confirma
    Entonces ve el aviso "El nombre solo puede tener letras, espacios y guiones"
    Y no empieza la partida

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