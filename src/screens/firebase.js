import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, get, onValue } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Importar Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyCL75e3y4pO4siCi3N_jjBDUmLrvFhsba8",
    authDomain: "atrativo-social.firebaseapp.com",
    projectId: "atrativo-social",
    storageBucket: "atrativo-social.appspot.com",
    messagingSenderId: "147961984705",
    appId: "1:147961984705:web:38893f9ea008de50328640",
    measurementId: "G-F09PQ0D4R1",
    databaseURL: "https://atrativo-social-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app); // Inicializar Firebase Storage

export { auth, database, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword, ref, set, get, onValue };
