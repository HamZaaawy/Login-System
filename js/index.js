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
    showAlert(alertRegister, "d-none", "d-block", "alert-danger");
    hiddenAlert(alertRegister, "d-block", "d-none", "alert-danger");
    alertRegister.innerHTML = "Please Check Your data";
  }
});
function check() {
  var emailCheck = false;
  for (var i = 0; i < members.length; i++) {
    if (members[i].email === emailRegisterInput.value) {
      console.log("Matching");
      showAlert(alertRegister, "d-none", "d-block", "alert-danger");
      alertRegister.innerHTML = "This Email is already exists";
      hiddenAlert(alertRegister, "d-block", "d-none", "alert-danger");

      emailCheck = true;
      break;
    }
  }
  if (!emailCheck) {
    addNewMember();
    showAlert(alertRegister, "d-none", "d-block", "alert-success");
    hiddenAlert(alertRegister, "d-block", "d-none", "alert-success");
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
});
function loginCheck() {
  for (var i = 0; i < members.length; i++) {
    if (
      emailLoginInput.value === members[i].email &&
      passwordLoginInput.value === members[i].password
    ) {
      showAlert(loginAlert, "d-none", "d-block", "alert-success");
      loginAlert.innerHTML = "Welcome";
      var memberName = members[i].name;
      localStorage.setItem("member name", memberName);
      setTimeout(function () {
        loginAlert.classList.replace("d-block", "d-none");
        loginAlert.classList.remove("alert-success");
        window.open("home.html", "_self");
      }, 3000);
    } else {
      showAlert(loginAlert, "d-none", "d-block", "alert-danger");
      loginAlert.innerHTML = "Wrong email or password";
      hiddenAlert(loginAlert, "d-block", "d-none", "alert-danger");
    }
  }
}

function showAlert(alertType, firstStatue, secondStatue, alertStatue) {
  alertType.classList.replace(firstStatue, secondStatue);
  alertType.classList.add(alertStatue);
}
function hiddenAlert(alertType, fStatue, sStatue, alertStatue) {
  setTimeout(function () {
    alertType.classList.replace(fStatue, sStatue);
    alertType.classList.remove(alertStatue);
  }, 2000);
}
