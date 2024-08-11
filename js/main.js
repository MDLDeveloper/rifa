
const URL_CHARGE_RIFA = "rifas.json"; 
const URL_SELECTION_RIFA = "change_status.php"

const chargeList = () => {
    fetch(URL_CHARGE_RIFA)
        .then(response => response.json())
        .then(data => chargeRifa(data))
        .catch(error => console.error(error));
}
chargeList();

const chargeRifa = (list) => {
    const listNumberRifa = list.listnumbers;
    const contentRifa = document.getElementById("content-rifa");
    listNumberRifa.forEach(element => {
        const btnNumber = document.createElement('button');
        btnNumber.textContent = element.number;
        btnNumber.value = element.number;
        if(element.status === "available"){
            btnNumber.classList = " btn-number available";
            btnNumber.addEventListener('click', ()=> selectRifa(element.number));
        }else if(element.status === "reserved"){
            btnNumber.classList = "btn-number reserved";
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
        sendTheSelection(btnNumber.number, true);
    }else{
        btnNumber.classList.remove('selected');
        btnNumber.classList.add('available')
        sendTheSelection(btnNumber.number, false);
    }
}

const sendTheSelection = (btnNumber, stads) => {
    fetch(URL_SELECTION_RIFA, {})
}