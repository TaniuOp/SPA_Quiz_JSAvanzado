import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, doc, query } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js"
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


// // Obtén el perfil de un usuario
const auth = getAuth();
const user = auth.currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const uid = user.uid;
  console.log("user UID: " + uid)
}

// Leemos registro de ultima partida (actual) 
const docRefs = doc(db, "userUid", "attempt4");
const docSnap = await getDoc(docRefs);
if (docSnap.exists()) {
  console.log("Current Score:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

// Leemos la colección completa para obtener datos que meteremos en grafica 

const q = query(collection(db, "userUid"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});


// Metemos la data de Firebase en un Array que podamos usar en la grafica 

// Metemos los datos a la Grafica 
const paintRankingGraphic = (dates, points) => {
    let data = {
        labels: points,
        series: [dates]
    };

let options = {
    seriesBarDistance: 15,
      width: 450,
      height: 250,
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


