let signUpButton = document.querySelector('button');
let signUpForm = document.querySelector('#signup-form');

signUpButton.addEventListener('click', () => {
  signUpForm.classList.toggle('hidden');
});

let cancelButton = document.querySelector('#cancel-button');
cancelButton.addEventListener('click', () => {
  signUpForm.classList.toggle('hidden');
});

let loginButton = document.querySelector('#login-button');
let loginForm = document.querySelector('#login-form');

loginButton.addEventListener('click', () => {
  loginForm.classList.toggle('hidden');
});

let cancelLoginButton = document.querySelector('#cancel-login-button');
cancelLoginButton.addEventListener('click', () => {
  loginForm.classList.toggle('hidden');
});
