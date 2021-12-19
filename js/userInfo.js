import { setUserData } from './setUserData'

export let getUserInfo = async () => {
  let div = document.createElement('div');
  div.className = 'user-info-container';

  let userInfo = document.createElement('div');
  userInfo.className = 'user-info';

  let greetingInstructionsContainer = document.createElement('div');
  greetingInstructionsContainer.className = 'greeting-instructions-container';

  let greeting = document.createElement('div');
  greeting.id = 'new-user-greeting';
  greeting.innerHTML = 'Bonjour! 👋';

  let instructions = document.createElement('div');
  instructions.id = 'new-user-instructions';
  instructions.innerHTML = 'Enter your name and zip code for a personalized experience.';

  greetingInstructionsContainer.appendChild(greeting);
  greetingInstructionsContainer.appendChild(instructions);

  let form = document.createElement('form');
  form.className = 'user-info-form';
  form.id = 'user-info-form';
  form.setAttribute('onsubmit', 'return false');

  let nameZipContainer = document.createElement('div');
  nameZipContainer.className = 'name-zip-container';

  let nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameInput.placeholder = 'Johny';
  nameInput.id = 'name';
  nameInput.required = true;

  let zipInput = document.createElement('input');
  zipInput.type = 'text';
  zipInput.name = 'zip-code';
  zipInput.placeholder = '12345';
  zipInput.id = 'zip-code';
  zipInput.maxLength = 5;
  zipInput.pattern = '[0-9]{5}';
  zipInput.required = true;

  nameZipContainer.appendChild(nameInput);
  nameZipContainer.appendChild(zipInput);

  let buttonContainer = document.createElement('div');
  buttonContainer.className = 'save-button-container';

  let button = document.createElement('button');
  button.id = "save-button";
  button.type = 'submit';
  button.innerText = 'Save';
  button.className = 'btn btn-outline-dark';
  button.setAttribute('onclick', 'document.location.reload(true)');

  buttonContainer.appendChild(button);

  form.appendChild(nameZipContainer);
  form.appendChild(buttonContainer);

  userInfo.appendChild(greetingInstructionsContainer);
  userInfo.appendChild(form);

  div.appendChild(userInfo);

  let body = document.querySelector('.container-fluid');
  body.appendChild(div);

  let btn = document.querySelector('#save-button');

  btn.addEventListener('click', () => {

    let name = document.querySelector('#name').value;
    let zip = document.querySelector('#zip-code').value;

    let user = {
      name: name,
      zip: zip
    };

    setUserData(user);
    div.remove();
  });
};
