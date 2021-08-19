<?php

$playerName = $_POST['playerName'];
$score = $_POST['score'];

$servername = 'localhost';
$username = 'mxbhnrft_snake';
$password = 'u!Lf)6*Q;gf2J2Lu@!';
$dbname = 'mxbhnrft_snake';

// création de la connection
$conn = new mysqli( $servername, $username, $password, $dbname );
// tester la connection
if ( $conn->connect_error ) {
    die( 'Connection failed: '.$conn->connect_error );
}

$sql = "INSERT INTO leaderboard (user, score) VALUES ('" . $playerName . "', " . $score . ')';

if ( $conn->query( $sql ) === TRUE ) {
    // Tout marche nickel, on envoie un message de succès
    echo 'Merci, votre score à était ajouté!';
} else {
    // Rien ne va plus, message d'erreur
    echo 'ERROR: Un problème est survenu';
}

$conn->close();

?>