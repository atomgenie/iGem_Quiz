import { initializeApp, firestore, auth } from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import { setUserId } from "helpers/redux/data/data.actions"
import { store } from "helpers/redux/store"

const firebaseConfig = {
    apiKey: "AIzaSyBeqwW3gu986ZT0Nel5kFAX_p6fFXi-VNA",
    authDomain: "igem-quiz.firebaseapp.com",
    databaseURL: "https://igem-quiz.firebaseio.com",
    projectId: "igem-quiz",
    storageBucket: "igem-quiz.appspot.com",
    messagingSenderId: "1055798679629",
    appId: "1:1055798679629:web:d352afe0c003a0c10de404",
    measurementId: "G-NB2F956RKH",
}

export type Firestore = firestore.Firestore
export type CollectionReference<
    T = firestore.DocumentData
> = firestore.CollectionReference<T>

class FirebaseHelper {
    public initializeFirebase() {
        initializeApp(firebaseConfig)
        auth().signInAnonymously()

        auth().onAuthStateChanged(user => {
            if (user) {
                store.dispatch(setUserId(user.uid))
            } else {
                store.dispatch(setUserId(undefined))
            }
        })
    }

    private database: firestore.Firestore | undefined = undefined

    public get db(): firestore.Firestore {
        return this.database || firestore()
    }
}

export const firebaseHelper = new FirebaseHelper()
