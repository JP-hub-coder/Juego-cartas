let pedir_boton = document.querySelector(".boton_pedir");
let plantar_boton = document.querySelector(".boton_plantarse");
let contador_actual = document.querySelector(".contador_actual");
let imagen_cartas = document.querySelector(".img_carta")
let reiniciar_boton = document.querySelector(".boton_reiniciar")

// let imagen_dealer = 

let total = 0; 

function sacar_carta() {

    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
        .then(function(response){
            return response.json(); 
        })
        .then(function(data){

            imagen_cartas.src = data["cards"][0]["image"]
            imagen_cartas.style = "translate(x): 20px;"

            let valor_carta = data["cards"][0]["value"];

            if (valor_carta === "KING" || valor_carta === "QUEEN" || valor_carta === "JACK") {
                valor_carta = 10;
            } else if (valor_carta === "ACE") {
                valor_carta = 1 || 11;
            } else {
                valor_carta = parseInt(valor_carta);
            }
            total = total + valor_carta;
            contador_actual.innerHTML =
            "Actualmente estás en: " + total

            if (total === 21) {
                contador_actual.innerHTML =
                "¡Felicidades, has ganado con los " + total + " puntos necesarios!";
                pedir_boton.disabled = true;
                plantar_boton.disabled = true 
            }

            if (total > 21) {
                contador_actual.innerHTML =
                "Has perdido, te pasaste con: " + total;

                pedir_boton.disabled = true;
                plantar_boton.disabled = true 
            }
        });
}

pedir_boton.addEventListener("click", sacar_carta);

plantar_boton.addEventListener("click", function(){
    pedir_boton.disabled = true;
    plantar_boton.disabled = true;
    contador_actual.innerHTML =
    "Te plantaste con: " + total + " puntos";
    
});

reiniciar_boton.addEventListener("click", function(){
    location.reload();
})