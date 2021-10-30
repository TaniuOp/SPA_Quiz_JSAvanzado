import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getFirestore, collection, getDocs, query } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";


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
const q = query(collection(db, "user1"));
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

const auth = getAuth();
const user = auth.currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
}


// Metemos los datos a la Grafica 
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


