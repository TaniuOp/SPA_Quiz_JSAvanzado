//Creamos variable para indicar el elemento donde irá la pregunta 
const questionDiv =  document.getElementsByClassName("questionSection")[0];

// Obtenemos las preguntas de la API 
let questionsArray;
const getQuestions = async () => {
    try{
        let questionsUrl = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
        let questionsJson = await questionsUrl.json()
        questionsArray= questionsJson.results
        console.log (questionsArray)
        return questionsArray //nos devuelve un array con 10 preguntas. Debemos obtener data "question"
    }
    catch (error) {
        console.log("we had an error obtaining the data")
    }
}
getQuestions() 
.then((data)=> console.log(data))
// mapear cada pregunta, en c/u iteracción. Crear elemento "pregunta" . Sigu. iteracc, elimino nodos y pongo nuevos (.map)

// const getQuestionData = () => {
//     questionsArray.map(async(element) => {  //usando map se puede evitar el for 
//         let question = await element.question //accedo a la data dentro del elemento 
//         // let allQuestion= await [question]    
//         console.log(question)        //metemos la question en el h3 
//     })
//     return question
//     }
// getQuestionData()

// Imprime la pregunta en el HTML
// async function showQuestion(){
//     questionTexts.innerText = await questions;
// }
// showQuestion()













    // FIREBASE  
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, setDoc, doc, collection, getDocs, query } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-WeyBkPMXLHw3PDyM_kpQ9OGQ5f-30Cw",
  authDomain: "quizspa-d230e.firebaseapp.com",
  projectId: "quizspa-d230e",
  storageBucket: "quizspa-d230e.appspot.com",
  messagingSenderId: "846878938512",
  appId: "1:846878938512:web:413ff20c7a99d53abf8f15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

await setDoc(doc(db, "Halloween", "User"), {
    name: "Taniu",
    goodQuestions: "3",
    errors: "7"
});
//recoger info de interacción y crear variable (para quiz)
// Firebase QUIZ 
// const q = query(collection(db, "Halloween"));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
// });
