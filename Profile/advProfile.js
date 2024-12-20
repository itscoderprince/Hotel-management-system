// <---Arrays to store booking data---->
let userInfo;
let user;
let allBookingData = [];
let inHouseBookingData = [];
let archiveBookingData = [];
let allCashData = [];
let allCashArchData = [];

// <<👆🏻---------------------❌ End Here ❌--------------------👆🏻>>

// <<👇🏻-------- 🛠️ Navbar Elements code Here -------------👇🏻>>
let navBrand = document.querySelector(".navbar-brand");
let searchEl = document.querySelector(".search-input");
let logoutBtn = document.querySelector("#logout-btn");
// <<👆🏻---------------------❌ End Here ❌--------------------👆🏻>>

// <--------------🔍 Search and Tab Elements----------------->
let tabContent = document.querySelector(".tab-content");
let tabPanes = document.querySelectorAll(".tab-pane");
let searchPan = document.querySelector(".search-pane");
let tabBtns = document.querySelectorAll('.tab-links');
// <<👆🏻---------------------❌ End Here ❌--------------------👆🏻>>

// <<👇🏻-------------- 📝 Booking Form Elements ---------------👇🏻>>
let bookingRegForm = document.querySelector(".reg-form");
let allBookingInputs = bookingRegForm.querySelectorAll("input");
let bookingTextarea = bookingRegForm.querySelector("#reg-textarea");
let modalClose = document.querySelectorAll('.btn-close');
let bookingList = document.querySelector("#booking-list");
let bookRegBtn = document.querySelector(".b-reg-btn");
// <<👆🏻---------------------❌ End Here ❌--------------------👆🏻>>

// <<👇🏻-------------- 🏠 In-House Booking Elements ------------👇🏻->>
let inhouseBookingForm = document.querySelector(".inhouse-form");
let inhouseFormInputs = inhouseBookingForm.querySelectorAll("input");
let inhouseTextArea = inhouseBookingForm.querySelector("textarea");
let inHouseBookingList = document.querySelector("#inhouse-booking-list");
let archiveBookingList = document.querySelector("#archive-booking-list");
let cashierBookingList = document.querySelector("#cashier-booking-list");
let inhouseRegBtn = document.querySelector(".inhouse-reg-btn");
// <<👆🏻---------------------❌ End Here ❌--------------------👆🏻>>

// <<👇🏻------------- 💸 Cashier Tab's Button Elements --------👇🏻->>
let cashierForm = document.querySelector(".cashier-form");
let cashierInputs = cashierForm.querySelectorAll('input');
let cashierBtn = document.querySelector('.cashier-btn');
let addCashBtn = document.querySelector('.add-cash');
let closeCashierBtn = document.querySelector('.closeCashier-btn');
let archiveCashBtn = document.querySelector('.archive-cashier');
let printBtn = document.querySelectorAll('.print');
let cashierName = document.querySelector(".cashier-name");
let totalAmount = document.querySelector('.total-amount');
// <<👆🏻---------------------❌ End Here ❌--------------------👆🏻>>

if (sessionStorage.getItem("__au__") == null) {
    window.location = "../index.html"
}

userInfo = JSON.parse(sessionStorage.getItem("__au__"));
navBrand.innerText = userInfo.hotelName;
user = userInfo.email.split("@")[0];

// <-----------Print Function Code Starts Here------------>
for (el of printBtn) {
    el.onclick = () => {
        window.print();
    }
}

// Format Date Function code here 👇🏻👇🏻;
const formatDate = (data, isTime) => {
    const date = new Date(data);
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let time = date.toLocaleTimeString();

    dd = dd < 10 ? "0" + dd : dd
    mm = mm < 10 ? "0" + mm : mm
    return `${dd}-${mm}-${yy} ${isTime ? time : ''}`
}

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
inHouseBookingData = fetchData(user + "_inHouseBookingData");
archiveBookingData = fetchData(user + "_archiveBookingData");
allCashData = fetchData(user + "_allCashData");
allCashArchData = fetchData(user + "_allCashArchData");

/* 👇🏻 <-----Registration Function with Dynamic Data Handling----> 👇🏻 */
const registrationFunc = (textarea, inputs, array, key) => {
    let data = {
        notice: textarea && textarea.value,
        createdAt: new Date()
    };
    for (let inEl of inputs) {
        let key = inEl.name;
        let value = inEl.value;
        data[key] = value;
    }
    array.push(data);
    localStorage.setItem(key, JSON.stringify(array));
    swal("Good Job !", "Booking Success", "success");
}
// <<👆🏻---------------------❌ End Here ❌--------------------👆🏻>>

