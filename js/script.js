let listaExercicios = [];
let exercicioAtual = 0;
let offset = 0;
let timer;
let minutos = 0;
let segundos = 3;
let exercicioConcluido = 0;
let isPaused = true; // Adicionado para controlar o estado de pausa

const botaoExercicio = document.getElementById('exercise_completed');
const playPauseButton = document.getElementById('playPauseButton');
const resetButton = document.getElementById('reset');
const contador = document.getElementById('contador');
const nameExercicio = document.getElementById('name_exercicio');
const dificuldadeExercicio = document.getElementById('dificuldade_exercicio');
const descricaoExercicio = document.getElementById('descricao_exercicio');
const exercicioConcluidoButton = document.getElementById('exercise_completed');
const exercicioConcluidoText = document.getElementById('exercicio_concluido');

botaoExercicio.addEventListener('click', togglePlayPause);

function startPomodoro() {
  playPauseButton.disabled = false; // Habilitar o botão de pause
  resetButton.disabled = false;

  // Verificar se o timer já está em execução antes de iniciar um novo
  if (!timer) {
    timer = setInterval(() => {
      if (!isPaused) { // Verificar se não está pausado
        if (segundos === 0) {
          if (minutos === 0) {
            clearInterval(timer);
            playFinalSound(); // Reproduzir som ao final do ciclo
            // Mostrar exercício
            exibirExercicio();
            minutos = 0;
            segundos = 3;
            playPauseButton.disabled = true; // Desabilitar o botão de pause
            resetButton.disabled = true;
            getExercises(); // Fazer nova requisição à API
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


function togglePlayPause() {
  isPaused = !isPaused; // Inverter o estado de pausa
  if (isPaused) {
    playPauseButton.classList.remove('ph-pause-circle');
    playPauseButton.classList.add('ph-play-circle');
  } else {
    playPauseButton.classList.remove('ph-play-circle');
    playPauseButton.classList.add('ph-pause-circle');
    clearInterval(timer); // Limpar o timer atual
    timer = null; // Reiniciar o timer
    startPomodoro(); // Iniciar o novo timer
  }
}

function playFinalSound() {
  const finalSound = new Audio('assets/Bubble Bell Sound effect.mp3');
  finalSound.play();
}

function resetPomodoro() {
  clearInterval(timer);
  minutos = 0;
  segundos = 3;
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

function getExercises(){
  fetch("https://api.api-ninjas.com/v1/exercises?type=stretching&offset=" + offset,{
    method: 'GET',
    headers: { 'X-Api-Key': 'r5MkIilLYj0N864W9tgEcF3AYgmhiNUSeQ8lR3xF'},
    contentType: 'application/json',
  })
  .then(response => response.json())
  .then(dados => {
    listaExercicios = dados;
  })
  .catch(error => console.log(error));
}
getExercises();

exercicioConcluidoButton.addEventListener('click', () => {
  togglePlayPause(); // Iniciar o timer

  // Incrementar o exercício atual e verificar se precisa obter uma nova lista de exercícios
  if (exercicioAtual === listaExercicios.length - 1) {
    offset += 10; // Incrementar o offset para obter novos exercícios da API
    exercicioAtual = 0; // Resetar o índice do exercício atual
    getExercises(); // Obter uma nova lista de exercícios da API
  } else {
    exercicioAtual++; // Incrementar o exercício atual
  }

  // Exibir o próximo exercício na tela
  exibirExercicio();

  exercicioConcluido++;
  exercicioConcluidoText.innerText = ` You completed ${exercicioConcluido} exercise`;
  // Limpar as informações exibidas
  contador.innerText = "";
  nameExercicio.innerText = "";
  dificuldadeExercicio.innerText = "";
  descricaoExercicio.innerText = "";
});




