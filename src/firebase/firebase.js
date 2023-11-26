import app from 'firebase/compat/app'
import firebaseConfig from './config'
import 'firebase/compat/firestore'
import 'firebase/auth'

class Firebase {
    constructor(){
        if(!app.apps.length){
            app.initializeApp (firebaseConfig)
        }
        this.database = app.firestore()
       
    }
}

const firebase = new Firebase()
export default firebase;