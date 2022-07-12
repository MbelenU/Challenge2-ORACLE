;(function(){
'use strict'

// Obtiene y guarda el listado de palabras en el localSrage
var palabras

if (localStorage.getItem("palabras")) {
  palabras =  JSON.parse(localStorage.palabras)
} else {
    palabras = [
        "ALURA",
        "PROGRAMA",
        "JAVA",
        "CODIGO",
        "AHORCADO",
        "SCRIPT",
        "COMPILAR"
    ]
    localStorage.setItem("palabras", JSON.stringify(palabras))
} 

// Funcion para gregar palabras al listado de palabras
window.agregarPalabra = function agregarPalabra(termino){

    termino = termino.toUpperCase();
    
    // Validar que no venga vacio, sea mayor a 2 letras y menor a 8
    if (!termino || termino.length <=2 || termino.length > 8) {
        alert("No menor de 3 y mayor a 8 letras. ");
        return;
    } 
    // Verifica si la palabra ya esta registrada en el listado de palabras
    if (palabras.indexOf(termino) >= 0) {
        alert("La palabra ya esta registrada. ");
        return false;    
    }
    // Valida que no haya caracteres especiales
    if  (!/^[A-ZÑ]+$/m.test(termino)) {
        alert("No se permiten caracteres especiales. ");
        return false;
    }
    // Borra y sustituye el localStorage, al almacenar mas de 10 palabras, volviendo a las palabras originales 
    if(palabras.length > 10){
        localStorage.clear();
        palabras.length = 7;
    }
    // Agrega la palabra luego de validar los if y tambien la agrega al localStorage
    palabras.push(termino);
    localStorage.setItem("palabras", JSON.stringify(palabras))
    // Inicia el juego al guardar la nueva palabra en el grupo de palabras
    llamarJuego();
    return;  
}

// Funcion para llamar la pagina principal, luego de guardar la nueva palabra
function llamarJuego(){
    window.location.href="programa.html";
}

// variable para almacenar la configuracion actual
var juego = null
// para ver si ya se ha enviado alguna alerta
var finalizado = false


var $html = {
  hombre: document.getElementById('hombre'),
  adivinado: document.querySelector('.adivinado'),
  errado: document.querySelector('.errado')
}

function dibujar(juego) {
  // Actualizar la imagen del hombre
  var $elem
  $elem = $html.hombre

  var estado = juego.estado
  if (estado === 8) {
    estado = juego.previo
  }
  $elem.src = './estados/0' + juego.estado + '.png'

  // Creamos las letras adivinadas
  var palabra = juego.palabra
  var adivinado = juego.adivinado
  $elem = $html.adivinado
  // borramos los elementos anteriores
  $elem.innerHTML = ''
  for (let letra of palabra) {
    let $span = document.createElement('span')
    let $txt = document.createTextNode('')
    if (adivinado.has(letra)) {
      $txt.nodeValue = letra
    }
    $span.setAttribute('class', 'letra adivinada')
    $span.appendChild($txt)
    $elem.appendChild($span)
  }

  // Creamos las letras erradas
  var errado = juego.errado
  $elem = $html.errado
  // Borramos los elementos anteriores
  $elem.innerHTML = ''
  for (let letra of errado) {
    let $span = document.createElement('span')
    let $txt = document.createTextNode(letra)
    $span.setAttribute('class', 'letra errada')
    $span.appendChild($txt)
    $elem.appendChild($span)
  }
}

function adivinar(juego, letra) {
  var estado = juego.estado
  // Si ya se ha perdido, o ganado, no hay que hacer nada
  if (estado === 1 || estado === 8) {
    return
  }

  var adivinado = juego.adivinado
  var errado = juego.errado
  // Si ya hemos adivinado o errado la letra, no hay que hacer nada
  if (adivinado.has(letra) || errado.has(letra)) {
    return
  }

  var palabra = juego.palabra
  var letras = juego.letras
  // Si es letra de la palbra
  if (letras.has(letra)) {
    // agregamos a la lista de letras adivinadas
    adivinado.add(letra)
    // actualizamos las letras restantes
    juego.restante--

    // Si ya se ha ganado, debemos indicarlo
    if (juego.restante === 0) {
      juego.previo = juego.estado
      juego.estado =  8
    }
  } else {
    // Si no es letra de la palabra, acercamos al hombre un paso más de su ahorca
    juego.estado--
    // Agregamos la letra, a la lista de letras erradas
    errado.add(letra)
  }
}

window.onkeypress = function adivinarLetra(e) {
  var letra = e.key
  letra = letra.toUpperCase()
  if (/[^A-ZÑ]/.test(letra)) {
    return
  }
  adivinar(juego, letra)
  var estado = juego.estado
  if (estado === 8 && !finalizado) {
    setTimeout(alertaGanado, 0)
    finalizado = true
  }else if (estado === 1 && !finalizado) {
    let palabra = juego.palabra
    let fn = alertaPerdido.bind(undefined, palabra)
    setTimeout(fn, 0)
    finalizado = true
  }
  dibujar(juego)
}

window.nuevoJuego = function nuevoJuego() {
  var palabra = palabraAleatoria()
  juego = {}
  juego.palabra = palabra
  juego.estado = 7
  juego.adivinado = new Set()
  juego.errado = new Set()
  finalizado = false

  var letras = new Set()
  for (let letra of palabra) {
    letras.add(letra)
  }
  juego.letras = letras
  juego.restante = letras.size

  dibujar(juego)
  console.log(juego)
}


function palabraAleatoria() {
  var index = ~~(Math.random() * palabras.length)
  return palabras[index]
}

function alertaGanado() {
  alert('Felicidades, ganaste!')
}

function alertaPerdido(palabra) {
  alert('Lo siento, perdiste... la palabra era: ' + palabra)
}

nuevoJuego()

}())