# language: es
@HU-J2
Característica: Ingresar una letra
  Como jugador
  quiero ingresar la primera letra
  para descubrir la palabra

  @CA-1
  Esquema del escenario: La letra está en la palabra y se revela en todas sus posiciones
    Dado una partida con la palabra "<palabra>"
    Cuando ingresa la letra "<letra>"
    Entonces se ve la palabra "<mascara>"

    Ejemplos:
      | palabra | letra | mascara |
      | GATO    | A     | _ A _ _ |
      | PERRO   | R     | _ _ R R _ |

  @CA-2
  Escenario: La letra no está en la palabra
    Dado una partida con la palabra "GATO"
    Cuando ingresa la letra "X"
    Entonces se ve la palabra "_ _ _ _"
