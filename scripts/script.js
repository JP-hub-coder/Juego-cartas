let pedir_boton = document.querySelector(".boton_pedir");
let plantar_boton = document.querySelector(".boton_plantarse");
let contador_actual = document.querySelector(".contador_actual");
let imagen_cartas = document.querySelector(".img_carta");
let reiniciar_boton = document.querySelector(".boton_reiniciar");
let img_dealer = document.querySelector(".img_dealer");
let dealer_cartas = document.querySelector(".dealer_cartas");   

let total = 0;
let deck_id = ""; 

function baraja_principal() {
    fetch("https://deckofcardsapi.com/api/deck/dr4z1k1f7hwh/shuffle/")
    .then (function(response) {
        return response.json();
    })
    .then (function(data) {
        deck_id = data["deck_id"];
    })
}

function sacar_carta() {

    fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        .then(function(response){
            return response.json(); 
        })
        .then(function(data){

            imagen_cartas.src = data["cards"][0]["image"];

            let valor_carta = data["cards"][0]["value"];

            if (valor_carta === "KING" || valor_carta === "QUEEN" || valor_carta === "JACK") {
                valor_carta = 10;
            } else if (valor_carta === "ACE") {
                valor_carta = 11;
            } else {
                valor_carta = parseInt(valor_carta);
            }

            total = total + valor_carta;
            contador_actual.innerHTML =
            "Actualmente tienes: " + total

            if (total === 21) {
                contador_actual.innerHTML =
                "¡Felicidades, has ganado con los " + total + " puntos necesarios! <br> BUEN JUEGO =)";
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

baraja_principal();

pedir_boton.addEventListener("click", sacar_carta);

plantar_boton.addEventListener("click", function(){
    pedir_boton.disabled = true;
    plantar_boton.disabled = true;
    contador_actual.innerHTML =
    "Te plantaste con: " + total + " puntos";

    fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        total_dealer = 0;

        for (let i = 0; i < data["cards"].length; i++) {

            let valor_carta = data["cards"][i]["value"];

            if (valor_carta === "KING" || valor_carta === "QUEEN" || valor_carta === "JACK") {
                valor_carta = 10;
            } else if (valor_carta === "ACE") {
                valor_carta = 11;
            } else {
                valor_carta = parseInt(valor_carta);
            }
            
            total_dealer += valor_carta;
        }

        dealer_cartas.innerHTML = data["cards"][0]["value"] + " y " + data["cards"][1]["value"] + "<br>" + " para un total de: " + total_dealer;

        setTimeout(function(){
            contador_actual.innerHTML = "El dealer ha jugado, calculando resultados...";
        }, 1500);
        
        setTimeout(function(){
            if (total_dealer > 21 || total > total_dealer) { 
                contador_actual.innerHTML = "¡Felicidades, has ganado! <br> Tu total fue de: " + total;
            } else if (total_dealer === total) {
                contador_actual.innerHTML = "¡Es un empate! <br> Tu total fue de: " + total;
            } else {
                contador_actual.innerHTML = "Lo siento, has perdido <br> Tu total fue de: " + total;
            }
        }, 3500);

        img_dealer.src = data["cards"][1]["image"];

    });  
});

reiniciar_boton.addEventListener("click", function(){
    location.reload();
})