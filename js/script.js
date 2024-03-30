let listaExercicios = [];
let exercicioAtual = parseInt(localStorage.getItem('exercicioAtual')) || 0;
let offset = 0;
let timer;
let minutos = 0;
let segundos = 3;
let exercicioConcluido = parseInt(localStorage.getItem('exercicioConcluido')) || 0;
let isPaused = true; // controla o estado de pausa

const botaoExercicio = document.getElementById('exercise_completed');
const playPauseButton = document.getElementById('playPauseButton');
const resetButton = document.getElementById('reset');
const contador = document.getElementById('contador');
const nameExercicio = document.getElementById('name_exercicio');
const dificuldadeExercicio = document.getElementById('dificuldade_exercicio');
const descricaoExercicio = document.getElementById('descricao_exercicio');
const exercicioConcluidoButton = document.getElementById('exercise_completed');
const exercicioConcluidoText = document.getElementById('exercicio_concluido');
const toggleModeButton = document.getElementById('toggle-mode');
const htmlElement = document.documentElement;

//Modifica a cor do layout (dark / light)
toggleModeButton.addEventListener('click', () => {
    htmlElement.classList.toggle('light');
});


botaoExercicio.addEventListener('click', togglePlayPause);

function startPomodoro() {
    playPauseButton.disabled = false; // Habilita o botão de pause
    resetButton.disabled = false;

    // Verifica se o timer já está em execução antes de iniciar um novo
    if (!timer) {
        timer = setInterval(() => {
            if (!isPaused) { // Verifica se não está pausado
                if (segundos === 0) {
                    if (minutos === 0) {
                        clearInterval(timer);
                        playFinalSound(); // Reproduz som ao final do ciclo
                        // Mostrar exercício
                        exibirExercicio();
                        minutos = 0;
                        segundos = 3;
                        playPauseButton.disabled = true; // Desabilita o botão de pause
                        resetButton.disabled = true;
                        getExercises(); // Faz nova requisição à API
                        startRest(); // Inicia o timer de descanso de 5 minutos
                    } else {
                        minutos--;
                        segundos = 59;
                    }
                } else {
                    segundos--;
                }

                document.getElementById('minutos').innerText = minutos.toString().padStart(2, '0');
                document.getElementById('segundos').innerText = segundos.toString().padStart(2, '0');
            }
        }, 1000);
    }
}

function startRest() { // 5 minutos de descanso
    minutos = 0;
    segundos = 5;
    let restTimer = setInterval(() => {
        if (segundos === 0) {
            if (minutos === 0) {
                clearInterval(restTimer);
                playFinalSound(); // Reproduz som de alarme ao finalizar o descanso
                
            } else {
                minutos--;
                segundos = 59;
            }
        } else {
            segundos--;
        }

        document.getElementById('minutos').innerText = minutos.toString().padStart(2, '0');
        document.getElementById('segundos').innerText = segundos.toString().padStart(2, '0');
    }, 1000);
}

function togglePlayPause() {
    isPaused = !isPaused; // Inverte o estado de pausa
    if (isPaused) {
        playPauseButton.classList.remove('ph-pause-circle');
        playPauseButton.classList.add('ph-play-circle');
    } else {
        playPauseButton.classList.remove('ph-play-circle');
        playPauseButton.classList.add('ph-pause-circle');
        clearInterval(timer); // Limpa o timer atual
        timer = null; // Reinicia o timer
        startPomodoro(); // Inicia o novo timer
    }
}

function playFinalSound() {
    const finalSound = new Audio('assets/Bubble Bell Sound effect.mp3');
    finalSound.play();
}

function resetPomodoro() {
    clearInterval(timer);
    minutos = 25;
    segundos = 0;
    document.getElementById('minutos').innerText = minutos.toString().padStart(2, '0');
    document.getElementById('segundos').innerText = segundos.toString().padStart(2, '0');
    playPauseButton.classList.remove('ph-pause-circle'); // Resetar o ícone do botão
    playPauseButton.classList.add('ph-play-circle');
    playPauseButton.disabled = false;
    resetButton.disabled = true;
}

function exibirExercicio() {
    contador.innerText = exercicioAtual;
    nameExercicio.innerText = listaExercicios[exercicioAtual].name;
    dificuldadeExercicio.innerText = listaExercicios[exercicioAtual].difficulty;
    descricaoExercicio.innerText = listaExercicios[exercicioAtual].instructions;

    if (descricaoExercicio.innerText.trim() !== "") {
        descricaoExercicio.classList.add('show');
    } else {
        descricaoExercicio.classList.remove('show');
    }
}

function getExercises() {
    fetch("https://api.api-ninjas.com/v1/exercises?type=stretching&offset=" + offset, {
            method: 'GET',
            headers: { 'X-Api-Key': 'K0kHL8VPeAY1GSuXkX7OZXCqawQeUPLvpfWgxeYZ' }, // COLAR_KEY_API
            contentType: 'application/json',
        })
        .then(response => response.json())
        .then(dados => {
            listaExercicios = dados;

            // Salva a chamada da função getExercises() no localStorage
            localStorage.setItem('getExercisesUrl', "https://api.api-ninjas.com/v1/exercises?type=stretching&offset=" + offset);
            localStorage.setItem('getExercisesData', JSON.stringify(listaExercicios));
        })
        .catch(error => console.log(error));
}
getExercises();

exercicioConcluidoButton.addEventListener('click', () => {
  clearInterval(timer); // Limpa o timer atual, se houver
  minutos = 0; // Reinicia os minutos para 25
  segundos = 3; // Reinicia os segundos para 0
 
  togglePlayPause();

  exercicioConcluido++;
  exercicioConcluidoText.innerText = ` You completed ${exercicioConcluido} exercise`;

  // Salva a informação 'You completed X exercise' no localStorage
  localStorage.setItem('exercicioConcluido', exercicioConcluido);

  // Limpa as informações exibidas
  contador.innerText = "";
  nameExercicio.innerText = "";
  dificuldadeExercicio.innerText = "";
  descricaoExercicio.innerText = "";
});

// Recupera a URL e os dados da requisição do localStorage
const savedUrl = localStorage.getItem('getExercisesUrl');
const savedData = JSON.parse(localStorage.getItem('getExercisesData'));

console.log(savedUrl);
console.log(savedData);
