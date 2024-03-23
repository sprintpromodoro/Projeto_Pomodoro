let minutos = 0;
let segundos = 0;
let intervalo;

function iniciarPomodoro() {
    intervalo = setInterval(atualizarTempo, 1000);
}

function atualizarTempo() {
        segundos += 1;
        if (segundos === 60) {
            segundos = 0;
            minutos += 1;
        }

    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
    const segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;

    let timerElement = document.getElementById("timer");
    timerElement.innerText = `Tempo: ${minutosFormatados}:${segundosFormatados}`;
}


let timerElement = document.getElementById("timer");
timerElement.style.backgroundColor = "grey";
timerElement.style.padding = "20px";

// Criando o botão pausar
let botaoPausa = document.createElement("button");
botaoPausa.textContent = "Pausar";
botaoPausa.id = "pausar";
botaoPausa.style.display = "none"; // Escondido
const divPausa = document.getElementById("botaopausar");
divPausa.appendChild(botaoPausa);


document.getElementById("botaoiniciar").addEventListener("click", function () {
    iniciarPomodoro();
    botaoPausa.style.display = "inline"; // Mostrando o botão pausar a partir do iniciar
    this.disabled = true;
});


//  Criando os botões de continuar e reiniciar
let botaoContinuar = document.createElement("button");
botaoContinuar.textContent = "Continuar";
botaoContinuar.id = "continuar";
botaoContinuar.style.display = "none";
const divContinuar = document.getElementById("botaocontinuar");
divContinuar.appendChild(botaoContinuar);

let botaoReiniciar = document.createElement("button");
botaoReiniciar.textContent = "Reiniciar";
botaoReiniciar.id = "reiniciar";
botaoReiniciar.style.display = "none";
const divReiniciar = document.getElementById("botaoreiniciar");
divReiniciar.appendChild(botaoReiniciar);

// Criando a função da pausa e mostrando os outros botões
function criarPausa() {
    botaoPausa.addEventListener("click", function () {
        clearInterval(intervalo);
        botaoContinuar.style.display = "inline";
        botaoReiniciar.style.display = "inline";
    });

    return botaoPausa;
}

// Chamando a função
criarPausa();

// Criando a função do botão continuar
function criarContinuar() {
    botaoContinuar.addEventListener("click", function () {
        intervalo = setInterval(atualizarTempo, 1000);
    });
}

// Criando a função reiniciar
function criarReiniciar() {
    botaoReiniciar.addEventListener("click", function () {
        clearInterval(intervalo);
        minutos = 0;
        segundos = 0;
        atualizarTempo();
        botaoContinuar.style.display = "none";
        this.style.display = "none";
        botaoPausa.style.display = "none";

        document.getElementById("botaoiniciar").disabled = false;
    });
}

// chamando as funções dos botões
criarContinuar();
criarReiniciar();