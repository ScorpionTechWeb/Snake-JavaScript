// Créations des variables
var COL = 30; // Nombre de colonnes
var LINES = 20; // Nombre de lignes
var COTE = 20; // Nombres de cotes
var score = document.getElementById("score"); // On recuperer ID du champ score
var canvas = document.getElementById("canvas"); // On recuperer l'ID du canvas
var playerID = document.getElementById("playerID"); // On recuperer l'ID du joueur
var ctx = canvas.getContext("2d"); // On crée un canvas 2D
var myScore = 0;


// On applique la largeur et l'hauteur
canvas.width = COL * COTE;
canvas.height = LINES * COTE;
ctx.fillStyle = "#ff0000";

// Emplacement de départ de Snake
var chRandom = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
var chRandom2 = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
var snake = [
    [chRandom, chRandom2],

    [chRandom - 1, chRandom2],

    [chRandom - 2, chRandom2],

    [chRandom - 3, chRandom2],

    [chRandom - 4, chRandom2],
];

// Variable bonbon
var bonbon;
var snakeIncX = 1;
var snakeIncY = 0;

// Créations des functions

function majcanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0, l = snake.length; i < l; i++) {
        ctx.fillRect(snake[i][0] * COTE, snake[i][1] * COTE, COTE, COTE);
    }

    ctx.fillRect(bonbon[0] * COTE, bonbon[1] * COTE, COTE, COTE);
}

// Function : Mets à jour le score

function majScore(s) {
    myScore = s * 2;
    score.innerHTML = myScore;
}

// Function : Lorsqu'on perd une partie, on nettoye le canva, affiche un alerte et on recommence
function finPartie() {
    clearInterval(timerJeu);
    perdu(myScore);
    if (myScore > 0) {
        myHighScore(myScore);
    }
    location.reload();
}

// Function : On initialise un nouveau jeu

function boucleJeu() {
    if (bougeSnake()) {
        majcanvas();
    } else {
        finPartie();
    }
}

// Function : On place un bonbon aleatoirement

function placeBonbon() {
    bonbon = [
        1 + Math.floor((COL - 2) * Math.random()),
        1 + Math.floor((LINES - 2) * Math.random()),
    ];
}

// Function : On fait bouger le snake

function bougeSnake() {
    let tete = [snake[0][0] + snakeIncX, snake[0][1] + snakeIncY];

    if (tete[0] == -1 || tete[0] == COL || tete[1] == -1 || tete[1] == LINES)
        return false;

    for (let i = 0, l = snake.length - 1; i < l; i++) {
        if (tete[0] == snake[i][0] && tete[1] == snake[i][1]) return false;
    }

    if (tete[0] == bonbon[0] && tete[1] == bonbon[1]) {
        placeBonbon();

        majScore(snake.length - 4);
    } else {
        snake.pop();
    }

    snake.unshift(tete);

    return true;
}

// On crée une function pour afficher un nouveau message selon le score.

function perdu(score) {
    if (score === 0){
        location.reload();
    } else {
        alert("Perdu" + "\n" + "Votre score est de " + score);
    }
}

function myHighScore(myscore) {
    // ajouter le score de l'utilisateur à la base de données sql
    var playerName = prompt("Quelle est votre pseudo ?");
    var score = myscore;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    };
    xhttp.open("POST", "add_score_to_leaderboard.php", true);
    var myFormData = new FormData();
    if (playerName === null || playerName === "") {
        myFormData.append("playerName", "SnakeNonyme");
    } else {
        myFormData.append("playerName", playerName);
    }
    myFormData.append("score", score);
    xhttp.send(myFormData);
}

// On fait tourner le snake dans le sens qu'on veut avec les fléches du clavier

document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") {
        if (snakeIncX == 0) {
            snakeIncX = -1;
            snakeIncY = 0;
        }
    } else if (e.code === "ArrowUp") {
        if (snakeIncY == 0) {
            snakeIncX = 0;
            snakeIncY = -1;
        }
    } else if (e.code === "ArrowRight") {
        if (snakeIncX == 0) {
            snakeIncX = 1;
            snakeIncY = 0;
        }
    } else if (e.code === "ArrowDown") {
        if (snakeIncY == 0) {
            snakeIncX = 0;
            snakeIncY = 1;
        }
    }
});

// On initialise une partie

placeBonbon();
var timerJeu = setInterval(boucleJeu, 100);
