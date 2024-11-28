var nameInHome = document.querySelector(".change-name");
var memberNameToHome = localStorage.getItem("member name");
nameInHome.innerHTML = memberNameToHome;
