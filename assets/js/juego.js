
/*
 2C = Two of Clubs (Tréboles)
 2D = Two of Diamonds (Diamantes o rombos)
 2H = Two of Hearts (Corazones)
 2S = Two of Spades (Espadas)

*/
/* ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ Variables, arreglos ¬¬¬¬¬¬¬¬¬¬¬¬*/

let deck = [];
let cartaTomada;
let puntosJugador = 0;
let puntosComputadora = 0;
const tipos = ['C','D', 'H', 'S']
const especiales = ['A','J', 'Q', 'K']

/* ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ Referencias del HTML ¬¬¬¬¬¬¬¬¬¬¬¬*/


const btnPedir = document.getElementById("btnPedir")
const btnDetener = document.getElementById("btnDetener")
const btnNuevoJuego = document.getElementById("btnNuevo")


const elementosSmall = document.querySelectorAll("small")
console.log(elementosSmall)

const cartasJugadorContainer = document.querySelector("#jugador-cartas")
console.log(cartasJugadorContainer)

const cartasPCContainer = document.querySelector("#computadora-cartas")
console.log(cartasPCContainer)

/* ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ Funciones ¬¬¬¬¬¬¬¬¬¬¬¬*/

//========== Esta función crea la baraja

const crearDeck = () =>{

    console.warn("Creación de la baraja")

    /*Creación de baraja del 1 al 10*/ 

    for (let i = 2; i < 11; i++) {

        for (let j= 0; j < tipos.length; j++) {

            deck.push(`${i}${tipos[j]}`)
        }
    }

    /*Creación de baraja de A, J, Q y K */

    for (const especial of especiales) {

        for (const tipo of tipos) {
            
            deck.push(`${especial}${tipo}`)
        }
        
    }
    //console.log({deck})
    deck = _.shuffle(deck)
    console.log(deck)

    return deck
}

//========== Esta función me permite tomar una carta

const pedirCarta= () =>{

    if(deck.length===0){

        throw new Error("No hay cartas en el Deck");
    }
    cartaTomada = deck.pop() //remueve el último elemento del arreglo
    //console.log(`La carta tomada ha sido ${cartaTomada}`)
    //console.log(deck)
    return cartaTomada
}

//========== Esta función me permite saber el valor de la carta tomada

const valorCarta = (carta)=>{
    const valor = carta.slice(0,-1);
    return !isNaN(valor) ?  parseInt(valor)
            : (valor==='A') ? 11 
            : 10
}

//========== Esta función permite evaluar el resultado y lanzar las alertas de finalización del juego

const evaluarResultado = ()=>{

    console.log({puntosJugador})
    console.log({puntosComputadora})

    if ( (puntosComputadora > puntosJugador && puntosComputadora<=21) || puntosJugador >21) {

        Swal.fire({
            title: "Lo siento, perdiste",
            text: "La computadora gana",
            icon: "error"
        });
        
    } else if ( (puntosJugador > puntosComputadora && puntosJugador<=21) || puntosComputadora>21 ) {

        Swal.fire({
            title: "Felicidades, ganaste!",
            text: "Usted ha ganado la partida",
            icon: "success"
        });
        
    }  else if (puntosJugador == puntosComputadora){
        Swal.fire({
            title: "Es un empate!",
            text: "Nadie gana",
            icon: "info"
        }); 
    }
}

//========== Esta función realiza el procedimiento de pedir una carta y mostrarla en la pantalla del juego

const jugarTurno = (dueñoTurno)=>{

    // Paso 1°: Pider una carta de la baraja
        const carta = pedirCarta()
    // Paso 2°: Obtener los puntos y sumarlos a la cantidad anterior
        let puntosDelTurno = valorCarta(carta) 
    // Paso 3°: Generar el elemento HTML de la carta y dejarla lista para mostrar
        //Crear elemento HTML de la carta
            const cartaMostrar = document.createElement("img")
        //Agregar atributo src (CLAVE)
            cartaMostrar.setAttribute("src",`assets/cartas/${carta}.png` )
        //Agregar clase al elemento
            cartaMostrar.classList.add("carta")

    // Paso 4°: Colocar puntos del jugador en el elemento HTML correspondiente y la carta en el contenedor
        if(dueñoTurno==="pc"){
            console.log("turno pc")

            puntosComputadora = puntosComputadora +puntosDelTurno

            let [, segundoSmall] = elementosSmall
            segundoSmall.innerHTML = puntosComputadora

            //Insertar carta en el div contenedor
            cartasPCContainer.append(cartaMostrar)

        } else if(dueñoTurno==="jugador"){

            console.log("turno jugador")
            puntosJugador = puntosJugador + puntosDelTurno

            let [primerSmall] = elementosSmall
            primerSmall.innerHTML = puntosJugador

            //Insertar carta en el div contenedor
            cartasJugadorContainer.append(cartaMostrar)   
        }         
}

//========== Esta función ejecuta el turno de la computadora

const turnoPC = (puntoMinimos)=>{
    
    do {
        jugarTurno("pc")

        if(puntoMinimos>21){
            break;
        }
            
        
    } while (puntosComputadora<puntoMinimos && puntoMinimos<=21 );

    //Evaluación de resultado

    setTimeout(() => {
        evaluarResultado()

    }, 300);

}

/* ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ Algoritmo ¬¬¬¬¬¬¬¬¬¬¬¬*/

//1° Creo baraja

crearDeck()

//2° LLamo a valorCarta pero esta vez no le paso un valor en duro como argumento, si no que le paso el valor del llamado a pedir carta

//let resultado = valorCarta(pedirCarta())

//console.log(typeof(resultado))
//console.log({cartaTomada,resultado})

/* ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ Eventos ¬¬¬¬¬¬¬¬¬¬¬¬*/


btnPedir.addEventListener("click", ()=>{

    jugarTurno("jugador")

    //---------------------------Evaluar puntos del jugador

    if (puntosJugador>21) {

        console.warn("Lo siento mucho, perdiste")
        btnPedir.setAttribute("disabled", "true")
        btnDetener.disabled = true
        turnoPC(puntosJugador)
        
    } else if ( puntosJugador==21){
        console.warn("21, ganaste!")
        btnPedir.setAttribute("disabled", "true")
        btnDetener.disabled = true
        turnoPC(puntosJugador)

    }

})

btnDetener.addEventListener("click", ()=>{

    console.log("Click en btn Detener")

    //Bloquear botones PEDIR CARTA y DETENER

    btnPedir.setAttribute("disabled", true )
    btnDetener.disabled = true

    turnoPC(puntosJugador)

})

btnNuevoJuego.addEventListener("click", () =>{

    //Limpiar la consola

    console.clear()

    // Acción N° 01 - Reiniciar deck de cartas
        deck = []
        crearDeck()

    // Acción N° 02 - Borrar cartas de la pantalla
        cartasJugadorContainer.innerHTML="";
        cartasPCContainer.replaceChildren()

    // Acción N° 03 - Resetear los puntajes

        //Resetearlos visualmente en el HTML
        let [primerSmall, segundoSmall] = elementosSmall
        primerSmall.innerText = 0;
        segundoSmall.innerText = 0;

        //Resetear las variables globales que almacenan los puntos
        puntosJugador = 0
        puntosComputadora = 0

    // Acción N° 04 - Habilitar botones "Pedir carta" y "Detener"
        btnPedir.disabled = false;
        btnDetener.disabled = false

})

