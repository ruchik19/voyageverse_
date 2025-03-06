import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import {getFirestore, getDoc, doc, onSnapshot, updateDoc} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
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
onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedusername').innerText=userData.Name;
                document.getElementById('loggeduseremail').innerText=userData.email;
                
            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
})

const logoutButton=document.getElementById('logout');

logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='login.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
})
const menu = document.querySelector(".menu");
const show = document.querySelector(".loggeduser");
let content = true;
menu.addEventListener("click", () => {
    if(content==true){
        menu.innerHTML = "<i class='fa-solid fa-xmark'></i>"
        show.style.display ="block";
        content = false;
    }
    else {
        menu.innerHTML = "<i class='fa-solid fa-user'></i>"
        show.style.display ="none";
        content = true;
    }
})

let destinfo = [];
const destwrap = document.querySelectorAll(".dest-wrapper");
const container1 = document.querySelector(".container1");
const destopt = document.querySelector(".destinations")
const photo = document.querySelector(".photo");

const searchinput = document.querySelector("[data-search]")
searchinput.addEventListener("input", (e) =>{
    const value = e.target.value.toLowerCase();
    
    destwrap.forEach((el,idx) => {
        const p = el.parentElement.querySelector("p");
        const h2 = el.parentElement.querySelector("h2");
        const india1 = document.querySelector(".india1");
        const india2 = document.querySelector(".india2");
        if(value.length == 0){
            photo.style.display="block";
            destopt.style.display="block";
            container1.style.display="block";
            el.parentElement.style.display = "none";
            el.style.display = "flex";
            p.style.display = "block";
            h2.style.display = "block";
            india1.style.display = "block";
            india2.style.display = "block";
    
    
        }else{
            photo.style.display = "none";
            destopt.style.display="none";
            container1.style.display="none";
            const name = el.getAttribute("id");
            const info = {destname:name};
            destinfo.push(info);
            
            
            if(destinfo[idx].destname.includes(value)){
                el.parentElement.style.display="block";
                el.style.display = "flex";
                p.style.display = "none";
                h2.style.display = "none";
                india1.style.display = "none";
                india2.style.display = "none";
           
                console.log("hello");
            }else{
                // el.parentElement.style.display = "none";
                el.style.display = "none";
            }
        }
        

    })
    
    console.log(value);
})
const next = document.querySelector(".next");
const text = document.querySelector(".text");
let img = "img1";
next.addEventListener("click", () => {
    if(img=="img1"){
        photo.style.backgroundImage = "url(images/bg1.avif)";
        img="img2";
    } else if(img=="img2"){
        photo.style.backgroundImage = "url(images/photo2.avif)";
        text.style.color = "yellow";
        img="img3";
    } else{
        photo.style.backgroundImage = "url(images/bglogin2.webp";
        text.style.color = "white";
        img="img1";
    }
        
})
const trending = document.getElementById("trending");
const topcities = document.getElementById("topcities");
const cultural = document.getElementById("cultural");
const hillstation = document.getElementById("hillstation");
const beach = document.getElementById("beach");
const containerhill = document.querySelector(".hillstation-container");
const containertrend = document.querySelector(".trending-container");
const containertop = document.querySelector(".topcities-container");
const containerisland = document.querySelector(".islands-container");
const containercult = document.querySelector(".cultural-container");

let contentShowhill = true;
let contentShowisland = true;
let contentShowtrend = true;
let contentShowtop = true;
let contentShowcult = true;

trending.addEventListener("click", () => {
    if(contentShowtrend==true){
        trending.innerHTML = "<i class='fa-solid fa-xmark'></i>";
        containertrend.style.display = "block";
        contentShowtrend = false;
    }
    else{
        trending.innerText = "Trending Destinations";
        containertrend.style.display = "none";
        contentShowtrend = true;


    }
})
topcities.addEventListener("click", () => {
    if(contentShowtop==true){
        topcities.innerHTML = "<i class='fa-solid fa-xmark'></i>";
        containertop.style.display = "block";
        contentShowtop = false;
    }
    else{
        topcities.innerText = "Top Cities";
        containertop.style.display = "none";
        contentShowtop = true;
    }
})
cultural.addEventListener("click", () => {
    if(contentShowcult){
        cultural.innerHTML = "<i class='fa-solid fa-xmark'></i>";
        containercult.style.display = "block";
        contentShowcult = false;
    }
    else{
        cultural.innerText = "cultural destinations";
        containercult.style.display = "none";
        contentShowcult = true;
    }
})
hillstation.addEventListener("click", () => {
    if(contentShowhill){
        hillstation.innerHTML = "<i class='fa-solid fa-xmark'></i>";
        containerhill.style.display = "block";
        contentShowhill = false;
    }
    else{
        hillstation.innerText = "Hill Stations";
        containerhill.style.display = "none";
        contentShowhill = true;
    }
    
})
beach.addEventListener("click", () => {
    if(contentShowisland){
        beach.innerHTML = "<i class='fa-solid fa-xmark'></i>"
        containerisland.style.display = "block";
        contentShowisland = false;
    }
    else{
        beach.innerText = "Beachy vibes"
        containerisland.style.display = "none";
        contentShowisland = true;
    }
    
})



let wishlist = document.querySelectorAll(".wishlist");
const loggedInUserId=localStorage.getItem('loggedInUserId');
if(loggedInUserId){
    const docRef = doc(db,"users", loggedInUserId);
    const docunsubcol = onSnapshot(docRef, (doc) => {            
        console.log(doc.data().wishlist, doc.id);
        let wish = doc.data().wishlist;
        
       
        wishlist.forEach((el) => {
            let add = true;
            const added = el.getAttribute("id");
            for(let place of wish){
                if(added==place){
                    el.style.backgroundColor = "white";
                    el.innerHTML="<i class='fa-solid fa-heart' style='font-size: 18px; padding-left: 0; color: red;'></i>";
                    add = false;
                }
            }
            
            el.addEventListener("click", (e) => {
                e.preventDefault();
                if(add==true){
                    console.log(el.parentElement);
                    const nameplace = el.getAttribute("id");
                    wish.push(nameplace);
                    console.log(wish);
                    el.style.backgroundColor = "white";
                    el.innerHTML="<i class='fa-solid fa-heart' style='font-size: 18px; padding-left: 0; color: red;'></i>";

                    add = false;
                }
                else{
                    console.log(el);
                    const nameplace = el.getAttribute("id");
                    const index = wish.indexOf(nameplace);
                    wish.splice(index,1);
                    console.log(wish);
                    el.style.backgroundColor = "cadetblue";
                    el.innerHTML="<i class='fa-solid fa-heart' style='font-size: 18px; padding-left: 0; color: aliceblue;'></i> Save to wishlist";
                    add = true;
                }
                updateDoc(docRef, {
                    wishlist: wish
                
                  })
                })      
            })
        })
        
}     

