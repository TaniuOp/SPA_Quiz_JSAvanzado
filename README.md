# SPA_Quiz_JSAvanzado (HTML / CSS / JS Avanzado / MANEJO DEL DOM y LIBRERIAS EXTERNAS)

Quiz de halloween en SPA (single-page application)
El Quiz consta de 10 preguntas. Cada pregunta tendrá 4 opciones y sólo una de ellas será la correcta.
Podrán ser preguntas nuestras y preguntas que vengan de https://opentdb.com/

Conocimientos para este proyecto
- Manipulación dinámica del DOM
- Manejo de usuarios con Firebase Auth 
- SPA 
- Manejo de ES6
- Asincronía. Usar API de preguntas https://opentdb.com/
- APIs HTML5: Uso de Local storage 
- Uso de Api para pintar gráficas 
- Código limpio, buenas prácticas

Páginas
- home.html. Página de bienvenida + gráfica de últimos resultados
- question.html SPA. Página para renderizar las 10 distintas preguntas
- results.html Página para mostrar resultado del quiz

FASES
- FASE 1: Diseño del front
Diseño responsive, mobile first, semántica HTML5

- FASE 2: Lógica de JavaScript
Almacenar la puntuación de cada partida en un array de objetos [{..},{..},{..}...{..}] en Local Storage. Guardar puntuación y fecha en cada objeto del array

- FASE 3: Asincronía
Javascript: Manejo de asincronía. Leer 10 preguntas random de la API de prenguntas para generar el Quiz

- FASE 4 (avanzado) - APIs HTML5
Mostrar una gráfica los resultados de las últimas partidas jugadas (leer puntuaciones de LocalStorage). 
Representar Fecha(eje X) vs Puntuación(eje Y)

