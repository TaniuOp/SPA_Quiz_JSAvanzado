// LOGIN FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyA7vjJIZJFdHdQLG77I3Uch_8f8mzhzqLs",
    authDomain: "quizztaniuruben.firebaseapp.com",
    projectId: "quizztaniuruben",
    storageBucket: "quizztaniuruben.appspot.com",
    messagingSenderId: "692644756869",
    appId: "1:692644756869:web:be9d16807787b8e5df98ec"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// CREAR USUARIO

document.getElementById("buttonSubmit").addEventListener("click",()=>{
    let email = document.getElementById("rUsuario").value
    let password = document.getElementById("rPassword").value
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("Creado correctamente")
        registroToLogin();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
    });
    
})

// LOGIN
let estasLogin = false;
let enlace = document.getElementById("enlace")

document.getElementById("buttonLogin").addEventListener("click",()=>{
    let email = document.getElementById("lUsuario").value
    let password = document.getElementById("lPassword").value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login CORRECTO");
        cambioLuz();
        outBoton(); 
        estasLogin = true;
        enlace.href = "./pages/question.html";
        

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
    });
})

// SIGN OUT
document.getElementById("buttonLoginOut").addEventListener("click", ()=>{
    signOut(auth).then(() => {
      console.log("Ya NO estas logeado");
      formDisplay();
      document.getElementById("rojoverde").src = "./assets/red_login.png";


    }).catch((error) => {
        console.log("Erroooooor")
    });

})

//CAMBIO DEL COLOR DE LOGIN, Y DESAPARECEN LOS FORMULARIOS CUANDO ESTAS LOGEADO.
let registroForm = document.getElementById("divRegister");
let loginForm = document.getElementById("divLogin");
let loginOut = document.getElementById("out");
let elLogo = document.getElementById("logo");

let pregunta = document.getElementById("pregunta");

const cambioLuz = () => {
        document.getElementById("rojoverde").src = "./assets/green_login.png";
        registroForm.style.display = "none";
        loginForm.style.display = "none";
}

const formDisplay = () => {
    registroForm.style.display = "inherit";
    loginForm.style.display = "inherit";
}
// FUNCION DE AVISO SI NO ESTAS LOGEADO NO PUEDES EMPEZAR EL QUIZZ Y TE SALE UN AVISO.
const aviso = () => {
    if(estasLogin == false){
        alert("Porfavor registrate y logeate para iniciar el Quizz");
    }
}

document.getElementById("logo").addEventListener("click", aviso);  

// BIENVENIDO ES TU PRIMERA VEZ
let si = document.getElementById("si")
let no = document.getElementById("no")

const siLoEs = () => {
    registroForm.style.display = "inherit";
    pregunta.style.display = "none";
    elLogo.style.width = "35vw"
    elLogo.style.zIndex = "0" 
}

const noLoEs = () => {
    loginForm.style.display = "inherit";
    pregunta.style.display = "none";
    elLogo.style.width = "35vw"
    elLogo.style.zIndex = "0" 
}

si.addEventListener("click", siLoEs); 
no.addEventListener("click", noLoEs);

// SI ESTAS LOGIN APARECE EL BOTON LOGIN OUT
const outBoton = () => {
    loginOut.style.display = "inherit";
} 

//SI TE REGISTRAS, DESAPARECE EL REGISTRO Y APARECE EL LOGEO
const registroToLogin = () => {
    registroForm.style.display = "none";
    loginForm.style.display = "inherit";
}