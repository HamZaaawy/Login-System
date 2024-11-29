// === Intro ===

var btnOne = document.getElementById("btnOne");
var btnTwo = document.getElementById("btnTwo");
var sideOne = document.querySelector(".login");
var sideTwo = document.querySelector(".register");
btnOne.addEventListener("click", function () {
  introAnimtaion();
  sideOne.classList.replace("d-none", "d-flex");
  sideTwo.classList.replace("d-flex", "d-none");
});
btnTwo.addEventListener("click", function () {
  introAnimtaion();
  sideOne.classList.replace("d-flex", "d-none");
  sideTwo.classList.replace("d-none", "d-flex");
});
function introAnimtaion() {
  document.querySelector(".side-one h1").classList.remove("moving-head-down");
  document.querySelector(".side-one h1").classList.add("moving-head-up");
  document.querySelector(".side-two div").style.cssText = "opacity:1;";
  document.querySelector(".side-two div").classList.remove("moving-button-up");
  document.querySelector(".side-two div").classList.add("moving-button-down");
  document.querySelector(".side-one").classList.add("close-sides");
  document.querySelector(".side-two").classList.add("close-sides");
  setTimeout(function () {
    document.querySelector(".intro-animation").style.display = "none";
  }, 2300);
}

var loginLink = document.querySelector(".login-link");
var registerLink = document.querySelector(".register-link");
function change() {
  document.querySelector(".change").classList.add("change-back");
  document.querySelector(".change p").classList.add("opactiy-text");

  setTimeout(function () {
    document.querySelector(".change").classList.remove("change-back");
    document.querySelector(".change p").classList.remove("opactiy-text");
  }, 5000);
}

loginLink.addEventListener("click", function () {
  change();

  setTimeout(function () {
    sideOne.classList.replace("d-none", "d-flex");
    sideTwo.classList.replace("d-flex", "d-none");
  }, 2500);
});
registerLink.addEventListener("click", function () {
  change();
  setTimeout(function () {
    sideOne.classList.replace("d-flex", "d-none");
    sideTwo.classList.replace("d-none", "d-flex");
  }, 2500);
});

//   === ===== ===
var emailLoginInput = document.getElementById("emailLoginInput");
var passwordLoginInput = document.getElementById("passwordLoginInput");
var loginBtn = document.getElementById("loginBtn");
var loginAlert = document.querySelector(".login-alert");

var nameInput = document.getElementById("nameInput");
var emailRegisterInput = document.getElementById("emailRegisterInput");
var passwordRegisterInput = document.getElementById("passwordRegisterInput");
var registerBtn = document.getElementById("registerBtn");
var alertRegister = document.querySelector(".alert-register");

var emailRegex = /[\w]+@[a-zA-Z]+.com/;
var passwordRegex = /\w{8,}/i;
var nameRegex = /\w{3,}/i;
var members = [];

if (localStorage.getItem("members")) {
  members = JSON.parse(localStorage.getItem("members"));
}
//========== Regsiter ==========
registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    emailRegex.test(emailRegisterInput.value) &&
    passwordRegex.test(passwordRegisterInput.value) &&
    nameRegex.test(nameInput.value)
  ) {
    check();
  } else {
    alertRegister.classList.replace("d-none", "d-block");
    alertRegister.classList.add("alert-danger");
    setTimeout(function () {
      alertRegister.classList.replace("d-block", "d-none");
      alertRegister.classList.remove("alert-danger");
    }, 2000);
    alertRegister.innerHTML = "Please Check Your data";
  }
});
function check() {
  var emailCheck = false;

  for (var i = 0; i < members.length; i++) {
    if (members[i].email === emailRegisterInput.value) {
      console.log("Matching");
      alertRegister.classList.add("alert-danger");
      alertRegister.classList.replace("d-none", "d-block");
      setTimeout(function () {
        alertRegister.classList.remove("alert-danger");
        alertRegister.classList.replace("d-block", "d-none");
      }, 2000);
      alertRegister.innerHTML = "This Email is already exists";

      emailCheck = true;
      break;
    }
  }
  if (!emailCheck) {
    addNewMember();
    alertRegister.classList.replace("d-none", "d-block");
    alertRegister.classList.add("alert-success");
    setTimeout(function () {
      alertRegister.classList.replace("d-block", "d-none");
      alertRegister.classList.remove("alert-success");
    }, 2000);
    alertRegister.innerHTML = "Done";
    nameInput.value = "";
    emailRegisterInput.value = "";
    passwordRegisterInput.value = "";
  }
}

function addNewMember() {
  var newMember = {
    name: nameInput.value,
    email: emailRegisterInput.value,
    password: passwordRegisterInput.value,
  };

  members.push(newMember);
  localStorage.setItem("members", JSON.stringify(members));
}
passwordRegisterInput.addEventListener("focus", function () {
  document
    .querySelector(".warning-password")
    .classList.replace("d-none", "d-inline-block");
});

passwordRegisterInput.addEventListener("blur", function () {
  document
    .querySelector(".warning-password")
    .classList.replace("d-inline-block", "d-none");
});

nameInput.addEventListener("focus", function () {
  document
    .querySelector(".warning-name")
    .classList.replace("d-none", "d-inline-block");
});

nameInput.addEventListener("blur", function () {
  document
    .querySelector(".warning-name")
    .classList.replace("d-inline-block", "d-none");
});
// ===========================

// ========== Login ==========

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  loginCheck();
  console.log(nameOfLogin);
});

function loginCheck() {
  for (var i = 0; i < members.length; i++) {
    if (
      emailLoginInput.value === members[i].email &&
      passwordLoginInput.value === members[i].password
    ) {
      loginAlert.classList.replace("d-none", "d-block");
      loginAlert.classList.remove("alert-danger");
      loginAlert.classList.add("alert-success");
      loginAlert.innerHTML = "Welcome";
      var memberName = members[i].name;
      localStorage.setItem("member name", memberName);
      setTimeout(function () {
        loginAlert.classList.replace("d-block", "d-none");
        loginAlert.classList.remove("alert-success");
        window.open("home.html", "_self");
      }, 3000);

      console.log(nameOfLogin);
    } else {
      loginAlert.classList.replace("d-none", "d-block");
      loginAlert.classList.add("alert-danger");
      loginAlert.innerHTML = "Wrong email or password";

      setTimeout(function () {
        loginAlert.classList.replace("d-block", "d-none");
        loginAlert.classList.remove("alert-danger");
      }, 3000);
    }
  }
}
