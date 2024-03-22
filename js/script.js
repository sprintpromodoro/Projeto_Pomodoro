let minutos = 0;
let segundos = 0;

function atualizarTempo () {
    segundos += 1;
    if (segundos === 60){
        segundos = 0;
        minutos += 1;
    }

    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
    const segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;

    let timerElement = document.getElementById("timer");
    timerElement.innerText = `Tempo: ${minutosFormatados}:${segundosFormatados}`;}


    let timerElement = document.getElementById("timer");
    timerElement.style.backgroundColor = "grey";
    timerElement.style.padding = "20px";


document.getElementById("botaoiniciar").addEventListener("click", function() {
    let intervalo = setInterval(atualizarTempo, 1000);

    setTimeout(() => {
        clearInterval(intervalo);
        console.log("Acabou o timer;");
    }, 1500000); 
});

