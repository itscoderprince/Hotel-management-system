let userInfo;
let user;
let allBookingData = [];
let navBrand = document.querySelector(".navbar-brand");
let logoutBtn = document.querySelector("#logout-btn");
let bookingRegForm = document.querySelector(".reg-form");
let allBookingInputs = bookingRegForm.querySelectorAll("input");
let inhouseBookingForm = document.querySelector(".inhouse-form");
let inhouseFormInputs = inhouseBookingForm.querySelectorAll("input");
let bookingTextarea = bookingRegForm.querySelector("#reg-textarea");
let modalClose = document.querySelector('.btn-close');
let bookingList = document.querySelector("#booking-list");
let bookRegBtn = document.querySelector(".b-reg-btn");


if (sessionStorage.getItem("__au__") == null) {
    window.location = "../index.html"
}

userInfo = JSON.parse(sessionStorage.getItem("__au__"));
navBrand.innerText = userInfo.hotelName;
user = userInfo.email.split("@")[0];

// Getting data Form Local Stroage

const fetchData = (key) => {
    if (localStorage.getItem(key) != null) {
        const data = JSON.parse(localStorage.getItem(key));
        return data;
    } else {
        return [];
    }
}
allBookingData = fetchData(user + "_allBookingData");


// Formate Date Function 
const formatDate = (data, isTime) => {
    const date = new Date(data);
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let time = date.toLocaleTimeString()
    dd = dd < 10 ? "0" + dd : dd
    mm = mm < 10 ? "0" + mm : mm
    // return `${dd}-${mm}-${yy} ${time}`
    return `${dd}-${mm}-${yy} ${isTime ? time : ''}`

}

// Registration function 
const registrationFunc = () => {
    let data = {
        notice: bookingTextarea.value,
        createdAt: new Date()
    };
    for (let inEl of allBookingInputs) {
        let key = inEl.name;
        let value = inEl.value;
        data[key] = value;
    }
    allBookingData.push(data);
    localStorage.setItem(user + "_allBookingData", JSON.stringify(allBookingData));
    swal("Good Job !", "Booking Success", "success");
}


// 🔐 Logout Function: Handles user logout 👇🏻
logoutBtn.onclick = () => {
    logoutBtn.innerText = "Wait.."
    setTimeout(() => {
        logoutBtn.innerText = "Logout"
        sessionStorage.removeItem("__au__");
        window.location = "../index.html"
    }, 1500)
}

// 📋 Booking Registration Handler: Collects form data, saves it to local storage
bookingRegForm.onsubmit = (e) => {
    e.preventDefault();
    bookingRegForm.reset('');
    modalClose.click();
    showBookingData();
};



// delete booking coding [3r way declere here because before initialization error ]
const delBookingFunc = () => {
    let allDelBtn = bookingList.querySelectorAll(".del-btn");
    allDelBtn.forEach((btn, index) => {
        btn.onclick = () => {
            swal({
                title: "Are you sure?",
                text: "Atlert!, you will not be able to recover this Guest Data!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        allBookingData.splice(index, 1);
                        showBookingData();
                        localStorage.setItem(user + "_allBookingData", JSON.stringify(allBookingData));
                        swal("Your Guest Data has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your Guest Data file is safe!");
                    }
                });
        }
    });
}

// Edit booking code here 
const upBookingFunc = () => {
    let allEditBtn = bookingList.querySelectorAll(".edit-btn");
    allEditBtn.forEach((ebtn, index) => {
        ebtn.onclick = () => {
            bookRegBtn.click();
            let bookingUpdateBtn = bookingRegForm.querySelectorAll("button")
            bookingUpdateBtn[0].classList.add("d-none");
            bookingUpdateBtn[1].classList.remove("d-none");
            let obj = allBookingData[index];
            allBookingInputs[0].value = obj.full_name;
            allBookingInputs[1].value = obj.checkin_date;
            allBookingInputs[2].value = obj.People;
            allBookingInputs[3].value = obj.mobile;
            allBookingInputs[4].value = obj.location;
            allBookingInputs[5].value = obj.checkout_date;
            allBookingInputs[6].value = obj.room_no;
            allBookingInputs[7].value = obj.price;
            bookingTextarea.value = obj.notice;
            bookingUpdateBtn[1].onclick = () => {
                let updatedData = {
                    notice: bookingTextarea.value,
                    createdAt: new Date()
                }
                for (let el of allBookingInputs) {
                    let key = el.name;
                    let value = el.value;
                    updatedData[key] = value;
                }
                allBookingData[index] = updatedData;
                localStorage.setItem(user + "_allBookingData", JSON.stringify(allBookingData))
                swal("Good Job !", "Updated Success", "success");
                modalClose.click();
                showBookingData();
            }
        }
    });
}

const showBookingData = () => {
    bookingList.innerHTML = "";
    allBookingData.forEach((item, index) => {
        bookingList.innerHTML += `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${item.full_name}</td>
                                    <td>${item.location || 'NA'}</td>
                                    <td>${formatDate(item.checkin_date)}</td>
                                    <td>${formatDate(item.checkout_date)}</td>
                                    <td>${item.People || 'NA'}</td>
                                    <td>${item.room_no}</td>
                                    <td>${item.mobile || 'NA'}</td>
                                    <td>${item.price}</td>
                                    <td>${item.notice || 'NA'}</td>
                                    <td>${formatDate(item.createdAt, true)}</td>
                                    <td class="text-nowrap">
                                        <button class="btn edit-btn btn-info">
                                            <i class="fa fa-edit"></i>
                                        </button>
                                        <button class="btn checkin-btn btn-primary mx-2">
                                            <i class="fa fa-check"></i>
                                        </button>
                                        <button class="btn del-btn btn-danger">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                        `
    });
    delBookingFunc();
    upBookingFunc();


    // You can write the delBookingFunc() code here Working same here [1st Way];
}

showBookingData();
//You can write the delBookingFunc() code here Working same[2nd way to do delcare funtion to access the code before initialization];
