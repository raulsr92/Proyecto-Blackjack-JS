

(() =>{ 

    'use strict'
    /* ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ Variables, arreglos ¬¬¬¬¬¬¬¬¬¬¬¬*/

    let deck = []
        //puntosJugador = 0,
        //puntosComputadora = 0;

    const tipos = ['C','D', 'H', 'S'],
          especiales = ['A','J', 'Q', 'K'];

    let puntosJugadores = []

    /* ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ Referencias del HTML ¬¬¬¬¬¬¬¬¬¬¬¬*/

    const   btnPedir = document.getElementById("btnPedir"),
            btnDetener = document.getElementById("btnDetener"),
            btnNuevoJuego = document.getElementById("btnNuevo");

    const   contenedoresCartas = document.querySelectorAll(".divCartas"),
            elementosSmall = document.querySelectorAll("small");

    console.log(contenedoresCartas)
    /* ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ Funciones ¬¬¬¬¬¬¬¬¬¬¬¬*/

    //========== Esta función inicializa el juego

    const inicializarJuego = (numeroJugadores = 1)=>{

        deck = crearDeck()

        //Inicializar el array de puntos

        puntosJugadores=[]

        for (let i = 0; i < numeroJugadores+1 ; i++) {
            
            puntosJugadores.push(0)
            
        }
        console.log({puntosJugadores})
    }

    //========== Esta función crea la baraja

    const crearDeck = () =>{

        //Reiniciar deck de cartas
            deck = []

        //console.warn("Creación de la baraja")

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
        
        return _.shuffle(deck)
    }

    //========== Esta función me permite tomar una carta

    const pedirCarta= () =>{

        if(deck.length===0){

            throw new Error("No hay cartas en el Deck");
        }
        return deck.pop()
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
        if ( (puntosJugadores.length-1 > puntosJugadores[0] && puntosJugadores.length-1<=21) || puntosJugadores[0] >21) {
            Swal.fire({
                title: "Lo siento, perdiste",
                text: "La computadora gana",
                icon: "error"
            });
            
        } else if ( (puntosJugadores[0] > puntosJugadores.length-1 && puntosJugadores[0]<=21) || puntosJugadores.length-1>21 ) {
            Swal.fire({
                title: "Felicidades, ganaste!",
                text: "Usted ha ganado la partida",
                icon: "success"
            });    
        }  else if (puntosJugadores[0] == puntosJugadores.length-1){
            Swal.fire({
                title: "Es un empate!",
                text: "Nadie gana",
                icon: "info"
            }); 
        }
    }

    //========== Esta función realiza el procedimiento de pedir una carta y mostrarla en la pantalla del juego

    // turno: 0 = primer jugador y el útlimo será la computadora

    const acumularPuntos = (carta,turno)=>{

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta) 

        elementosSmall[turno].innerHTML = puntosJugadores[turno]
        console.log({puntosJugadores})

        return puntosJugadores[turno]
    }


    const dibujarCarta = (carta, turno) => {
        
        //Crear elemento HTML de la carta
            const cartaMostrar = document.createElement("img")
        //Agregar atributo src (CLAVE)
            cartaMostrar.setAttribute("src",`assets/cartas/${carta}.png` )
        //Agregar clase al elemento
            cartaMostrar.classList.add("carta")

        contenedoresCartas[turno].append(cartaMostrar)
    }

    //========== Esta función ejecuta el turno de la computadora

    const turnoPC = (puntoMinimos)=>{
        
        do {
            const carta = pedirCarta()
            acumularPuntos(carta, puntosJugadores.length-1)
            dibujarCarta(carta, puntosJugadores.length-1)
            if(puntoMinimos>21){
                break;
            }        
        } while (puntosJugadores.length-1<puntoMinimos && puntoMinimos<=21 );

        //Evaluación de resultado
            setTimeout(() => {
                evaluarResultado()
            }, 300);
    }


    /* ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ Eventos ¬¬¬¬¬¬¬¬¬¬¬¬*/


    btnPedir.addEventListener("click", ()=>{
        const carta = pedirCarta()
        const puntosJugador = acumularPuntos(carta, 0)
        dibujarCarta(carta,0)
        //---------------------------Evaluar puntos del jugador
            if (puntosJugadores[0]>21) {
                console.warn("Lo siento mucho, perdiste")
                btnPedir.setAttribute("disabled", "true")
                btnDetener.disabled = true
                turnoPC(puntosJugador)           
            } else if ( puntosJugadores[0]==21){
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
        inicializarJuego()

        // Acción N° 02 - Borrar cartas de la pantalla

            for (let i = 0; i < contenedoresCartas; i++) {
                contenedoresCartas[i].replaceChildren();         
            }
           

        // Acción N° 03 - Resetear los puntajes

            for (let i = 0; i < puntosJugadores.length; i++) {
                //Resetearlos visualmente en el HTML
                    elementosSmall[i].innerHTML = 0
                //Resetear las variables globales que almacenan los puntos
                    puntosJugadores[i] = 0    
            }

        // Acción N° 04 - Habilitar botones "Pedir carta" y "Detener"
            btnPedir.disabled = false;
            btnDetener.disabled = false

    })

}) ();



