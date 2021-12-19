export let setUserData = (user) => {

  localStorage.setItem('name', user.name);
  localStorage.setItem('zip', user.zip);

};