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
questionButton.addEventListener("click", ()=> {
    startData();
    validaCorrecta();
    botonDesaparece();    
}) 
// questionButton.addEventListener("click", getRandomNum)
//Añadimos las funciones a llamar desde el boton de NEXT

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

//  VALIDACION SELECCION DE RESPUESTA

let correcta = null;

const esCorrecta = (p) => {
    if(myGoodAnswer == p){
        correcta = true;
    }else {
        correcta = false;
    }
    console.log(correcta);
    console.log(p);

}

respuesta1.addEventListener("click", ()=>{esCorrecta(respuesta1.textContent), botonDesaparece()});
respuesta2.addEventListener("click", ()=>{esCorrecta(respuesta2.textContent), botonDesaparece()});
respuesta3.addEventListener("click", ()=>{esCorrecta(respuesta3.textContent), botonDesaparece()});
respuesta4.addEventListener("click", ()=>{esCorrecta(respuesta4.textContent), botonDesaparece()});

// VALIDACION RESPUESTA CORRECTA Y PUNTUACION
let puntuacion = 0;
let preguntasCompletadas = 0


const botonDesaparece = () => {
    if(correcta === null) {
        document.getElementById("submitSection").style.display = "none"; 
    }else{
        document.getElementById("submitSection").style.display = "inherit"; 
    }
}
botonDesaparece();

const validaCorrecta =  () => {
    if(correcta == true) {
        alert("GOOD ONE! You have win +1 point");
        puntuacion++
    } else {
        alert("SORRY. Not this time :( ")
    }
    console.log("ESTE ES EL ESTADO DE CORRECTA     " + correcta)
    preguntasCompletadas++;
    correcta = null;
    console.log(puntuacion);
    console.log(preguntasCompletadas);
}


// LIMITE 10 PREGUNTAS en desarrollo ^^
// const enlace = "<a href="./resultScript.js">"

// const limite = () => {
//     if(preguntasCompletadas = 10) {
//         document.getElementById("submitSection").appendChild(<a href="#">);
//     }
// }




//Enviar datos al Firebase 

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getFirestore, setDoc, doc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js"
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";


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

//using onAuthStateChanged() to set an observer you "ensure that the Auth object isn't in an intermediate state—such as initialization—when you get the current user"
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userUid = user.uid;
    // const userMail = user.email;
    // console.log(userUid, userMail)
    setUserUid(userUid);
  } else {
    window.alert("You need to be logged in to play!");
    location.href = "/index.html";
  }
});

// Si es la primra vez que se hace quiz se setea al usuario sino se guarda mas datos en el userUid

if ( ){
    await setDoc(doc(db, "userUid", "attempt4"), {
  goodAnswers: 3,
  date: 10,
});
}


// la siguiente vez que hace quiz 
let currentUserUid 
let setUserUid = (userUid) => {
    let currentUserUid = userUid
    console.log("user UID: " + userUid)
    setDoc(doc(db, userUid), {
        goodAnswers: 3,
        date: 10,
      });
}

// Enviamos las respuestas correctas al UID del user 


  //Falta poner el UID dinamico del usuario 




// const cityRef = doc(db, 'cities', 'BJ');
//     setDoc(cityRef, { capital: true }, { merge: true });

// const docData = {
//     stringExample: "Hello world!",
//     booleanExample: true,
//     numberExample: 3.14159265,
//     dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
//     arrayExample: [5, true, "hello"],
//     nullExample: null,
//     objectExample: {
//         a: 5,
//         b: {
//             nested: "foo"
//         }
//     }
// };
// await setDoc(doc(db, "data", "one"), docData);