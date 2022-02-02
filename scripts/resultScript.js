// FIREBASE - FIRESTORE para guardar puntuacion de usuario asociado al user UID
'use strict';

//Inicializamos Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js';
import {
  collection,
  getFirestore,
  getDocs,
  query,
} from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js';
import {
  getAuth,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js';

// Datos de nuestro proyecto
const firebaseConfig = {
  apiKey: 'AIzaSyA7vjJIZJFdHdQLG77I3Uch_8f8mzhzqLs',
  authDomain: 'quizztaniuruben.firebaseapp.com',
  projectId: 'quizztaniuruben',
  storageBucket: 'quizztaniuruben.appspot.com',
  messagingSenderId: '692644756869',
  appId: '1:692644756869:web:be9d16807787b8e5df98ec',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

let points = [];
let dates = [];
// Leemos la colección completa para obtener datos que meteremos en grafica

onAuthStateChanged(auth, async (user) => {
  if (user) {
    let userUid = user.uid;
    console.log('Current User UID:' + userUid);

    const getCollection = collection(db, 'halloween_quiz', userUid, 'attempts');
    console.log(getCollection);

    // Metemos la data de Firebase en un Array que podamos usar en la grafica
    const querySnapshot = await getDocs(getCollection);
    console.log(querySnapshot);

    querySnapshot.forEach((doc) => {
      points.push(doc.data().goodAnswers);
      dates.push(doc.data().date.toString());
    });
    console.log(points, dates.sort());
    paintRankingGraphic(dates, points);

    //Obtenemos la media de todos los quiz
    let sum = points.reduce((previous, current) => (current += previous));
    let avg = sum / points.length;
    console.log(avg);
    let getMoreInfoSection = document.getElementById('moreInfo');
    getMoreInfoSection.innerHTML =
      'Your current media is ' + avg.toFixed(2) + ' points';

    // Ultima jugada
    let lastResults = document.getElementById('myLastResult');
    lastResults.innerText = points[points.length - 1] + '/10';
  } else {
    alert('You need to be logged in to play!');
    location.href = '/index.html';
  }
});

// // Metemos los datos a la Grafica
const paintRankingGraphic = (dates, points) => {
  let data = {
    labels: dates,
    series: [points],
  };

  // Responsive de las lineas de la gráfica
  let options = {
    seriesBarDistance: 15,
    axisY: { onlyInteger: true },
  };

  let responsiveOptions = [
    [
      'screen and (max-width: 640px)',
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ];
  new Chartist.Line('#chart2', data, options, responsiveOptions);
};

const AudioAplausos = document.getElementById('musicaFondo');
AudioAplausos.volume = 0.4;
AudioAplausos.play();