// Show table data in the Page
const showData = (el, array, key) => {
    let tmp = key.split('_')[1];
    el.innerHTML = ' ';
    array.forEach((item, index) => {
        el.innerHTML += `
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
                        <td class="text-nowrap no-print">
                            <button class="${tmp == 'archiveBookingData' && 'd-none'} btn edit-btn btn-info">
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

    delBookingFunc(el, array, key);
    upBookingFunc(el, array, key);
    checkIn_checkOutFunc(el, array, key);
}

// deleteFunction coding here 👇🏻👇🏻👇🏻
const delBookingFunc = (el, array, key) => {
    let allDelBtn = el.querySelectorAll(".del-btn");
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
                        array.splice(index, 1);
                        localStorage.setItem(key, JSON.stringify(array));
                        showData(el, array, key);
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
const upBookingFunc = (el, array, key) => {
    let allEditBtn = el.querySelectorAll(".edit-btn");
    allEditBtn.forEach((btn, index) => {
        btn.onclick = () => {
            let tmp = key.split('_')[1];
            tmp == 'allBookingData' ? bookRegBtn.click() : inhouseRegBtn.click();
            let updateBtn = tmp == 'allBookingData'
                ? bookingRegForm.querySelectorAll("button")
                : inhouseBookingForm.querySelectorAll("button");
            updateBtn[0].classList.add("d-none");
            updateBtn[1].classList.remove("d-none");


            let editInputs = tmp == 'allBookingData'
                ? bookingRegForm.querySelectorAll("input") :
                inhouseBookingForm.querySelectorAll("input");

            let textarea = tmp == 'allBookingData'
                ? bookingRegForm.querySelector("textarea") :
                inhouseBookingForm.querySelector("textarea");

            let obj = array[index];
            editInputs[0].value = obj.full_name;
            editInputs[1].value = obj.checkin_date;
            editInputs[2].value = obj.People;
            editInputs[3].value = obj.mobile;
            editInputs[4].value = obj.location;
            editInputs[5].value = obj.checkout_date;
            editInputs[6].value = obj.room_no;
            editInputs[7].value = obj.price;
            textarea.value = obj.notice;
            updateBtn[1].onclick = () => {
                let updatedData = {
                    notice: textarea.value,
                    createdAt: new Date()
                }
                for (let el of editInputs) {
                    let key = el.name;
                    let value = el.value;
                    updatedData[key] = value;
                }
                array[index] = updatedData;
                localStorage.setItem(key, JSON.stringify(array))
                tmp == 'allBookingData' ? modalClose[0].click() : modalClose[1].click();
                swal("Good Job !", "Updated Success", "success");
                showData(el, array, key);
            }
        }
    });
}

// checkIncheckOut Function here 
const checkIn_checkOutFunc = (el, array, key) => {
    let allcheckInBtn = el.querySelectorAll('.checkin-btn');
    allcheckInBtn.forEach((btn, index) => {
        btn.onclick = () => {
            swal({
                title: "Are you sure?",
                text: "Once Moved, you will not be able to recover Data!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        let tmp = key.split('_')[1];
                        let data = array[index];
                        array.splice(index, 1);
                        localStorage.setItem(key, JSON.stringify(array));
                        if (tmp == 'allBookingData') {
                            inHouseBookingData.push(data);
                            localStorage.setItem(user + '_inHouseBookingData', JSON.stringify(inHouseBookingData))
                            showData(el, array, key)
                        }
                        else if (tmp == 'archiveBookingData') {
                            allBookingData.push(data);
                            localStorage.setItem(user + '_allBookingData', JSON.stringify(allBookingData))
                            showData(el, array, key)
                        }
                        else {
                            archiveBookingData.push(data);
                            localStorage.setItem(user + '_archiveBookingData', JSON.stringify(archiveBookingData))
                            showData(el, array, key)
                        }
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }
    })
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
    registrationFunc(bookingTextarea, allBookingInputs, allBookingData, user + "_allBookingData");
    bookingRegForm.reset('');
    modalClose[0].click();
    showData(bookingList, allBookingData, user + '_allBookingData');
};

// 🏠 inHouse booking Registration code 
inhouseBookingForm.onsubmit = (e) => {
    e.preventDefault();
    registrationFunc(inhouseTextArea, inhouseFormInputs, inHouseBookingData, user + "_inHouseBookingData");
    inhouseBookingForm.reset('');
    modalClose[1].click();
    showData(inHouseBookingList, inHouseBookingData, user + '_inHouseBookingData');
};


// 🏠 Cashier Registration code 
cashierForm.onsubmit = (e) => {
    e.preventDefault();
    registrationFunc(null, cashierInputs, allCashData, user + "_allCashData");
    cashierForm.reset('');
    modalClose[2].click();
    showCashierFunc();
};

// <👇🏻-----------Search Function Code Starts Here---------👇🏻>
const searchFunc = () => {
    let value = searchEl.value.toLowerCase();
    let activeTableEl = document.querySelector('.tab-content .search-pane.active');
    let tr = activeTableEl.querySelectorAll('tbody tr');
    for (let el of tr) {
        let srNo = el.querySelectorAll('td')[0].innerText;
        let fullName = el.querySelectorAll('td')[1].innerText;
        let location = el.querySelectorAll('td')[2].innerText;
        let checkIn = el.querySelectorAll('td')[3].innerText;
        let checkOut = el.querySelectorAll('td')[4].innerText;
        let bookedDate = el.querySelectorAll('td')[10].innerText;
        let roomNo = el.querySelectorAll('td')[6].innerText;
        let mobile = el.querySelectorAll('td')[7].innerText;
        if (
            srNo.indexOf(value) != -1 ||
            fullName.toLowerCase().indexOf(value) != -1 ||
            location.toLowerCase().indexOf(value) != -1 ||
            checkIn.indexOf(value) != -1 ||
            checkOut.indexOf(value) != -1 ||
            bookedDate.indexOf(value) != -1 ||
            roomNo.toLowerCase().indexOf(value) != -1 ||
            mobile.indexOf(value) != -1
        ) {
            el.classList.remove('d-none');
        } else {
            el.classList.add('d-none');
        }

        /*  
        if (srNo.indexOf(value) != -1) {
                el.classList.remove('d-none');
            }
            else if (fullName.toLowerCase().indexOf(value) != -1) {
                el.classList.remove('d-none');
            }
            else if (location.toLowerCase().indexOf(value) != -1) {
                el.classList.remove('d-none');
            }
            else if (checkIn.indexOf(value) != -1) {
                el.classList.remove('d-none');
            }
            else if (checkOut.indexOf(value) != -1) {
                el.classList.remove('d-none');
            }
            else if (bookedDate.indexOf(value) != -1) {
                el.classList.remove('d-none');
            }
            else if (roomNo.toLowerCase().indexOf(value) != -1) {
                el.classList.remove('d-none');
            }
            else if (mobile.indexOf(value) != -1) {
                el.classList.remove('d-none');
            }
            else {
                el.classList.add('d-none');
            } */
    }
}

searchEl.oninput = () => {
    searchFunc();
}
// <<👆🏻---------------------❌ End Here ❌--------------------👆🏻>>


for (let btn of tabBtns) {
    btn.onclick = () => {
        showData(bookingList, allBookingData, user + '_allBookingData');
        showData(inHouseBookingList, inHouseBookingData, user + '_inHouseBookingData');
        showData(archiveBookingList, archiveBookingData, user + '_archiveBookingData');
    }
}

showData(bookingList, allBookingData, user + '_allBookingData');
showData(inHouseBookingList, inHouseBookingData, user + '_inHouseBookingData');
showData(archiveBookingList, archiveBookingData, user + '_archiveBookingData');

addCashBtn.onclick = () => {
    showCashierFunc();
    cashierName.innerHTML = `Cashier Name: &nbsp
                            <strong>
                            <mark>${sessionStorage.getItem('cashier_name') || ''}</mark>
                            </strong>`;
}

//  show Cashier Function start's here 
const showCashierFunc = () => {
    let totalCash = 0;
    cashierBookingList.innerHTML = ""
    allCashData.forEach((item, index) => {
        totalCash += +item.amount
        cashierBookingList.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${sessionStorage.getItem('cashier_name') || ''}</td>
            <td>${item.roomNo}</td>
            <td>${formatDate(item.createdAt, true)}</td>
            <td>${item.amount}</td>
        </tr>
        `
    });
    totalAmount.innerHTML = `<span>&#8377; &nbsp</span>` + totalCash;

}
showCashierFunc();

// Cashier code start's here 
cashierBtn.onclick = () => {
    if (sessionStorage.getItem('cashier_name') == null) {
        let name = window.prompt('Enter Your Name Here!');

        if (name) {
            sessionStorage.setItem('cashier_name', name);
        }
        else {
            tabBtns[0].classList.add('active');
            tabBtns[3].classList.remove('active');
            tabPanes[3].classList.remove('active');
            tabPanes[0].classList.add('active');
        }
    }
    else {
        cashierName.innerHTML = `Cashier Name: &nbsp<strong><mark>${sessionStorage.getItem('cashier_name')}</mark></strong>`;
    }
}

// Archive Cahier code here 
closeCashierBtn.onclick = () => {
    if (allCashData.length > 0) {
        let data = {
            cashierName: sessionStorage.getItem('cashier_name'),
            total: totalAmount.innerText,
            createdAt: new Date()
        }
        allCashArchData.push(data);
        allCashData = [];
        localStorage.removeItem(user + '_allCashData')
        localStorage.setItem(user + '_allCashArchData', JSON.stringify(allCashArchData));
        showCashierFunc();
    } else {
        swal('warning', 'There is no cash to close', "warning")
    }
}