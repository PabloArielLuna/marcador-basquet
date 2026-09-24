# Marcador de básquet 🏀

Entregable de la **Clase 8** — Desarrollo de Aplicaciones para Dispositivos Móviles.

App hecha con **Expo + React Native + TypeScript**.

## Cómo correrla

```bash
npm install
npx expo start
```

## Respuestas del Ejercicio 2

**¿Por qué acá el estado tiene que vivir en el padre?**
En el ejercicio de los tres contadores cada contador era independiente: nadie de afuera necesitaba saber su valor. Acá la pantalla necesita comparar los dos puntajes para saber quién gana, mostrar la leyenda, resaltar el panel ganador y habilitar o no *Nuevo partido* (Ejercicio 3). Si cada `PanelEquipo` guardara su propio puntaje, el padre no podría leerlos ni ponerlos en 0. Por eso el estado sube al ancestro común y baja a cada panel por props.

**Adentro de `PanelEquipo`, ¿cómo le pasás el `onAnotar` a cada botón? ¿Por qué no alcanza con `onPress={onAnotar}`?**
A cada botón le paso una función flecha que llama a `onAnotar` con su cantidad: `onPress={() => onAnotar(2)}`. No alcanza con `onPress={onAnotar}` porque `onPress` espera una función `() => void` y la llama sin el número que necesitamos: `onAnotar` recibiría el evento del toque (o nada) en lugar de 1, 2 o 3. Además, los tres botones harían exactamente lo mismo. La flecha "fija" cuántos puntos vale cada botón.
