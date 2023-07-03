import { initializeApp } from 'firebase/app';
import { getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0XcZ5Xkzvs9AX77hLAiYIv2F3n4c8aog",
    authDomain: "crwn-clothing-db-e8d46.firebaseapp.com",
    projectId: "crwn-clothing-db-e8d46",
    storageBucket: "crwn-clothing-db-e8d46.appspot.com",
    messagingSenderId: "1019726246703",
    appId: "1:1019726246703:web:466bad90dc636801c6e7da"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup= ()=> signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth,additionalInformation={})=>{
    const userDocRef = doc(db,'users',userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email }= userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email|| !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email|| !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};