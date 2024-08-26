import {openModalReserverd} from "./modalreserver.js";

const URL_CHARGE_RIFA = "back/getrifas.php"; 
const URL_SELECTION_RIFA = "back/change_status.php";
const URL_RESERVED_RIFA = "back/reservedrifas.php";

const chargeList = () => {
    fetch(URL_CHARGE_RIFA)
        .then(response => response.json())
        .then(data => chargeRifa(data))
        .catch(error => console.error(error));
}

chargeList();

document.getElementById("btnbuy").addEventListener('click', openModalReserverd);

const chargeRifa = (list) => {
    const listNumberRifa = list;
    const contentRifa = document.getElementById("content-rifa");
    listNumberRifa.forEach(element => {
        const btnNumber = document.createElement('button');
        btnNumber.textContent = element.num;
        btnNumber.value = element.num;
        if(element.stat === "available"){
            btnNumber.classList = " btn-number available";
            btnNumber.addEventListener('click', ()=> selectRifa(element.num));
        }else if(element.stat === "reserved"){
            btnNumber.classList = "btn-number reserved";
        }else if(element.stat === "selected"){
            btnNumber.classList = "btn-number pending";
        }else{
            btnNumber.classList = "btn-number not-available"
        }
        contentRifa.appendChild(btnNumber);
    });
}

const selectRifa = (btnValue) => {
    let selector = '[value="' + btnValue + '"]';
    const btnNumber = document.querySelector(selector);
    if(btnNumber.classList.contains("available")){ 
        btnNumber.classList.remove("available");
        btnNumber.classList.add("selected");
        sendTheSelection(btnNumber.value, true);
    }else{
        btnNumber.classList.remove('selected');
        btnNumber.classList.add('available')
        sendTheSelection(btnNumber.value, false);
    }
}

const sendTheSelection = (btnNumber, stads) => {
    const data = {
        num: btnNumber,
        stat: stads
    };
    fetch(URL_SELECTION_RIFA, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.error(error))
}


