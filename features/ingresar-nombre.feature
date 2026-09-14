# language: es
@HU-IN1
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