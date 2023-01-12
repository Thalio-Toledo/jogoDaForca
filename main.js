let vidas = 6;
let palavraArray;
let letraDigitadas = [];
let letraDigitadasFiltro = [];
//let palavraCompleta = []

let body = document.querySelector('body')
let divConteiner = document.querySelector('div');
body.appendChild(divConteiner)

function iniciarGame() {
    let palavra = prompt("Digite uma palavra");
    desenharTela(palavra)
}

function desenharTela(palavra) {
    let campos = palavra.split("")
    palavraArray = campos
    desenharCampos(palavraArray)
    retirarBotaoTela()
    desenharInputPegaLetra()
    desenharVida(vidas)
    desenharCampoLetras()
}

function desenharVida(vidas) {
    for (let i = 0; i < vidas; i++) {
        let heart = document.createElement('i')
        heart.setAttribute("class", "fa-solid fa-heart")
        divGame = document.querySelector('#game2')
        divGame.appendChild(heart)
    }
}

function deletarVida() {
    let heart = document.querySelector('i');
    heart.parentNode.removeChild(heart);
}

function resetarGame() {
    document.location.reload(true);
}

function desenharInputPegaLetra() {
    let divLetra = document.querySelector('#divLetra')
    let input = document.createElement('input')
    input.value.toUpperCase()
    input.setAttribute("maxlength", "1")
    input.setAttribute('placeholder', 'Digite uma letra')
    input.setAttribute("id", "letraInput")
    divLetra.appendChild(input);
    let letraUpper = document.querySelector("#letraInput").value
    //console.log(letraUpper)
    desenharBotao()
}

function desenharCampos(campos) {
    let i = 0;
    campos.forEach((campo, i) => {
        let p = document.createElement('p')
        p.setAttribute("id", `p${i++}`);
        if (campo == ' ') {
            p.innerHTML = ' - '
        } else {
            p.innerHTML = ` _ `
        }

        divConteiner.appendChild(p)
    });
}

function desenharBotao() {
    let btnVerificar = document.createElement('button')
    btnVerificar.innerHTML = "Verificar";
    btnVerificar.setAttribute("class", "btn btn-warning")
    btnVerificar.setAttribute("id", "btnVerificar")
    divLetra.appendChild(btnVerificar);
    btnVerificar.setAttribute("onClick", "verificarLetra()")
}

function desenharCampoLetras() {
    let letra = document.createElement('p')
    letra.setAttribute('id', 'l1')
    divGame = document.querySelector('#game3')
    divGame.appendChild(letra)
}

function desenharLetrasDigitadas() {

    let letra2 = document.querySelector('#l1')
    letra2.innerHTML = ` ${letraDigitadasFiltro}`


}

function retirarBotaoTela() {
    let btnStart = document.querySelector("#start");
    btnStart.parentNode.removeChild(btnStart);
}

function verificarLetra() {
    let letraValor = document.querySelector("#letraInput").value
    letraDigitadas.push(letraValor)
    filtrarArrayLetras(letraDigitadas)
    desenharLetrasDigitadas()
    if (letraValor) {
        existeLetra(palavraArray, letraValor)
        trocarLetra(palavraArray, letraValor)
        verificarVidas(vidas)
        let letraValor1 = document.querySelector("#letraInput").value = ""
        verificarPalavraCompleta()
    }
}

function trocarLetra(palavraArray, letraValor) {
    let i = 0;
    palavraArray.forEach((letra, i) => {

        if (letra.toUpperCase() === letraValor.toUpperCase()) {

            let p = document.querySelector(`#p${i++}`)
            p.innerHTML = `${letra}`
        }

    })
}

function existeLetra(palavraArray, letraValue) {
    let existe = palavraArray.some(l => l == letraValue)

    if (!existe) {
        vidas--
        deletarVida()
    }
}

function verificarVidas(vidas) {
    if (vidas <= 0) {
        btnVerificar = document.querySelector('#btnVerificar')
        btnVerificar.setAttribute("disabled", "disabled");
        confirm("Game Over")
    }
}

function filtrarArrayLetras(letraDigitadas) {
    letraDigitadas.sort()
    letraDigitadasFiltro = letraDigitadas.filter((letra, index, self) => {
        return index === self.indexOf(letra)
    })

}


function verificarPalavraCompleta() {
    let palavraCompleta = document.querySelectorAll("#game1 p")
    let palavraComparacao = [];
    for (let i = 0; i < palavraCompleta.length; i++) {
        palavraComparacao.push(palavraCompleta[i].getInnerHTML())

    }
    if(JSON.stringify(palavraArray) == JSON.stringify(palavraComparacao)){
        alert("You win")
    };
}