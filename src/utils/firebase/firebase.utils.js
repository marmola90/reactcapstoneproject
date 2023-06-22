import { initializeApp } from 'firebase/app';
import { getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider, } from 'firebase/auth';

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup= ()=> signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth)=>{
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
                createAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
};