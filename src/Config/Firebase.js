
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore,collection, addDoc ,getDocs  } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD5n1i4KR5AQNbIQkvs8BePNazeM9yiUZI",
  authDomain: "reactnativeapp-f93a4.firebaseapp.com",
  projectId: "reactnativeapp-f93a4",
  storageBucket: "reactnativeapp-f93a4.appspot.com",
  messagingSenderId: "647327194122",
  appId: "1:647327194122:web:caf38e9837011b091fd3f3",
  measurementId: "G-JBTX2CCNRR"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// ________________________________________________//
export async function SignUpPage (userInfo) {
    
  try{
    const {email, password,first, last, country,} =userInfo
  
    await createUserWithEmailAndPassword(auth, email, password,)
    
    await addDoc(collection(db, "hammadUsers"),{

      first, last, country, email, 
    })


    alert("theek hai")
    return true

  }catch (e) {
    alert(e.message)
    throw e;
  }
}
// ___________________________________________________________--

export async function signIn (useInfo) {
   try{
 
    const {email, password} = useInfo
    await signInWithEmailAndPassword(auth, email, password)

    alert("your are successfully login brother/madam")
    return true;
   }catch(e){
    alert(e.message)
    throw e;
   }
}
// _________________________________________________________________

export async function rideRequest (ride) {
  await addDoc(collection(db, "Rides"),{
   
    ride
    
  })
}



export async function getRideHistory () {
  const querySnapshot = await getDocs(collection(db, "Rides"));

  const Rider = []

  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  
  const hist = doc.data()
  hist.id = doc.id

  Rider.push(hist)

});
 return Rider
}