
const URL_CHARGE_RIFA = "rifas.json"; 

const chargeList = () => {
    fetch(URL_CHARGE_RIFA)
        .then(response => response.json())
        .then(data => chargeRifa(data))
        .catch(error => console.error(error));
}
chargeList();

const chargeRifa = (list) => {
    let listNumberRifa = list.listnumbers;
    const contentRifa = document.getElementById("content-rifa");
    listNumberRifa.forEach(element => {
        
        
    });
}

