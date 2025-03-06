const signupbutton=document.getElementById('signupbutton');
const signinbutton=document.getElementById('loginbutton');
const loginForm=document.getElementById('login');
const signupForm=document.getElementById('signup');

signupbutton.addEventListener('click',function(){
    loginForm.style.display="none";
    signupForm.style.display="block";
})
loginbutton.addEventListener('click', function(){
    loginForm.style.display="block";
    signupForm.style.display="none";
})