/*
C = Clubs(treboles)
D = Diamonds
H = Hearts
S = Spades
*/

(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S']; //corazones, diamantes, espadas, treboles
    const especiales = ['A', 'J', 'Q', 'K'];
    //Estas vasriables las usaré para saber cuantos puntos se van sumando
    //let puntosJugador = 0;
    //let puntosComputadora = 0;
    let puntosJugadores = [];


    //Referencias del html
    const btnNuevo = document.querySelector('#btnNuevo');
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const divCartasJugadores = document.querySelectorAll('.divCartas');
    const puntosHtml = document.querySelectorAll('small');

    //Esta función inicializa el juego    
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        //puntosHtml.forEach(elem => elem.innerHTML = 0); Es lo mismo que
        //puntosHtml[0].innerText = 0;
        //puntosHtml[1].innerText = 0;
        //forEach nos permite ejecutar un callback por cda elemento que se encuentre en cada puntosHtml
        puntosHtml.forEach(elem => elem.innerHTML = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    //Función que crea un nuevo Deck
    const crearDeck = () => {
        deck = [];
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
        return _.shuffle(deck); // retornas deck para que en la siguiente función puedas descontar una carta del deck
    }
    crearDeck();

    //Esta función me permite tomar una carta del deck y descontarla del deck
    const pedirCarta = () => {
            if (deck.length === 0) {
                throw "No hay cartas en el deck"; // throw muestra un error en consola
            }
            return deck.pop();
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

    // Turno 0 = primer jugador y el último será la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    //Uso la carta y el turno de la persona que está jugando
    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        //Aquí va el div de la carta que se va a crear, en la posición del turno que corresponde
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;


        setTimeout(() => { //Lo uso para que aparezcan primero las cartas de la computadora antes que el alert
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana =/');
            } else if (puntosMinimos > 21) {
                alert("La computadora gana");
            } else if (puntosComputadora > 21) {
                alert('JUgador Gana!!');
            } else {
                alert("COmputadora Gana!");
            }
        }, 10);
    }

    //Turno de la computadora, cuando el jugador pierde, alcance los 21 ó presione el boton detener
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;
        do {
            const puntosComputadora = 0;
            const carta = pedirCarta();
            //Se le pone puntosJugadores.length porque no sabemos el número de jugadores que haya dentro del arreglo puntosJugadores[]
            //Se le pone el -1 porque al usar .length empezará a contar las posiciones desde el 1, pero los arreglos comienzan en 0, entonces se le resta 1
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    }

    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0); //por ser el primer jugador

        if (puntosJugador > 21) {
            console.warn('Lo siento, has perdido');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            //cuando supere los 21 
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
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

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    })
})();