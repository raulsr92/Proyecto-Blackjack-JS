
/*
 2C = Two of Clubs (Tréboles)
 2D = Two of Diamonds (Diamantes o rombos)
 2H = Two of Hearts (Corazones)
 2S = Two of Spades (Espadas)

*/

/* ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ Variables, arreglos ¬¬¬¬¬¬¬¬¬¬¬¬*/

let deck = [];
let cartaTomada;
const tipos = ['C','D', 'H', 'S']
const especiales = ['A','J', 'Q', 'K']

/* ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ Funciones ¬¬¬¬¬¬¬¬¬¬¬¬*/

//Esta función crea la baraja

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

//Esta función me permite tomar una carta

const pedirCarta= () =>{

    if(deck.length===0){

        throw new Error("No hay cartas en el Deck");
    }

    cartaTomada = deck.pop() //remueve el último elemento del arreglo

    console.log(`La carta tomada ha sido ${cartaTomada}`)
    console.log(deck)
    
    return cartaTomada
}

//Esta función me permite saber el valor de la carta tomada

const valorCarta = (carta)=>{
    const valor = carta.slice(0,-1);
    return !isNaN(valor) ?  parseInt(valor)
            : (valor==='A') ? 11 
            : 10
}


/* ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ Algoritmo ¬¬¬¬¬¬¬¬¬¬¬¬*/

//1° Creo baraja
let miBaraja =crearDeck()

//2° LLamo a valorCarta pero esta vez no le paso un valor en duro como argumento, si no que le paso el valor del llamado a pedir carta

let resultado = valorCarta(pedirCarta())

console.log(typeof(resultado))
console.log(resultado)

