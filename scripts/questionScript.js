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

//Iniciamos las funciones con el boton de NEXT 
let questionButton = document.getElementById("nextButton")
questionButton.addEventListener("click", startData) 
questionButton.addEventListener("click", getRandomNum)
// questionButton.addEventListener("click", validateAnswer)

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
async function startData(){
    await getQuestions() 
    await getQuestionData(getRandomInt) 
    document.getElementById("questionText").innerHTML = await myQuestion
    document.getElementById(`answerlabel${randomNumber(4)}`).innerHTML = await myBadAnswers[0];
    document.getElementById(`answerlabel${randomNumber(4)}`).innerHTML = await myBadAnswers[1];
    document.getElementById(`answerlabel${randomNumber(4)}`).innerHTML = await myBadAnswers[2];
    document.getElementById(`answerlabel${randomNumber(4)}`).innerHTML = await myGoodAnswer;
    console.log ("Good answer:  " + myGoodAnswer)
}

 await startData()


//  VALIDACION DE RESPUESTAS 
let goodAnswerValidation //variable donde se guardara la pregunta correcta 

//  Validamos las respuestas y guardamos el total de respuestas buenas en un acumulador 
// function validateAnswer(event) {
//     event.preventDefault() // permite que el form no se recargue 
//     let getAnswers= document.querySelectorAll('input[type="radio"]:checked')
//     let getAnswersTwo = document.getElementsByTagName("INPUT")
//     let getAnswersThree = document.getElementsByTagName("INPUT").checked
//             if (getAnswersTwo.length > 0) {
//                 console.log("Not answered");
//                 console.log(getAnswers)
//                 console.log(getAnswers.label)
//                 console.log(getAnswersTwo)
//                 console.log(getAnswersTwo.label)
//                 console.log(getAnswersThree)
//                 console.log(getAnswersThree.label)
//             }
//             else if (getAnswers.value === myGoodAnswer){
//                 console.log("Good One! Thats awsome");
//             }
//             else {
//                 console.log("Maybe next time");
//             }
// }

function displayRadioValue() {
    var ele = document.getElementsByTagName("radio");
    var eleTwo = document.getElementsByTagName("label");

    console.log(ele)
    console.log(eleTwo.value)


    for(let i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        console.log(ele[i].value)
    }
}
displayRadioValue()

