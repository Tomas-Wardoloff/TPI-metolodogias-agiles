# language: es
@HU-J1 @HU-J3
Característica: Ver palabra oculta
  Como jugador
  quiero ver la palabra con guiones por cada letra
  para saber qué tan larga es

  @CA-1
  Esquema del escenario: La palabra se muestra con un guion por letra
    Dado una partida con la palabra "<palabra>"
    Entonces se ve la palabra "<mascara>"
    Y se ven <intentos> intentos

    Ejemplos:
      | palabra | mascara   | intentos |
      | GATO    |       | 6        |
      | PERRO   |     _ | 6        |