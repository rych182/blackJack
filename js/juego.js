/*
C = Clubs(treboles)
D = Diamonds
H = Hearts
S = Spades
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S']; //corazones, diamantes, espadas, treboles
const especiales = ['A', 'J', 'Q', 'K'];
//Estas vasriables las usaré para saber cuantos puntos se van sumando
let puntosJugador = 0;
let puntosComputadora = 0;



//Referencias del html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHtml = document.querySelectorAll('small');


//Función que crea un nuevo Deck
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

        return carta;
    }
    /*
    Usa estos console.log para verificar los datos que regresan, ponlos antes del return
    console.log(deck);
    console.log(carta);

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

//Codigo más elegante de la función "Valor carta", que usa el valor de la carta usando la función pedirCarta()
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10 :
        valor * 1;
}
const valor = valorCarta(pedirCarta());
console.log({ valor });
*/
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10 :
        valor * 1;
}

//Turno de la computadora, cuando el jugador pierde, alcance los 21 ó presione el boton detener
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        //[1] porque es el segundo small
        puntosHtml[1].innerText = puntosComputadora;

        //Debo de crear esto: <img class="carta" src="assets/cartas/2H.png" alt="">
        const imgCarta = document.createElement('img');
        //Aquí le agrego la dirección de la url donde está mi carta
        imgCarta.src = `assets/cartas/${carta}.png`;
        //Aquí agrego la clase que modifica la imagen
        imgCarta.classList.add('carta');
        //Aquí agrego donde quiero que aparezca
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
}


//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    //Le puse 0 porque hay dos etiquetas html small
    puntosHtml[0].innerText = puntosJugador;
    //Debo de crear esto: <img class="carta" src="assets/cartas/2H.png" alt="">
    const imgCarta = document.createElement('img');
    //Aquí le agrego la dirección de la url donde está mi carta
    imgCarta.src = `assets/cartas/${carta}.png`;
    //Aquí agrego la clase que modifica la imagen
    imgCarta.classList.add('carta');

    //Aquí agrego donde quiero que aparezca
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Lo siento, has perdido');
        btnPedir.disabled = true;
        //cuando supere los 21 
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, genial!');
        btnPedir.disabled = true;
        //cuando supere los 21 
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    //Necesito detener estos 2 botones
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    //llamo al turno de la computadora, donde
    turnoComputadora(puntosJugador);
});