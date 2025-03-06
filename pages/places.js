import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import {getFirestore,collection, onSnapshot, addDoc} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
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
const colRef = collection(db,'reviews');


const reviewsContainer = document.getElementById('reviews-container');
const reviewTitleInput = document.getElementById('user-name');
const reviewTextInput = document.getElementById('review-text');
const imageUpload = document.getElementById('image-upload');
const submitButton = document.getElementById('submit-review');
const reviewDestination = document.getElementById('user-destination');
const destname = document.querySelector(".heading");
const allstar = document.querySelectorAll('.rating .star');
const resultgallery = document.querySelector('.gallery-container');

const weather = document.querySelector('.box1');
const currency = document.querySelector('.box2');
const wishlist = document.querySelector('.box3');

let accesskey = "Nm6Y5-0tTiY2sxDH4wVsdFS0xCfSVkEx9Fzi5bjFzEI"
const perpage = 12
const url = `https://api.unsplash.com/search/photos?page=1&query=${destname.getAttribute("id")}&client_id=${accesskey}&per_page=${perpage}`
console.log(url)
async function showresults(){
    let response = await fetch(url)
    let data = await response.json()
    let images = data.results
    images.map((imgurl)=> {
        let imag = document.createElement('img');;
        imag.src = imgurl.urls.small;
        let imglink = document.createElement('a')
        imglink.href = imgurl.links.html;
        imglink.target="_blank";

        imglink.appendChild(imag);
        resultgallery.appendChild(imglink);
    })
}
showresults()
weather.addEventListener("click", () => {
    window.location.href= "weather.html";

})
currency.addEventListener("click", () => {
    window.location.href = 'currency.html'
})
wishlist.addEventListener("click", () => {
    window.location.href= 'wishlist.html'
})

let rating = "";
allstar.forEach((star, idx) => {
    star.addEventListener('click', () => {
        allstar.forEach(i => {
            i.classList.replace('fa-solid', 'fa-regular')
        })
        for(let i=0; i<=allstar.length; i++){
            if(i<=idx){
                allstar[i].classList.replace('fa-regular', 'fa-solid')
                rating = i+1;
            }
        }
        const rate = document.querySelectorAll(".rating .fa-solid");
        rating = rate.length ;
        console.log(rating);

    })

})


const CLOUDINARY_CLOUD_NAME = 'dpzubzpzi';
const CLOUDINARY_UPLOAD_PRESET = 'voyageverse';


function displayReviews(reviews) {
    
    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review';
        let imagesHtml = '';
        if (review.imageUrls) {
          
            review.imageUrls.forEach(url => {
                imagesHtml += `<img src="${url}" alt="Review Image">`;
            });
        }
        if(review.place == destname.getAttribute('id')){
            let userrating = ""
            for(let i=1; i<=review.userrating; i++){
                
                userrating += '<i class="fa-solid fa-star"></i>'

            }
            reviewDiv.innerHTML = `<h3>${review.UserName}</h3><div>${userrating}<p>${review.userrating} Stars</p></div><p>${review.text}</p><div class="images">${imagesHtml}</div>`;
            reviewDiv.style.backgroundColor = "lavenderblush"
            reviewsContainer.appendChild(reviewDiv);
        }
        
    });
}



onSnapshot(colRef,(snapshot) => { 
    const reviews = [];
    snapshot.forEach((doc) => {
        reviews.push(doc.data());
    });
   displayReviews(reviews);
});

submitButton.addEventListener('click', () => {
    const nameUser = reviewTitleInput.value;
    const text = reviewTextInput.value;
    const files = imageUpload.files;
    const destination = reviewDestination.value;
    const imageUrls = [];

    if (!nameUser || !text) {

        alert('Please enter a title and review.');
        return;
    }

    if (files.length > 0) {
      
      Promise.all(Array.from(files).map(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        console.log(formData)
        return fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData
        }).then(res => res.json());
      })).then(cloudinaryResponses => {
        cloudinaryResponses.forEach(res => imageUrls.push(res.secure_url));
        console.log(imageUrls);
        
        saveReviewToFirestore(nameUser, text, destination, imageUrls, rating);
      });
    }else {
      saveReviewToFirestore(nameUser, text, destination, rating);
    }
});

function saveReviewToFirestore(nameUser, text, destination, imageUrls = [], rating) {
    addDoc(colRef, {
        UserName: nameUser,
        text: text,
        place: destination,
        userrating : rating,
        imageUrls: imageUrls
    }).then(() => {
        reviewTitleInput.value = '';
        reviewTextInput.value = '';
        reviewDestination.value = '';
        allstar.forEach(i => {
            i.classList.replace('fa-solid', 'fa-regular')
        })
        imageUpload.value = null; 
        alert('Review submitted!');
    }).catch((error) => {
        console.error('Error adding review: ', error);
        alert('Error submitting review.');
});
}
