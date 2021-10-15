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
const getQuestionData = async (questionNumber) => {
    let myQuestion = await allData.TheQuestion[questionNumber]
    let myBadAnswers = await allData.TheBadAnswers[questionNumber]
    let myGoodQuestion = await allData.TheGoodAnswer[questionNumber]
    let allTheQuestionData= [myQuestion, myBadAnswers, myGoodQuestion]
    console.log(allTheQuestionData)
    return allTheQuestionData // devuelve toda la info necesaria para montar la pantalla de pregunta y respuestas (pregunta, 3 respuestas incorrectas y una correcta)
}

async function startData(){
    await getQuestions() 
    await getQuestionData(6) //este num si lo cambiamos dinamicamente envía la pregunta del array que corresponde con su idex 
}
startData() //iniciamos las funciones anteriormente declaradas 

//ideal sería que la funcion getQuestionData se llamara con el botón de "Siguiente" y enviará como parametro el numero de la siguiente pregunta 



