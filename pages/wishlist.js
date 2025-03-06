import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import {getFirestore,  doc, onSnapshot, updateDoc} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
const firebaseConfig = {
    apiKey: "AIzaSyBEFnEiAY2lq8kKq6k5Xbm0oh069zPlt0Q",
    authDomain: "voyageverse-firebase.firebaseapp.com",
    projectId: "voyageverse-firebase",
    storageBucket: "voyageverse-firebase.firebasestorage.app",
    messagingSenderId: "707490646916",
    appId: "1:707490646916:web:f86e062dbb58a4e1432bd1"
};
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db=getFirestore();
const dest = document.querySelectorAll(".dest-wrapper");
const del = document.querySelectorAll(".wishlist");
const empty = document.querySelector(".if-empty");
const home = document.querySelector(".home")
home.addEventListener("click", () => {
    window.location.href = 'homepage.html';
})

const loggedInUserId=localStorage.getItem('loggedInUserId');
if(loggedInUserId){
    const docRef = doc(db,"users", loggedInUserId);
    const docunsubcol = onSnapshot(docRef, (doc) => {            
        console.log(doc.data().wishlist, doc.id);
        let wish = doc.data().wishlist;
        console.log(wish);
        if(wish.length == 0){
            empty.style.display="block";
        }
        else{
            wish.forEach((element) => {
                dest.forEach((ele) => {
                    if(ele.getAttribute("id") =="_"+element){
                        empty.style.display = "none";
                        ele.style.display = "flex";
                        
                    }
                })
            });
            del.forEach((val,idx) => {
                let del1 = val.getAttribute("id");
                val.addEventListener("click", () => {
                    dest[idx].style.display="none";
                    const index= wish.indexOf(del1);
                    wish.splice(index,1);
                    console.log(wish);
                    updateDoc(docRef, {
                        wishlist: wish
                        
                    }) 
                })
                
            })

        }
        
        
         
         
    })
}