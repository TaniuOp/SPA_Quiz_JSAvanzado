// FIREBASE - FIRESTORE para guardar puntuacion de usuario asociado al user UID

//Inicializamos Firebase 

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { collection, getFirestore, setDoc, addDoc, doc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js"
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
//using onAuthStateChanged() to set an observer you "ensure that the Auth object isn't in an intermediate state—such as initialization—when you get the current user"

const auth = getAuth();
let userUid 

onAuthStateChanged(auth, (user) => {
  if (user) {
    userUid = user.uid;
    console.log("Current User UID:" + userUid);
    // setUserUid(userUid);
    return userUid
  } else {
    window.alert("You need to be logged in to play!");
    location.href = "/index.html";
  }
});

// PREGUNTAS 

let allData={} // variable donde meteremos el objeto 

// Obtenemos las preguntas de la API 
let questionsArray=[];
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
        //obtenemos un array con sus preguntas, respuestas incorrecta y respuestas correcta 
        allData = { 
            TheQuestion: arrayQuestions,
            TheBadAnswers: arrayBadAnswers,
            TheGoodAnswer: arrayGoodAnswers
        }
        console.log(allData)
        return allData
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
    return allTheQuestionData 
    // devuelve toda la info necesaria para montar la pantalla de pregunta y respuestas (pregunta, 3 respuestas incorrectas y una correcta)
}

//Iniciamos todas las funciones  anteriormente declaradas y obtenemos los elementos del HTML donde queremos reemplazar el texto de las preguntas obtenidas de la API 
const questionDiv =  document.getElementsByClassName("questionSection")[0];//obtenemos sección donde ira la pregunta  
let questionButton = document.getElementById("submitSection")

// AL PULSAR EL BOTON NEXT SE EJECUTAN VARIAS FUNCIONES
 questionButton.addEventListener("click", async ()=> {    
    startData();
    validaCorrecta();
    botonDesaparece();
    await limite().then(data => data);    
    console.log("CURRENT: "+auth.currentUser.uid)
}) 

//Generamos un num random para pasarle a la pregunta (del 1 al 10)
let getRandomInt
async function getRandomNum(){
    getRandomInt = Math.floor(Math.random() * 10);
 }
 getRandomNum()

 // array desordenado de 0 a 3 y el resultado lo uso en answerlabel (nos aseguramos que no se repite)
let randomNumber = (max) => {
    return Math.floor(Math.random() * max) + 1;
}


//la funcion startData se llamara con el botón de "Siguiente" y enviará como parametro en getQuestionData el numero de la siguiente pregunta 
//DECLARAMOS CADA UNO DE LOS ELEMENTOS DEL DOM.
let pregunta = document.getElementById("questionText");
let respuesta1 = document.getElementById(`answer1`);
let respuesta2 = document.getElementById(`answer2`);
let respuesta3 = document.getElementById(`answer3`);
let respuesta4 = document.getElementById(`answer4`);

// Declaro las cajas de las respuestas
const bloque1 = document.getElementById("optionone")
const bloque2 = document.getElementById("optiontwo")
const bloque3 = document.getElementById("optionthree")
const bloque4 = document.getElementById("optionfour")


async function startData(){
    await getQuestions() 
    await getQuestionData(getRandomInt) 

    pregunta.innerHTML = await myQuestion
    respuesta1.innerHTML = await myBadAnswers[0];
    respuesta2.innerHTML = await myBadAnswers[1];
    respuesta3.innerHTML = await myBadAnswers[2];
    respuesta4.innerHTML = await myGoodAnswer;
}

 await startData()

//  VALIDACION SELECCION DE RESPUESTA QUE ESTABLECE EL BOOLEANO CON CADA RESPUESTA SELECCIONADA
let correcta = null;

const esCorrecta = (p) => {
    if(myGoodAnswer == p){
        correcta = true;
    }else {
        correcta = false;
    }
    console.log(correcta);
}

bloque1.addEventListener("click", ()=>{esCorrecta(respuesta1.textContent), botonDesaparece(), borderColor(optionone)});
bloque2.addEventListener("click", ()=>{esCorrecta(respuesta2.textContent), botonDesaparece(), borderColor(optiontwo)});
bloque3.addEventListener("click", ()=>{esCorrecta(respuesta3.textContent), botonDesaparece(), borderColor(optionthree)});
bloque4.addEventListener("click", ()=>{esCorrecta(respuesta4.textContent), botonDesaparece(), borderColor(optionfour)});

// AL PULSAR NEXT COMPARAMOS EL BOOLEANO CORRECTA PARA AUMENTAR PUNTUACION Y PONER UN MENSAJE DE CORRECTO O INCORRECTO
let puntuacion = 0;
let preguntasCompletadas = 0

const validaCorrecta =  () => {
    if(correcta == true) {
        alert("GOOD ONE! You have win +1 point!!!");
        puntuacion++
    } else {
        alert("SORRY. Not this time :(!!!")
    }
    console.log("El estado de correcta es---> " + correcta)
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

// LIMITE 10 PREGUNTAS, a la 10 redirigue a resultados.
const limite = async() => {
    if(preguntasCompletadas === 3) {
     let setFirebase = await addDoc(collection(db, 'halloween_quiz', auth.currentUser.uid, "attempts"), {
     goodAnswers: puntuacion,
     date: quizDate,
    // created: Timestamp
    })
    window.location.replace("../pages/results.html")
    }
    }


