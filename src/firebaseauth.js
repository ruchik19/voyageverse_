import { initializeApp } from "firebase/app";
import {
  getFirestore, setDoc, doc
} from 'firebase/firestore'
import{
  getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword
  
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBEFnEiAY2lq8kKq6k5Xbm0oh069zPlt0Q",
  authDomain: "voyageverse-firebase.firebaseapp.com",
  projectId: "voyageverse-firebase",
  storageBucket: "voyageverse-firebase.firebasestorage.app",
  messagingSenderId: "707490646916",
  appId: "1:707490646916:web:f86e062dbb58a4e1432bd1"
};
const app = initializeApp(firebaseConfig);

 function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }
 const signUp=document.getElementById('submitsignup');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('Useremail').value;
    const password=document.getElementById('Userpass').value;
    const userName=document.getElementById('name').value;
    

    const auth=getAuth();
    const db=getFirestore();
    createUserWithEmailAndPassword(auth, email, password)
    .then((cred)=>{
        const user=cred.user;
        const userData={
            email: email,
            Name: userName,
            wishlist: [],
        };
        showMessage('Account Created Successfully', 'signupmsg');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='login.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signupmsg');
        }
        else{
            showMessage('unable to create User', 'signupmsg');
        }
    })
 });

 const logIn=document.getElementById('submitlogin');
 logIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('pass').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'loginmsg');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='homepage.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'loginmsg');
        }
        else{
            showMessage('Account does not Exist', 'loginmsg');
        }
    })
 })


 

