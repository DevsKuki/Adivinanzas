// Configuración inicial y variables globales
let gameStarted = false;
let currentScore = 0;
let currentLives = 3;
let currentRiddle = 0;
let streak = 0;
let maxStreak = 0;
let timer;
let timeLeft;
let difficulty = 'easy';
let powerups = {
    skip: 1,
    fifty: 1,
    hint: 1
};

const difficultySettings = {
    easy: { time: 30, lives: 3 },
    medium: { time: 20, lives: 2 },
    hard: { time: 15, lives: 1 }
};

const riddles = [
    {
        question: "Blanco por dentro, verde por fuera. Si quieres que te lo diga, espera.",
        options: ["Pera", "Palta", "Manzana"],
        correct: 0, // Pera es la respuesta correcta
        hint: "Es una fruta verde y jugosa"
    },
    {
        question: "Oro parece, plata no es, el que no lo adivine bien tonto es.",
        options: ["Oro", "Plátano", "Cobre"],
        correct: 1, // Plátano es la respuesta correcta
        hint: "Es una fruta amarilla"
    },
    {
        question: "¿Qué cosa es que cuanto más le quitas más grande es?",
        options: ["Montaña", "Agujero", "Río"],
        correct: 2, // Agujero es la respuesta correcta
        hint: "Mientras más excavas..."
    },
    {
        question: "Se mira pero no se toca. ¿Qué es?",
        options: ["Ventana", "Cristal", "Espejo"],
        correct: 0, // Ventana es la respuesta correcta
        hint: "Refleja lo que está frente a él"
    },
    {
        question: "Soy redondo y con colores, cuando me lanzan vuelo alto entre jugadores. ¿Qué soy?",
        options: ["Pelota", "Balón", "Bola"],
        correct: 1, // Balón es la respuesta correcta
        hint: "Usado en deportes como el fútbol o baloncesto"
    },
    {
        question: "Tengo dientes y no muerdo, ayudo a tu cabello a estar suelto. ¿Qué soy?",
        options: ["Cepillo", "Peine", "Tijeras"],
        correct: 2, // Tijeras es la respuesta correcta
        hint: "Lo usas para cortar el cabello"
    },
    {
        question: "Vuelo sin alas, tengo pico pero no como. ¿Qué soy?",
        options: ["Helicóptero", "Pájaro", "Avión"],
        correct: 0, // Helicóptero es la respuesta correcta
        hint: "Es un medio de transporte aéreo"
    },
    {
        question: "Tengo cuello pero no cabeza, y llevo líquidos con destreza. ¿Qué soy?",
        options: ["Jarra", "Botella", "Vaso"],
        correct: 1, // Botella es la respuesta correcta
        hint: "Contenedor de líquidos"
    },
    {
        question: "Cuando estoy joven soy verde, cuando maduro soy rojo, y cuando me marchito soy negro. ¿Qué soy?",
        options: ["Pimiento", "Tomate", "Manzana"],
        correct: 0, // Pimiento es la respuesta correcta
        hint: "Fruta/verdura que cambia de color con el tiempo"
    },
    {
        question: "Llevo ropa por dentro y botones por fuera. ¿Qué soy?",
        options: ["Almohada", "Camiseta", "Chaqueta"],
        correct: 2, // Chaqueta es la respuesta correcta
        hint: "Objeto usado para dormir"
    },
    {
        question: "Soy amarillo y llevo una corona. ¿Qué soy?",
        options: ["Piña", "Banana", "Mango"],
        correct: 1, // Banana es la respuesta correcta
        hint: "Fruta tropical con una corona"
    },
    {
        question: "Aunque soy muy calentito, si te acerco demasiado, te quito lo bonito. ¿Qué soy?",
        options: ["Sol", "Fuego", "Estufa"],
        correct: 2, // Estufa es la respuesta correcta
        hint: "La fuente de calor más grande que conocemos"
    },
    {
        question: "No tengo pies pero corro sin descanso. ¿Qué soy?",
        options: ["Río", "Viento", "Agua"],
        correct: 1, // Viento es la respuesta correcta
        hint: "Fluye y no se detiene"
    },
    {
        question: "Cuanto más me quitas, más grande soy. ¿Qué soy?",
        options: ["Hoyo", "Vacío", "Bajo"],
        correct: 0, // Hoyo es la respuesta correcta
        hint: "Lo excavas y se hace más grande"
    },
    {
        question: "Tengo orejas largas y salto sin parar. ¿Qué soy?",
        options: ["Sapo", "Liebre", "Conejo"],
        correct: 2, // Conejo es la respuesta correcta
        hint: "Animal pequeño y rápido"
    },
    {
        question: "Duermo todo el invierno y despierto para comer miel. ¿Qué soy?",
        options: ["Oso", "Murciélago", "Abeja"],
        correct: 1, // Murciélago es la respuesta correcta
        hint: "Animal que hiberna durante el invierno"
    },
    {
        question: "Me tocas para llamar y no soy un teléfono. ¿Qué soy?",
        options: ["Campana", "Botón", "Piano"],
        correct: 0, // Campana es la respuesta correcta
        hint: "Se usa en las iglesias"
    },
    {
        question: "En la mesa estoy y nunca me como, aunque ayudo a cortar. ¿Qué soy?",
        options: ["Cuchillo", "Cuchara", "Tenedor"],
        correct: 1, // Cuchara es la respuesta correcta
        hint: "Se usa para cortar comida"
    },
    {
        question: "Tengo patas pero no camino, respaldo pero no me canso. ¿Qué soy?",
        options: ["Mesa", "Silla", "Cama"],
        correct: 0, // Mesa es la respuesta correcta
        hint: "Objeto que se usa para sentarse"
    },
    {
        question: "Tengo hojas pero no soy un árbol, y guardo palabras. ¿Qué soy?",
        options: ["Libro", "Cuaderno", "Revista"],
        correct: 1, // Cuaderno es la respuesta correcta
        hint: "Objeto que se lee"
    },
    {
        question: "Soy pequeño, redondo y tengo un color brillante. Si me comes, es dulce y refrescante. ¿Qué soy?",
        options: ["Uva", "Frambuesa", "Cereza"],
        correct: 2, // Cereza es la respuesta correcta
        hint: "Fruto que se come en racimos"
    },
    {
        question: "Aunque me quemas, nunca muero, y aunque soy fuerte, me extingo con agua. ¿Qué soy?",
        options: ["Fuego", "Viento", "Sol"],
        correct: 0, // Fuego es la respuesta correcta
        hint: "Elemento peligroso"
    },
    {
        question: "Soy móvil y llevo aplicaciones, pero si me pierdes, te llevas lamentaciones. ¿Qué soy?",
        options: ["Celular", "Tablet", "Computadora"],
        correct: 1, // Tablet es la respuesta correcta
        hint: "Dispositivo que usamos a diario"
    },
    {
        question: "No tengo vida pero puedo mostrarte el mundo entero. ¿Qué soy?",
        options: ["Mapa", "Globo", "Enciclopedia"],
        correct: 2, // Enciclopedia es la respuesta correcta
        hint: "Objeto que ayuda a orientarse"
    },
    {
        question: "Aunque no tengo boca, hablo en silencio y envío mensajes sin palabras. ¿Qué soy?",
        options: ["Mensaje de texto", "Correo", "Nota"],
        correct: 0, // Mensaje de texto es la respuesta correcta
        hint: "Se usa para comunicarte sin hablar"
    },
    {
        question: "Soy la reina de los mares y tengo una perla en mi interior. ¿Qué soy?",
        options: ["Ostra", "Caracol", "Erizo"],
        correct: 2, // Erizo es la respuesta correcta
        hint: "Animal marino con una joya dentro"
    },
    {
        question: "Si me buscas por la noche, nunca me encontrarás, porque ilumino el día. ¿Qué soy?",
        options: ["Sol", "Luna", "Estrella"],
        correct: 1, // Luna es la respuesta correcta
        hint: "Es el centro de nuestro sistema solar"
    },
    {
        question: "Soy de metal, tengo alas y llevo a muchos a volar. ¿Qué soy?",
        options: ["Avión", "Helicóptero", "Cometa"],
        correct: 0, // Avión es la respuesta correcta
        hint: "Medio de transporte aéreo"
    },
    {
        question: "Soy una fruta roja con pequeñas semillas y mi nombre rima con pasión. ¿Qué soy?",
        options: ["Granada", "Fresa", "Cereza"],
        correct: 0, // Granada es la respuesta correcta
        hint: "Fruta con muchas semillas en su interior"
    },
    {
        question: "Es un animal muy lento que lleva su casa a cuestas. ¿Qué es?",
        options: ["Tortuga", "Caracol", "Erizo"],
        correct: 2, // Erizo es la respuesta correcta
        hint: "Se desplaza muy lentamente"
    },
    {
        question: "Tiene orejas largas y salta muy rápido. ¿Quién es?",
        options: ["Liebre", "Sapo", "Conejo"],
        correct: 1, // Liebre es la respuesta correcta
        hint: "Animal pequeño y rápido"
    },
    {
        question: "Es el rey de la selva. ¿Quién es?",
        options: ["León", "Tigre", "Pantera"],
        correct: 0, // León es la respuesta correcta
        hint: "Rey de la jungla"
    },
    {
        question: "Vuela de noche, duerme de día, y cuelga boca abajo. ¿Qué es?",
        options: ["Murciélago", "Lechuza", "Búho"],
        correct: 2, // Búho es la respuesta correcta
        hint: "Animal nocturno"
    },
    {
        question: "Es pequeño y verde, salta por el agua y canta por la noche. ¿Quién es?",
        options: ["Sapo", "Salamandra", "Rana"],
        correct: 0, // Sapo es la respuesta correcta
        hint: "Es un anfibio que vive cerca del agua"
    }
].sort(() => Math.random() * 0.5);


