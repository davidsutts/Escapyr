var loading = false;
var signup = false;
document.addEventListener("DOMContentLoaded", function () {
    var _a, _b;
    (_a = document.getElementById("pword")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", toggleSubmit);
    (_b = document.getElementById("uname")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", toggleSubmit);
});
document.addEventListener("keyup", function (event) {
    var button = document.querySelector("#submit");
    toggleSubmit();
    if (event.code == "Enter") {
        if (checkForm()) {
            postForm();
            button === null || button === void 0 ? void 0 : button.setAttribute("disabled", "true");
        }
    }
    else {
        return;
    }
});
document.addEventListener("click", toggleSubmit);
function checkForm() {
    var inputs;
    if (signup) {
        inputs = document.getElementsByClassName("signup-input");
    }
    else {
        inputs = document.getElementsByClassName("login");
    }
    for (var i = 0; i < inputs.length; i++) {
        if (loading || inputs[i].value == "") {
            return false;
        }
    }
    var validEmail = !inputs[0].validity.patternMismatch;
    if (!validEmail || signup && inputs[2].value != inputs[3].value) {
        return false;
    }
    return true;
}
function toggleSubmit() {
    var button = document.querySelector("#submit");
    if (checkForm() == false) {
        button === null || button === void 0 ? void 0 : button.setAttribute("disabled", "true");
    }
    else {
        button === null || button === void 0 ? void 0 : button.removeAttribute("disabled");
    }
}
function postForm() {
    var msg = document.querySelector("p");
    var form = document.querySelector('form');
    var url = signup ? "/signup/form" : "/login/form";
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest;
    xhr.open("POST", url);
    xhr.onloadstart = function () { loading = true; };
    xhr.onloadend = function () {
        msg.style.display = "block";
        if (xhr.status == 200) {
            msg.innerText = "Login Successful";
            loading = false;
            window.location.replace("/index");
        }
        else {
            msg.innerText = "Invalid usernamne or password";
            setTimeout(function () {
                loading = false;
            }, 1000);
        }
    };
    xhr.send(formData);
}
function signupToggle() {
    console.log("signup");
    signup = !signup;
    var btn = document.getElementById("form-type-btn");
    btn.value = signup ? "Login Instead" : "Sign Up Instead";
    var inputs = document.getElementsByClassName("signup");
    console.log(inputs.length);
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.display = signup ? "flex" : "none";
    }
}
//# sourceMappingURL=form.js.map