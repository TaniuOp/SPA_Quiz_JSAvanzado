import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getFirestore, doc, collection, getDoc, getDocs, query } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js"

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

// Leemos una colección de Firebase 
const q = query(collection(db, "ranking"));
let rankingURL;
let graphicDate=[];
let graphicPoints=[];

const querySnapshot = await getDocs(q);

querySnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
    rankingURL = doc.data()
    console.log(rankingURL)
    graphicDate.push(rankingURL.date)
    graphicPoints.push(rankingURL.goodAnswers)
});

const paintRankingGraphic = (dates, points) => {
    let data = {
        labels: points,
        series: [dates]
    };

let options = {
    seriesBarDistance: 10
  };
  
  let responsiveOptions = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];
  new Chartist.Line('#chart2', data, options, responsiveOptions); 
}
paintRankingGraphic(graphicDate, graphicPoints)
console.log(graphicDate, graphicPoints)


