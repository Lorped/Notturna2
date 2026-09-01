<?php

//http://stackoverflow.com/questions/18382740/cors-not-working-php
if (isset($_SERVER['HTTP_ORIGIN'])) {
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
  exit(0);
}

require_once __DIR__ . '/db2.inc.php'; //MYSQL  //


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;
$necrotaum = $request -> necrotaum;
$iddisciplina = $request -> iddisciplina;
$change = $request -> change;




if ( isset($postdata) && $idutente != "" && $iddisciplina != "" ) {


  if  ($necrotaum == 'N') {
    $mysql = "SELECT * FROM necromanzie where idutente = $idutente and idnecro = $iddisciplina";
    $result = mysqli_query($db, $mysql);
    $res = mysqli_fetch_array($result);
    $principale = $res['principale'];
    $livelloorig= $res['livello']; 

    $newlivello = $livelloorig + $change;

    if ($change > 0 && $principale == 2) {
      $mysql = "SELECT livello FROM necromanzie where idutente = $idutente and principale = 1";
      $result = mysqli_query($db, $mysql);
      $res = mysqli_fetch_array($result);
      $livelloprim = $res['livello'];
      if ($newlivello > $livelloprim || ($newlivello == $livelloprim && $livelloprim != 5)) {
        header("HTTP/1.1 403 Forbidden");
        die("La secondaria deve restare inferiore alla primaria");
      }
    } else if ($change > 0 && $principale == 3) {
      $mysql = "SELECT livello FROM necromanzie where idutente = $idutente and principale = 2";
      $result = mysqli_query($db, $mysql);
      $res = mysqli_fetch_array($result);
      $livellosec = $res['livello'];
      if ($newlivello > $livellosec || ($newlivello == $livellosec && $livellosec != 5)) {
        header("HTTP/1.1 403 Forbidden");
        die("La terziaria deve restare inferiore alla secondaria");
      }
    }


    if ($principale == 1) {
      mysqli_query($db, "UPDATE necromanzie set livello = $newlivello where idutente = $idutente and idnecro = $iddisciplina");
      mysqli_query($db, "UPDATE discipline set livello = $newlivello where idutente = $idutente and iddisciplina = 99");

      $mysql = "SELECT * FROM necromanzie where idutente = $idutente and principale = 2";
      $result = mysqli_query($db, $mysql);
      if ($res= mysqli_fetch_array($result)) {
        $secondaria = $res['idnecro'];
        $livellosec = $res['livello'];
        if ($livellosec >= $livelloorig+$change and ($livelloorig+$change) < 5) {
          mysqli_query($db, "UPDATE necromanzie set livello = $newlivello -1  where idutente = $idutente and idnecro = $secondaria");
          $mysql2 = "SELECT * FROM necromanzie where idutente = $idutente and principale = 3";
          $result2 = mysqli_query($db, $mysql2);
          if ($res2= mysqli_fetch_array($result2)) {
            $terziaria = $res2['idnecro'];
            $livelloter = $res2['livello'];
            if ($livelloter >= $newlivello - 1) {
              mysqli_query($db, "UPDATE necromanzie set livello = $newlivello - 2 where idutente = $idutente and idnecro = $terziaria");
            }
          }
        }
      }
    } else if ($principale == 2) {
      mysqli_query($db, "UPDATE necromanzie set livello = livello + $change where idutente = $idutente and idnecro = $iddisciplina");
      
      $mysql = "SELECT * FROM necromanzie where idutente = $idutente and principale = 3";
      $result = mysqli_query($db, $mysql);
      if ($res= mysqli_fetch_array($result)) {
        $terziaria = $res['idnecro'];
        $livelloter = $res['livello'];
        if ($livelloter >= $livelloorig+$change and ($livelloorig+$change) < 5) {
          mysqli_query($db, "UPDATE necromanzie set livello = $newlivello - 1 where idutente = $idutente and idnecro = $terziaria");
        }
      }

    } else if ($principale == 3) {
      mysqli_query($db, "UPDATE necromanzie set livello = livello + $change where idutente = $idutente and idnecro = $iddisciplina");
    }

    $nom="SELECT * FROM necromanzie_main  
      WHERE idnecro = $iddisciplina ";
    $Result = mysqli_query($db, $nom);
    $res = mysqli_fetch_array ($Result);
    $nomedisc = $res['nomenecro'];


  } else {

    $mysql = "SELECT * FROM taumaturgie where idutente = $idutente and idtaum = $iddisciplina";
    $result = mysqli_query($db, $mysql);
    $res = mysqli_fetch_array($result);
    $principale = $res['principale'];
    $livelloorig= $res['livello']; 

    $newlivello = $livelloorig + $change;

    if ($change > 0 && $principale == 2) {
      $mysql = "SELECT livello FROM taumaturgie where idutente = $idutente and principale = 1";
      $result = mysqli_query($db, $mysql);
      $res = mysqli_fetch_array($result);
      $livelloprim = $res['livello'];
      if ($newlivello > $livelloprim || ($newlivello == $livelloprim && $livelloprim != 5)) {
        header("HTTP/1.1 403 Forbidden");
        die("La secondaria deve restare inferiore alla primaria");
      }
    } else if ($change > 0 && $principale == 3) {
      $mysql = "SELECT livello FROM taumaturgie where idutente = $idutente and principale = 2";
      $result = mysqli_query($db, $mysql);
      $res = mysqli_fetch_array($result);
      $livellosec = $res['livello'];
      if ($newlivello > $livellosec || ($newlivello == $livellosec && $livellosec != 5)) {
        header("HTTP/1.1 403 Forbidden");
        die("La terziaria deve restare inferiore alla secondaria");
      }
    }


    if ($principale == 1) {
      mysqli_query($db, "UPDATE taumaturgie set livello = $newlivello where idutente = $idutente and idtaum = $iddisciplina");
      mysqli_query($db, "UPDATE discipline set livello = $newlivello where idutente = $idutente and iddisciplina = 98");

      $mysql = "SELECT * FROM taumaturgie where idutente = $idutente and principale = 2";
      $result = mysqli_query($db, $mysql);
      if ($res= mysqli_fetch_array($result)) {
        $secondaria = $res['idtaum'];
        $livellosec = $res['livello'];
        if ($livellosec >= $livelloorig+$change and ($livelloorig+$change) < 5) {
          mysqli_query($db, "UPDATE taumaturgie set livello = $newlivello - 1 where idutente = $idutente and idtaum = $secondaria");
          $mysql2 = "SELECT * FROM taumaturgie where idutente = $idutente and principale = 3";
          $result2 = mysqli_query($db, $mysql2);
          if ($res2= mysqli_fetch_array($result2)) {
            $terziaria = $res2['idtaum'];
            $livelloter = $res2['livello'];
            if ($livelloter >= $newlivello - 1) {
              mysqli_query($db, "UPDATE taumaturgie set livello = $newlivello - 2 where idutente = $idutente and idtaum = $terziaria");
            }
          }
        }
      }
    } else if ($principale == 2) {
      mysqli_query($db, "UPDATE taumaturgie set livello = livello + $change where idutente = $idutente and idtaum = $iddisciplina");
      
      $mysql = "SELECT * FROM taumaturgie where idutente = $idutente and principale = 3";
      $result = mysqli_query($db, $mysql);
      if ($res= mysqli_fetch_array($result)) {
        $terziaria = $res['idtaum'];
        $livelloter = $res['livello'];
        if ($livelloter >= $livelloorig+$change and ($livelloorig+$change) < 5) {
          mysqli_query($db, "UPDATE taumaturgie set livello = $newlivello - 1 where idutente = $idutente and idtaum = $terziaria");
        }
      }

    } else if ($principale == 3) {
      mysqli_query($db, "UPDATE taumaturgie set livello = livello + $change where idutente = $idutente and idtaum = $iddisciplina");
    }

    $nom="SELECT * FROM taumaturgie_main    
      WHERE idtaum  = $iddisciplina ";
    $Result = mysqli_query($db, $nom);
    $res = mysqli_fetch_array ($Result);
    $nomedisc = $res['nometaum'];

  }


  $Azione = "ADMIN " . $nomedisc.' a '.($livelloorig+$change);

  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, 0 , '$Azione' ) ";
  $Result = mysqli_query($db, $MySql);


  header("HTTP/1.1 200 OK");

  $out = [
    'nomedisc' => $nomedisc,
  ];
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;

} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
