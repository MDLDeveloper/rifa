export function openModalReserverd(){
    let rifaNumbers = document.querySelectorAll(".selected");
    if (rifaNumbers.length === 0){
        const body = 
        `
            <section class="modalreserved">
                <article class="modalwindow">
                    <div class="headmodal">
                        <button class="btnclosemodal">X</button>
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
        rifaNumbers.forEach(element => {
            numbers += " "+element.value;
        });
        const body =
        `
            <section class="modalreserved">
                <article class="modalwindows">
                    <div class="headmodal">
                        <button class="btnclosemodal">X</button>
                    </div>
                    <div class="bodymodal">
                        <p class="textmodal">
                            Usted seleccionó los siguientes numeros:<br>
                            ${numbers}
                        </p>
                        <form id="contactForm">
                            <div class="form-group">
                                <label for="fullname">Nombre Completo</label>
                                <input type="text" id="fullname" name="fullname" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Teléfono o Celular</label>
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

    fetch(URL_RESERVED_RIFA,{
        method: POST,
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(result => console.log(result))
    .catch(errer => console.error(errer))
}
 