let allUserData = [];
let regForm = document.querySelector(".reg-form");
let allInputs = regForm.querySelectorAll("input");
let regBtn = regForm.querySelector("button");
let loginForm = document.querySelector(".login-form");
let logInInputs = loginForm.querySelectorAll("input");
let logInBtn = loginForm.querySelector("button");

// Load existing user data from local storage
if (localStorage.getItem("allUserData") != null) {
    allUserData = JSON.parse(localStorage.getItem("allUserData"));
}

// Handle form submission
regForm.onsubmit = (e) => {
    e.preventDefault();
    let checkEmail = allUserData.find((data) => data.email == allInputs[4].value);
    if (checkEmail == undefined) {
        let data = {};
        for (let el of allInputs) {
            data[el.name] = el.value;
        }
        regBtn.innerText = "Processing...."; // Show processing text
        setTimeout(() => {
            regBtn.innerText = "Register"; // Reset button text
            allUserData.push(data);
            localStorage.setItem("allUserData", JSON.stringify(allUserData));
            swal("Good job!", "Your Form has been Submitted!", "success");
            regForm.reset('')
        }, 1200);
    } else {
        swal("Warning!", "Email has already registered", "warning");
    }
    // regForm.reset('') not here inside the setTimeout fun
};

/*  1st way to do
loginForm.onsubmit = (e) => {
    e.preventDefault();
    if (logInInputs[0].value != "") {
        if (logInInputs[1].value != "") {
            swal("Sucess!", "login sucess", "warning");
        } else {
            swal("Warning!", "email are empty", "warning");
        }
    } else {
        swal("Warning!", "Password is empty", "warning");
    }
} */

loginForm.onsubmit = (e) => {
    e.preventDefault();
    if (logInInputs[0].value === "" && logInInputs[1].value === "") {
        swal("Warning!", "Fields are empty", "warning");
    } else if (logInInputs[0].value === "") {
        swal("Warning!", "Email is empty", "warning");
    } else if (logInInputs[1].value === "") {
        swal("Warning!", "password is empty", "warning");
    } else {
        // Check email in our database
        let checkEmailPsw = allUserData.find((data) => {
            return data.email == logInInputs[0].value;
        });
        if (checkEmailPsw != undefined) {
            // Match Password here 👇🏻
            if (checkEmailPsw.password == logInInputs[1].value) {
                logInBtn.innerText = "Please wait...";
                setTimeout(() => {
                    logInBtn.innerText = "login";
                    window.location = "profile/profile.html"
                    checkEmailPsw.password = null;
                    sessionStorage.setItem("__au__", JSON.stringify(checkEmailPsw))
                }, 1300);
            } else {
                swal("Warning!", "Wrong Password", "warning");
            }
        } else {
            swal("Warning!", "Wrong Email", "warning");
        }
    }
};