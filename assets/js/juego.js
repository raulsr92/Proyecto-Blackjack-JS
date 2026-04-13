

const miModulo = (() =>{ 

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


        // Borrar cartas de la pantalla
            contenedoresCartas.forEach((contenedor)=>contenedor.replaceChildren())

        // Resetear los puntajes
            elementosSmall.forEach((elemento)=>elemento.innerHTML=0)

        // Acción N° 04 - Habilitar botones "Pedir carta" y "Detener"
            btnPedir.disabled = false;
            btnDetener.disabled = false
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
        const [puntosJugador1, puntosPC] = puntosJugadores
        console.log({puntosJugador1, puntosPC})
        setTimeout(() => {

            if ( (puntosPC > puntosJugador1 && puntosPC<=21) || puntosJugador1 >21) {
                mostrarAlerta("Lo siento, perdiste","La computadora gana","error")
                
            } else if ( (puntosJugador1 > puntosPC && puntosJugador1<=21) || puntosPC>21 ) {
                mostrarAlerta("Felicidades, ganaste!","Usted ha ganado la partida","success")

            }  else if (puntosJugador1 == puntosPC){
                mostrarAlerta("Es un empate!","Nadie gana","info")
            }

        }, 300);
    }

    const mostrarAlerta = (titulo, mensaje, icono) =>{
            Swal.fire({
                    title: titulo,
                    text: mensaje,
                    icon: icono
            }); 
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
    
        } while (puntosJugadores[puntosJugadores.length-1]<puntoMinimos && puntoMinimos<=21 );

        //Evaluación de resultado

            evaluarResultado()
    }

    /* ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ Eventos ¬¬¬¬¬¬¬¬¬¬¬¬*/

    btnPedir.addEventListener("click", ()=>{
        const carta = pedirCarta()
        const puntosJugador = acumularPuntos(carta, 0)
        dibujarCarta(carta,0)

        //Acceder a los puntos de los jugadores y pc con desestructuración de arrays
        const [puntosJugador1, puntosPC] = puntosJugadores

        //---------------------------Evaluar puntos del jugador

            if (puntosJugador1>21) {
                console.warn("Lo siento mucho, perdiste")
                btnPedir.setAttribute("disabled", "true")
                btnDetener.disabled = true
                turnoPC(puntosJugador)           
            } else if ( puntosJugador1==21){
                console.warn("21, ganaste!")
                btnPedir.setAttribute("disabled", "true")
                btnDetener.disabled = true
                turnoPC(puntosJugador)
            }
    })

    btnDetener.addEventListener("click", ()=>{

        console.log("Click en btn Detener")

        //Acceder a los puntos de los jugadores y pc con desestructuración de arrays
        const [puntosJugador1, puntosPC] = puntosJugadores

        //Bloquear botones PEDIR CARTA y DETENER
        btnPedir.setAttribute("disabled", true )
        btnDetener.disabled = true
        
        turnoPC(puntosJugador1)
    })

    btnNuevoJuego.addEventListener("click", () =>{

        inicializarJuego()

    })

    return{
        nuevoJuego: inicializarJuego
    }

}) ();



