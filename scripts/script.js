//Creamos variable para indicar el elemento donde irá la pregunta 
const questionDiv =  document.getElementsByClassName("questionSection")[0];
let allData={}
// Obtenemos las preguntas de la API 
let questionsArray=[];
const getQuestions = async () => {
    try{
        let questionsUrl = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
        let questionsJson = await questionsUrl.json()
        questionsArray= questionsJson.results //nos devuelve un array con 10 preguntas. 
        let arrayQuestions =  []
        let arrayBadAnswers =  []
        let arrayGoodAnswers =  []
        for (let i = 0; i< questionsArray.length; i++){ 
            arrayQuestions.push(questionsArray[i].question)
            arrayBadAnswers.push(questionsArray[i].incorrect_answers)
            arrayGoodAnswers.push(questionsArray[i].correct_answer)
        }
        //obtenemos un objeto con su pregunta, respuesta incorrecta y respuesta correcta 
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

//questionNumber será el numero de la pregunta donde estemos (es decir, el index del array +1)[0]
let myQuestion 
let myBadAnswers 
let myGoodAnswer
let allTheQuestionData = []

const getQuestionData = async (questionNumber) => {
    myQuestion = await allData.TheQuestion[questionNumber]
    myBadAnswers = await allData.TheBadAnswers[questionNumber]
    myGoodAnswer = await allData.TheGoodAnswer[questionNumber]
    allTheQuestionData= [myQuestion, myBadAnswers, myGoodAnswer]
    console.log(allTheQuestionData)
    return allTheQuestionData // devuelve toda la info necesaria para montar la pantalla de pregunta y respuestas (pregunta, 3 respuestas incorrectas y una correcta)
}

//Generamos un num random para pasarle a la pregunta (del 1 al 10)
var getRandomInt = Math.floor(Math.random() * 10);
console.log(getRandomInt)

//Iniciamos todas las funciones  anteriormente declaradas y obtenemos los elementos del HTML donde queremos reemplazar el texto de las preguntas obtenidas de la API 
let questionButton = document.getElementById("nextButton")
questionButton.addEventListener("click", startData)

async function startData(){
    await getQuestions() 
    await getQuestionData(getRandomInt) 
    document.getElementById("questionText").textContent = await myQuestion
    document.getElementById("optiononeLabel").textContent = await myBadAnswers[0];
    document.getElementById("optiontwoLabel").textContent = await myBadAnswers[1];
    document.getElementById("optionthreeLabel").textContent = await myBadAnswers[2];
    document.getElementById("optionfourLabel").textContent = await myGoodAnswer;
}

//la funcion getQuestionData se llamara con el botón de "Siguiente" y enviará como parametro el numero de la siguiente pregunta 
//To do: Que el orden de las respuestas sea random para que no quede siempre la correcta en la 4rta 