// Funciones del juego
function setDifficulty(level) {
    difficulty = level;
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === level) {
            btn.classList.add('active');
        }
    });
    restartGame();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = difficultySettings[difficulty].time;
    const timerBar = document.getElementById('timer-bar');

    timer = setInterval(() => {
        timeLeft--;
        timerBar.style.width = `${(timeLeft / difficultySettings[difficulty].time) * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleWrongAnswer();
        }
    }, 1000);
}

function updateLives() {
    const livesContainer = document.getElementById('lives');
    livesContainer.innerHTML = '❤️'.repeat(currentLives);
}

function updateProgress() {
    const progress = document.getElementById('progress');
    progress.style.width = `${(currentRiddle / riddles.length) * 100}%`;
}

function showBonusPoints(points, x, y) {
    const bonus = document.createElement('div');
    bonus.className = 'bonus-points';
    bonus.textContent = `+${points}`;
    bonus.style.left = `${x}px`;
    bonus.style.top = `${y}px`;
    document.body.appendChild(bonus);
    setTimeout(() => bonus.remove(), 1000);
}

function usePowerup(type) {
    if (powerups[type] <= 0) return;

    powerups[type]--;
    document.getElementById(`${type}-btn`).disabled = true;

    switch (type) {
        case 'skip':
            nextRiddle();
            break;
        case 'fifty':
            const options = document.querySelectorAll('.option-btn');
            const correct = riddles[currentRiddle].correct;
            let removed = 0;
            let i = 0;
            while (removed < 1) {
                if (i !== correct && Math.random() > 0.5) {
                    options[i].style.display = 'none';
                    removed++;
                }
                i = (i + 1) % options.length;
            }
            break;
        case 'hint':
            const feedback = document.getElementById('feedback');
            feedback.textContent = riddles[currentRiddle].hint;
            feedback.style.color = 'var(--warning-color)';
            break;
    }
}

function handleCorrectAnswer(button) {
    clearInterval(timer);
    button.classList.add('correct');

    const timeBonus = Math.floor(timeLeft / 2);
    currentScore+=+timeBonus;
    streak++;
    maxStreak = Math.max(maxStreak, streak);

    if (streak >= 3) {
        document.getElementById('streak').style.display = 'block';
        document.getElementById('streak-count').textContent = streak;
    }
    const rect = button.getBoundingClientRect();
    showBonusPoints(currentScore, rect.right, rect.top);

    document.getElementById('score').textContent = currentScore;
    document.getElementById('feedback').textContent = '¡Excelente!';
    document.getElementById('feedback').style.color = 'green';

    setTimeout(nextRiddle, 1000);
}

function handleWrongAnswer() {
    clearInterval(timer);
    currentLives--;
    streak = 0;
    document.getElementById('streak').style.display = 'none';
    updateLives();

    if (currentLives <= 0) {
        document.getElementById('final-score-lose').textContent = currentScore;
        document.getElementById('lose-modal').style.display = 'flex';
        return;
    }

    document.getElementById('feedback').textContent = '¡Incorrecto!';
    document.getElementById('feedback').style.color = 'red';
    setTimeout(nextRiddle, 1000);
}

function checkAnswer(selectedIndex, button) {
    const riddle = riddles[currentRiddle];

    if (selectedIndex === riddle.correct) {
        handleCorrectAnswer(button);
    } else {
        button.classList.add('incorrect');
        handleWrongAnswer();
    }
}

function nextRiddle() {
    currentRiddle++;
    if (currentRiddle >= riddles.length) {
        document.getElementById('final-score').textContent = currentScore;
        document.getElementById('max-streak').textContent = maxStreak;
        document.getElementById('win-modal').style.display = 'flex';
        return;
    }

    updateProgress();
    showRiddle();
}

function showRiddle() {
    const riddleElement = document.getElementById('riddle');
    const optionsElement = document.getElementById('options');
    const feedbackElement = document.getElementById('feedback');
    const riddle = riddles[currentRiddle];

    feedbackElement.textContent = '';
    riddleElement.textContent = riddle.question;
    optionsElement.innerHTML = '';

    riddle.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(index, button);
        optionsElement.appendChild(button);
    });

    startTimer();
}

function restartGame() {
    currentScore = 0;
    currentLives = difficultySettings[difficulty].lives;
    currentRiddle = 0;
    streak = 0;
    maxStreak = 0;
    powerups = { skip: 1, fifty: 1, hint: 1 };

    document.getElementById('score').textContent = currentScore;
    document.getElementById('streak').style.display = 'none';
    updateLives();
    updateProgress();

    document.querySelectorAll('.powerup-btn').forEach(btn => {
        btn.disabled = false;
    });

    document.getElementById('win-modal').style.display = 'none';
    document.getElementById('lose-modal').style.display = 'none';

    showRiddle();
}
// Evento que se ejecuta cuando el documento está listo
document.addEventListener('DOMContentLoaded', () => {
    // Barajar las adivinanzas al inicio
    riddles.sort(() => Math.random() - 0.5);
    // Iniciar el juego
    const powerupButtons = document.querySelectorAll('.powerup-btn');
    powerupButtons.forEach(button => {
        button.disabled = true;
    });
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    difficultyButtons.forEach(button => {
        button.disabled = true;
    });
    // Configurar la interfaz inicial sin iniciar el juego
    currentLives = difficultySettings[difficulty].lives;
    updateLives();
    updateProgress();
    document.getElementById('score').textContent = currentScore;

    // Mostrar la primera adivinanza solo después de presionar "Start"
    document.getElementById('start-btn').disabled = false;
    document.getElementById('stop-btn').disabled = true;

});

// Función para manejar eventos de teclado (opcional)
document.addEventListener('keydown', (event) => {
    const options = document.querySelectorAll('.option-btn');
    if (options.length) {
        if (event.key === '1') options[0].click();
        if (event.key === '2' && options[1]) options[1].click();
        if (event.key === '3' && options[2]) options[2].click();
    }
});


// Función para iniciar el juego
function startGame() {
    if (gameStarted) return;

    gameStarted = true;
    document.getElementById('start-btn').disabled = true;
    document.getElementById('stop-btn').disabled = false;
    const powerupButtons = document.querySelectorAll('.powerup-btn');
    powerupButtons.forEach(button => {
        button.disabled = false;
    });
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    difficultyButtons.forEach(button => {
        button.disabled = false;
    });
    restartGame();
}

// Función para detener el juego
function stopGame() {
    if (!gameStarted) return;

    gameStarted = false;
    clearInterval(timer); // Detener el temporizador
    document.getElementById('start-btn').disabled = false;
    document.getElementById('stop-btn').disabled = true;

    // Reiniciar la interfaz
    document.getElementById('riddle').textContent = '';
    document.getElementById('options').innerHTML = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('timer-bar').style.width = '0%';
    document.getElementById('progress').style.width = '0%';
    document.getElementById('lives').innerHTML = '';
    document.getElementById('score').textContent = '0';
    document.getElementById('streak').style.display = 'none';
    powerups = { skip: 1, fifty: 1, hint: 1 };

    document.querySelectorAll('.powerup-btn').forEach(btn => {
        btn.disabled = false;
    });


    document.getElementById('win-modal').style.display = 'none';
    document.getElementById('lose-modal').style.display = 'none';
    const powerupButtons = document.querySelectorAll('.powerup-btn');
    powerupButtons.forEach(button => {
        button.disabled = true;
    });
    
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    difficultyButtons.forEach(button => {
        button.disabled = true;
    });
}
