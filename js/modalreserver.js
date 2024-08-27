const URL_RESERVED_RIFA = "back/reservedrifas.php";

export function openModalReserverd(){
    let rifaNumbers = document.querySelectorAll(".selected");
    if (rifaNumbers.length === 0){
        const body = 
        `
            <section class="modalreserved">
                <article class="modalwindow">
                    <div class="headmodal">
                        <button class="btnclosemodal"><img class="iconclosemodal" src="assets/icons/closebtn.svg" alt="Boton para cerrar popup"></button>
                    </div>
                    <div class="bodymodal">
                        <p class="textmodal">
                            Debe seleccionar un número para poder realizar una reserva.
                        </p>
                    </div>
                    <div class="footermodal">
                        <button class="btnclosemodal">Cerrar</button>
                    </div>
                </article>
            </section>
        `
        document.body.insertAdjacentHTML("beforeend", body);
    }else{
        let numbers = "";
        let abonar = 0; 
        rifaNumbers.forEach(element => {
            abonar += 2000;
            numbers += " "+element.value;
        });
        const body =
        `
            <section class="modalreserved">
                <article class="modalwindow">
                    <div class="headmodal">
                        <button class="btnclosemodal"><img class="iconclosemodal" src="assets/icons/closebtn.svg" alt="Boton para cerrar popup"></button>
                    </div>
                    <div class="bodymodal">
                        <p class="textmodal">
                            Usted seleciono el/los siguiente/s numero/s:<br>
                            ${numbers}
                        </p>
                        <p class=textmodal">Total a pagar: <strong class="trasnalias"> $${abonar} </strong></p>
                        <form id="contactForm">
                            <div class="form-group">
                                <label for="fullname">Nombre completo:</label>
                                <input type="text" id="fullname" name="fullname" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email: (opcional)</label>
                                <input type="email" id="email" name="email">
                            </div>
                            <div class="form-group">
                                <label for="phone">Teléfono o Celular:</label>
                                <input type="tel" id="phone" name="phone" required>
                            </div>
                            <div class="footermodal">
                                <button type="submit" id="submitbtn" class="submitbtn"">Reservar</button>
                                <button class="btnclosemodal">Cerrar</button>
                            </div>
                        </form>
                    </div>                    
                </article>
            </section>
        `

        document.body.insertAdjacentHTML("beforeend", body);

        const form = document.getElementById("contactForm")
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            sendReserver();
            form.reset();
        });        
    }
    document.querySelectorAll(".btnclosemodal").forEach(element=>{
        element.addEventListener('click', ()=>{
            document.querySelector(".modalreserved").remove();
        })
    })
}
const sendReserver = () =>{
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const rifaNumbers = document.querySelectorAll(".selected");
    let numbers = []; 
    rifaNumbers.forEach(element => {
        numbers.push(element.value);
    });
    const data = {
        fullname: fullname,
        email: email,
        numtel: phone,
        num: numbers
    }

    let abonar = numbers.length * 2000;

    const body = 
        `
            <section class="modalreserved">
                <article class="modalwindow">
                    <div class="headmodal">
                        <button class="btnclosemodal"><img class="iconclosemodal" src="assets/icons/closebtn.svg" alt="Boton para cerrar popup"></button>
                    </div>
                    <div class="bodymodal">
                        <p class="trasnalias">
                            Después de reservar los números, deberá realizar la transferencia al alias <strong>Isabelsandram91</strong> por el monto total de <strong> $${abonar} </strong> y deberá enviar el comprobante de la transferencia al siguiente número de WhastApp <a href="https://wa.me/+5491163581278" target="_blank"> 11 6358 1278 </a>, una vez verificado, recibirá el comprobante de los números comprados. Si en el transcurso de 6hs de haberse realizado la reserva no recibimos el comprobante o no podemos verificar la transferencia, los número pasaran a estar disponible nuevamente.
                        </p>
                    </div>
                    <div class="footermodal">
                        <button id="confirmarbtn" class="submitbtn">Confirmar</button>
                        <button class="btnclosemodal">Cerrar</button>
                    </div>
                </article>
            </section>
        `
    document.querySelector(".modalreserved").remove();
    document.body.insertAdjacentHTML("beforeend", body);
    
    document.querySelectorAll(".btnclosemodal").forEach(element=>{
        element.addEventListener('click', ()=>{
            document.querySelector(".modalreserved").remove();
            location. reload()
        })
    })

    document.getElementById("confirmarbtn").addEventListener('click', ()=>{
        fetch(URL_RESERVED_RIFA,{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Maneja la respuesta del backend
            console.log(data);
            if (data.error) {
                console.error('Error:', data.error);
                // Muestra un mensaje de error al usuario
                msgresult('Error: ' + data.error);
            } else {
                console.log('Success:', data.successful);
                // Muestra un mensaje de éxito al usuario
                msgresult('Confirmado: ' + data.successful);
            }
        })
        .catch(error => {
            // Manejo de errores en la red
            console.error('Fetch error:', error);
            // Muestra un mensaje de error al usuario
            msgresult('Fetch error: ' + error.message);
        })
    })

}

const msgresult = (msg) =>{
    document.getElementById("confirmarbtn").remove();
    document.querySelector(".bodymodal p").innerHTML = msg;
}
