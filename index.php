<!DOCTYPE html>

<html lang="fr">

    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Le jeu snake par Victor Dias</title>

        <!-- Le code CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link href="styles.css" rel="stylesheet" />
    </head>

    <body>
    <div id="global">
        <h1>SNAKE crée par Victor Dias - ADRAR Lourdes</h1>
    <div id="gauche"> 
        <canvas id="canvas"></canvas> 
        <h3>Votre score: <span id="score">0</span></h3>
    </div>
    <div id="droite"> 
        <h3>Classement des utilisateurs</h3>
        <p>Les 5 meilleurs joueurs</p>
            <p>
                <ul class="list-group">
                <?php
                $servername = "localhost";
                $username = "mxbhnrft_snake";
                $password = "u!Lf)6*Q;gf2J2Lu@!";
                $dbname = "mxbhnrft_snake";

                // Create connection
                $conn = new mysqli($servername, $username, $password, $dbname);
                // Check connection
                if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
                }

                $sql = "SELECT * FROM `leaderboard` ORDER BY `leaderboard`.`score` DESC LIMIT 5";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                // output data of each row
                while($row = $result->fetch_assoc()) {
                    echo "<li class=\"list-group-item d-flex justify-content-between align-items-center\">";
                    echo "" . $row["user"]. "";
                    echo "<span class=\"badge badge-primary badge-pill\">";
                    echo "" . $row["score"]. "";
                    echo "</span></li>";
                }
                } else {
                echo "0 results";
                }
                $conn->close();                
                ?>
                </ul>
            </p> 
    </div>
    </div>
    </body>

    <!-- On initialise le code javascript après la création du canvas -->
    <script src="custom.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</html>

