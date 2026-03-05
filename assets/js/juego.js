
/*
 2C = Two of Clubs (Tréboles)
 2D = Two of Diamonds (Diamantes o rombos)
 2H = Two of Hearts (Corazones)
 2S = Two of Spades (Espadas)

*/

/*Variables, arreglos*/

let deck = [];
const tipos = ['C','D', 'H', 'S']
const especiales = ['A','J', 'Q', 'K']

/*Funciones*/

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
    console.log({deck})
    deck = _.shuffle(deck)
    console.log({deck})

    return deck
}


let miBaraja =crearDeck()
console.log(miBaraja)