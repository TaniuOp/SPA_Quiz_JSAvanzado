// FIREBASE - FIRESTORE para guardar puntuacion de usuario asociado al user UID

//Inicializamos Firebase 

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { collection, getFirestore, addDoc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js"
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

// Datos de nuestro proyecto 
const firebaseConfig = {
    apiKey: "AIzaSyA7vjJIZJFdHdQLG77I3Uch_8f8mzhzqLs",
    authDomain: "quizztaniuruben.firebaseapp.com",
    projectId: "quizztaniuruben",
    storageBucket: "quizztaniuruben.appspot.com",
    messagingSenderId: "692644756869",
    appId: "1:692644756869:web:be9d16807787b8e5df98ec"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtenemos la info del usuario logeado para crear la colección con su ID
const auth = getAuth();
let userUid 

onAuthStateChanged(auth, (user) => {
  if (user) {
    userUid = user.uid;
    console.log("Current User UID:" + userUid);
    return userUid
  } else {
    window.alert("You need to be logged in to play!");
    location.href = "/index.html";
  }
});

// PREGUNTAS DINAMICAS PARA LA SPA DEL QUIZ 

let allData={} // variable donde meteremos el objeto 
let questionsArray=[]; //array donde meteremos las preguntas y respuestas 

// Obtenemos las preguntas de la API 
const getQuestions = async () => {
    try{
        let questionsUrl = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
        let questionsJson = await questionsUrl.json()
        questionsArray = questionsJson.results //nos devuelve un array con 10 preguntas. 
        let arrayQuestions =  []
        let arrayBadAnswers =  []
        let arrayGoodAnswers =  []
        for (let i = 0; i< questionsArray.length; i++){ 
            arrayQuestions.push(questionsArray[i].question)
            arrayBadAnswers.push(questionsArray[i].incorrect_answers)
            arrayGoodAnswers.push(questionsArray[i].correct_answer)
        }
        //obtenemos un array de 10 con sus preguntas, respuestas incorrecta y respuestas correcta con el que crearemos un Objeto allData
        allData = { 
            TheQuestion: arrayQuestions,
            TheBadAnswers: arrayBadAnswers,
            TheGoodAnswer: arrayGoodAnswers
        }
        console.log(allData)
    }
    catch (error) {
        console.log("we had an error obtaining the data")
    }
}

//Declaramos las variables para igualar a la pregunta, respuesta correcta e incorrectas 
let myQuestion 
let myBadAnswers 
let myGoodAnswer
let allTheQuestionData = [] //array de 1 pregunta y sus respuestas 

//questionNumber será el numero de la pregunta donde estemos (es decir, el index del array +1)[0]
const getQuestionData = async (questionNumber) => {
    myQuestion = await allData.TheQuestion[questionNumber]
    myBadAnswers = await allData.TheBadAnswers[questionNumber]
    myGoodAnswer = await allData.TheGoodAnswer[questionNumber]
    allTheQuestionData= await [myQuestion, myBadAnswers, myGoodAnswer]
    console.log(allTheQuestionData)
    return allTheQuestionData // devuelve toda la info necesaria para montar la pantalla de pregunta y respuestas (pregunta, 3 respuestas incorrectas y una correcta)
}

//Iniciamos todas las funciones  anteriormente declaradas y obtenemos los elementos del HTML donde queremos reemplazar el texto de las preguntas obtenidas de la API 
const questionDiv =  document.getElementsByClassName("questionSection")[0];//obtenemos sección donde ira la pregunta  
let questionButton = document.getElementById("submitSection")

//ALEATORIZACION DE LA POSICION DE LAS RESPUESTAS GENERA UN NUMERO ENTRE 1 Y 4 QUE NO SE REPITE.
let arrayRandom = [];

const random4 = ()=>{
    arrayRandom = [];  
    let elNumero
    while(arrayRandom.length < 4){
    elNumero = Math.floor(Math.random() * (5 - 1) +1);
    if(!arrayRandom.includes(elNumero)){
      arrayRandom.push(elNumero);
    }
  }
  console.log(arrayRandom)
}
random4()


// REDECLARO EL VALOR DE LAS RESPUESTAS PARA QUE SIGAN PINTANDOSE DE FORMA ALEATORIA CON EL NEXT
const redeclararRespuestas = () =>{
    respuesta1 = document.getElementById(`answer${arrayRandom[0]}`);
    respuesta2 = document.getElementById(`answer${arrayRandom[1]}`);
    respuesta3 = document.getElementById(`answer${arrayRandom[2]}`);
    respuesta4 = document.getElementById(`answer${arrayRandom[3]}`);
}

// AL PULSAR EL BOTON NEXT SE EJECUTAN VARIAS FUNCIONES
//la funcion startData enviará como parametro en getQuestionData el numero de la siguiente pregunta.
questionButton.addEventListener("click", async()=> {    
    random4();
    redeclararRespuestas();
    startData();
    validaCorrecta();
    botonDesaparece();
    // limite();
    await limite().then(data => data);    
    console.log("CURRENT: "+auth.currentUser.uid)
}) 

//Generamos un num random para pasarle a la pregunta (del 1 al 10)
let getRandomInt
async function getRandomNum(){
    getRandomInt = Math.floor(Math.random() * 10);
 }
 getRandomNum()

//DECLARAMOS CADA UNO DE LOS ELEMENTOS DEL DOM.
let pregunta = document.getElementById("questionText");
let respuesta1 = document.getElementById(`answer${arrayRandom[0]}`)
let respuesta2 = document.getElementById(`answer${arrayRandom[1]}`);
let respuesta3 = document.getElementById(`answer${arrayRandom[2]}`);
let respuesta4 = document.getElementById(`answer${arrayRandom[3]}`);

// Declaro las cajas de las respuestas
let bloque1 = document.getElementById(`option1`)
let bloque2 = document.getElementById(`option2`)
let bloque3 = document.getElementById(`option3`)
let bloque4 = document.getElementById(`option4`)

// INICIAMOS LA ESCRITURA DEL DOM CON LOS DATOS DE LA API
async function startData(){
    await getQuestions() 
    await getQuestionData(getRandomInt) 
    pregunta.innerHTML = await myQuestion
    respuesta1.innerHTML = await myBadAnswers[0];
    respuesta2.innerHTML = await myBadAnswers[1];
    respuesta3.innerHTML = await myBadAnswers[2];
    respuesta4.innerHTML = await myGoodAnswer;
    console.log(`La respuesta correcta es---->   ${myGoodAnswer}`);
}
await startData()

//  VALIDACION SELECCION DE RESPUESTA QUE ESTABLECE EL BOOLEANO CON CADA RESPUESTA SELECCIONADA
let correcta = null;

const esCorrecta = (p) => {
    let respuesta = document.querySelector(`#${p} p`).innerHTML;
    if(myGoodAnswer == respuesta){
        correcta = true;
    }else {
        correcta = false;
    }
    console.log(correcta);
}

// AL PULSAR NEXT COMPARAMOS EL BOOLEANO CORRECTA PARA AUMENTAR PUNTUACION Y PONER UN MENSAJE DE CORRECTO O INCORRECTO
let puntuacion = 0;
let preguntasCompletadas = 0

const validaCorrecta =  () => {
    if(correcta == true) {
        alert("GOOD ONE! You have win +1 point!!!");
        puntuacion++
    } else {
        alert(`SORRY. Not this time :(!! The correct answer was: ${myGoodAnswer}`);

    }
    console.log("El estado de correcta es---> " + correcta);
    correcta = null;
    preguntasCompletadas++;
    console.log(`Completed questions: ${preguntasCompletadas}`);
    console.log(`User Score: --> ${puntuacion}`);
}


// FUNCION PARA HACER DESAPARECER EL BOTON DE NEXT SI NO SE HA SELECCIONADO RESPUESTA Y PARA QUE NO CONSERVE LA SELECCION EN LA SIGUIENTE PREGUNTA
const botonDesaparece = () => {
    if(correcta === null) {
        document.getElementById("submitSection").style.display = "none"; 
    }else{
        document.getElementById("submitSection").style.display = "inherit"; 
    }
    bloque1.style.border = "none";
    bloque2.style.border = "none";
    bloque3.style.border = "none";
    bloque4.style.border = "none";  
}
botonDesaparece();

const borderColor = (n) => {
    bloque1.style.border = "none";
    bloque2.style.border = "none";
    bloque3.style.border = "none";
    bloque4.style.border = "none";
    n.style.border = "6px solid black";
}

//Obtenemos el día de hoy 
let quizDate = new Date().toLocaleDateString()
console.log(quizDate)


// AÑADIMOS LOS EVENTOS DE CLICK DE LAS RESPUESTAS.
bloque1.addEventListener("click", ()=>{esCorrecta(bloque1.id), botonDesaparece(), borderColor(bloque1)});
bloque2.addEventListener("click", ()=>{esCorrecta(bloque2.id), botonDesaparece(), borderColor(bloque2)});
bloque3.addEventListener("click", ()=>{esCorrecta(bloque3.id), botonDesaparece(), borderColor(bloque3)});
bloque4.addEventListener("click", ()=>{esCorrecta(bloque4.id), botonDesaparece(), borderColor(bloque4)});


var quizExactTime = new Date()

// LIMITE 10 PREGUNTAS, a la 10 redirigue a resultados.
const limite = async() => {
    if(preguntasCompletadas === 10) {
     let setFirebase = await addDoc(collection(db, 'halloween_quiz', auth.currentUser.uid, "attempts"), {
     goodAnswers: puntuacion,
     date: quizDate,
     createdAt: quizExactTime
    })
    window.location.replace("../pages/results.html")
    }
    }


