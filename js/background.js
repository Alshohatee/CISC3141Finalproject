function init() {
  let date = new Date();
  let hour = date.getHours();
  let greeting = document.getElementById("greeting-text");

  if (hour < 12) {
    greeting.innerHTML = 'Good Morning';

    document.body.style.backgroundImage = "url('https://github.com/Mig-uel/Bonjour/blob/main/assets/backgrounds/morning-bg.png?raw=true')";
  } else if (hour < 18) {
    greeting.innerHTML = 'Good Afternoon';

    document.body.style.backgroundImage = "url('https://github.com/Mig-uel/Bonjour/blob/main/assets/backgrounds/afternoon-bg.jpg?raw=true')";
  } else {
    greeting.innerHTML = 'Good Evening';

    document.body.style.backgroundImage = "url('https://github.com/Mig-uel/Bonjour/blob/main/assets/backgrounds/evening-bg.jpg?raw=true')";
  }
}

export { init };