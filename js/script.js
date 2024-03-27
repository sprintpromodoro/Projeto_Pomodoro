let listaExercicios = [];
let exercicioAtual = 0;
let offset = 0;
let timer;
let minutos = 0;
let segundos = 3;
let exercicioConcluido = 0;

const botaoExercicio = document.getElementById('exercise_completed');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const contador = document.getElementById('contador');
const nameExercicio = document.getElementById('name_exercicio');
const dificuldadeExercicio = document.getElementById('dificuldade_exercicio');
const descricaoExercicio = document.getElementById('descricao_exercicio');
const exercicioConcluidoButton = document.getElementById('exercise_completed');
const exercicioConcluidoText = document.getElementById('exercicio_concluido');


botaoExercicio.addEventListener('click', () => {
  exibirExercicio();
  if(exercicioAtual === 9){
    offset = offset + 10;
    exercicioAtual = 0;
    getExercises();
    return;
  }
  exercicioAtual++;
});

function startPomodoro() {
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;

  // Limpar as informações exibidas
  contador.innerText = "";
  nameExercicio.innerText = "";
  dificuldadeExercicio.innerText = "";
  descricaoExercicio.innerText = "";

  timer = setInterval(() => {
    if (segundos === 0) {
      if (minutos === 0) {
        clearInterval(timer);
        playFinalSound(); // Reproduzir som ao final do ciclo
        // Mostrar exercício
        exibirExercicio();
        minutos = 0;
        segundos = 3;
        startButton.disabled = false;
        pauseButton.disabled = true;
        resetButton.disabled = true;
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

function playFinalSound() {
  const finalSound = new Audio('assets/Bubble Bell Sound effect.mp3');
  finalSound.play();
}

function pausePomodoro() {
  clearInterval(timer);
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resetPomodoro() {
  clearInterval(timer);
  minutos = 0;
  segundos = 3;
  document.getElementById('minutos').innerText = minutos.toString().padStart(2, '0');
  document.getElementById('segundos').innerText = segundos.toString().padStart(2, '0');
  startButton.disabled = false;
  pauseButton.disabled = true;
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
    headers: { 'X-Api-Key': 'COLAR-API_AQUI'},
    contentType: 'application/json',
  })
  .then(response => response.json())
  .then(dados => {
    listaExercicios = dados;
  })
  .catch(error => console.log(error));
}

exercicioConcluidoButton.addEventListener('click', () => {
  exercicioConcluido++;
  exercicioConcluidoText.innerText = ` You completed ${exercicioConcluido} exercise`;
  // Limpar as informações exibidas
  contador.innerText = "";
  nameExercicio.innerText = "";
  dificuldadeExercicio.innerText = "";
  descricaoExercicio.innerText = "";
  startPomodoro(); // Reiniciar o contador
});

getExercises();
