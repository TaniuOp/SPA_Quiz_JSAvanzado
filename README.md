# SPA_Quiz_JSAvanzado
Quiz de halloween en SPA (single-page application)
https://github.com/TheBridge-FullStackDeveloper/temario_fullstack_FT_sept21/blob/main/teoria/js_avanzado/quiz.md

Partiendo del Quiz que hemos ido haciendo estos días, volveremos a realizar refactorización para añadir nuevas funcionalidades.

Objetivo
El Quiz constará de 10 preguntas. Cada pregunta tendrá 4 opciones y sólo una de ellas será la correcta.
Podrán ser preguntas nuestras y preguntas que vengan de https://opentdb.com/
La aplicación tendrá que ser una SPA (single-page application). Sólo una pregunta cada vez en pantalla.

Requisitos para este proyecto
- Manipulación dinámica del DOM
- Crear una página SPA para las preguntas
- Manejo de ES6
- Asincronía. Usar API de preguntas https://opentdb.com/
- APIs HTML5: Uso de Local storage y gráficas, etc...
- Sin frameworks ni librerias externas en la medida de lo posible
- Gestión del proyecto desde el inicio en un único repositorio compartido (como colaboradores) en Github
- Código limpio, buenas prácticas

Páginas
- home.html. Página de bienvenida + gráfica de últimos resultados
- question.html SPA. Página para renderizar las 10 distintas preguntas
- results.html Página para mostrar resultado del quiz

FASES
- FASE 1: Diseño del front
Diseño responsive, mobile first, semántica HTML5

- FASE 2: Lógica de JavaScript
Adaptar nuestra app acorde a lo que vimos en clase
proyectos-quiz-resurrected
Conseguir con 10 preguntas nuestras, guardadas en un array de objetos, se pueda jugar a nuestro Quiz. [{..},{..},{..}...{..}]

- FASE 3: Asincronía
Javascript: Manejo de asincronía. Leer 10 preguntas random de la API de prenguntas para generar el Quiz

- FASE 4 (avanzado) - APIs HTML5
Almacenar la puntuación de cada partida en un array de objetos [{..},{..},{..}...{..}] en Local Storage. Guardar puntuación y fecha en cada objeto del array
Mostrar en la Home con una gráfica los resultados de las últimas partidas jugadas (leer puntuaciones de LocalStorage). 
Representar Fecha(eje X) vs Puntuación(eje Y)


Opcional
Otras APIs, mix de preguntas de distinas fuentes...
En general, cualquier extra será bien recibido para que investiguéis por vuestra cuenta, siempre y cuando tenga sentido


Quiz... resurrected!
https://github.com/TheBridge-FullStackDeveloper/proyectos-quiz-resurrected

Van a entrar en juego 2 funciones, printQuestions y printQuestion, y una colección de objetos, questions.

• printQuestions recibe la colección de preguntas questions y devuelve el HTML con todas las preguntas.
• printQuestion recibe una pregunta y devuelve el HTML de esa pregunta.
• questions es una colección con todas las preguntas.

1. Nos llevarnos todas las preguntas desde el HTML hasta JS, dentro de la función printQuestions. 
Ahora tenemos una función que devuelve un enorme string, con todas las preguntas, pero el comportamiento de la función no habrá cambiado.
2. Crearemos nuestra función printQuestion, donde pondremos una de las preguntas, completa. Con esto se nos queda igual que printQuestions, imprimiendo un string con una pregunta, pero una en vez de 5.
3. Una vez tenemos esta pregunta, sacaremos todos los valores relevantes, en forma de objeto

En este punto, tenemos printQuestions, printQuestion y una question

Haz que al ejecutar printQuestion con el objeto anterior question como argumento, devuelva el mismo HTML. Con esto, tenemos una función que, al pasarle una pregunta, devuelve el HTML para esa pregunta.

Crea la colección questions y mete todas las preguntas ahí, con el mismo formato que tiene el objeto question.

¡Hora de montar el puzzle!

Una vez llegado hasta aquí, tendrás todo lo necesario: printQuestions, printQuestion y tu colección de questions

El funcionamiento es el siguiente: - printQuestions se ejecuta y toma como argumento questions. - Dentro de printQuestions iterarás sobre dichas questions e imprimirás cada una de ellas con printQuestion en cada iteración

Premium: Te habrás dado cuenta que todo aquello que se halla dentro de printQuestion es susceptible de mejorarse, como iterar para cada answer, crear funciones adicionales... ¡HAZLO!

viernes - Corregir las 5 preguntas
Después de ayer, tu aplicación es capaz de pintar tantas preguntas como quieras. Si has utilizado las 5 preguntas originales, descubrirás que sigue funcionando, pero no así con nuevas preguntas.

Habrás deducido que la validación no tiene que ver con nada de lo que hicimos ayer, y que se halla en otro lado. Las preguntas estaban en el HTML y nosotros, sabiendo que para cambiarlas hay que hacerlo manualmente, pues podemos tener en JS las respuestas correctas y así podíamos comparar pero, ¿qué ocurriría si las preguntas vienen de un lugar misteriosos y no sabemos las respuestas?

Nuestra misión hoy será hacer que la validación sea posible para todos las preguntas que queramos. Esto se logra de la siguiente manera: En cada pregunta, de nuestra colección de preguntas, debe estar la respuesta correcta.

1- Lleva a cada pregunta su respuesta correcta.

2- Una vez que el usuario envíe sus resultados, iteraremos por cada uno de ellos y buscaremos dentro de la colección questions su respuesta correcta buscaremos dentro de la colección questions su respuesta correcta.