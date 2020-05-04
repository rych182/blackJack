let deck = [];
const tipos = ['C', 'D', 'H', 'S']; //corazones, diamantes, espadas, treboles
const especiales = ['A', 'J', 'Q', 'K'];

const crearDeck = () => {
    //Las cartas empiezan en 2
    for (let i = 2; i <= 10; i++) {
        //este for es para que le indiquemos los 4 tipos de carta en cada número
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    //Este for agrega al deck los aces, J,Q y K con sus diferentes tipos
    for (let tipo of tipos) {
        for (let especiale of especiales) {
            deck.push(especiale + tipo);
        }
    }
    //shuffle es una función de la libreria underscore.js que sirve para barajear las cartas, porque si no, siempre apareceran en orden
    deck = _.shuffle(deck);
    console.log(deck);
    return deck; // retornas deck para que en la siguiente función puedas descontar una carta del deck
}
crearDeck();

//Esta función me permite tomar una carta del deck y descontarla del deck
const pedirCarta = () => {

        if (deck.length === 0) {
            throw "No hay cartas en el deck"; // throw muestra un error en consola
        }

        const carta = deck.pop();

        console.log(deck);
        console.log(carta);
        return carta;
    }
    /*
    Verifica que vaya descontando una carta hasta que te quedes sin cartas
    for (let i = 0; i < 60; i++) {
        pedirCarta();
    }
    */
pedirCarta();

/*
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    let puntos = 0;
    //probamos si la carta tiene un número o una letra J,Q,K,A
    if (isNaN(valor)) {
        puntos = (valor === 'A') ? 11 : 10;
    } else {
        console.log("Es un número");
        //Se multiplica por 1, porque si no, nos regresa un string
        puntos = valor * 1;
    }
    console.log(puntos);
}
valorCarta('9D');
*/
//Codigo más elegante de la función "Valor carta", que usa el valor de la carta usando la función pedirCarta()

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10 :
        valor * 1;
}
const valor = valorCarta(pedirCarta());
console.log({ valor });