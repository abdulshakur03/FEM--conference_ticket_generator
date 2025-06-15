//Generated Ticket/; //

const stored = localStorage.getItem("person");
const user = JSON.parse(stored);

const username = user.name;
const userEmail = user.email;
const userGitHub = user.github;
console.log(userEmail, username, userGitHub);

//*******//
const name = document.querySelector(".name");

name.textContent = username;
