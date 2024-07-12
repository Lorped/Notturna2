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

include ('db2.inc.php'); // MYSQL //


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;
$idcontatto = $request -> idcontatto;
$livello = $request -> livello;
$au = $request -> au;


//$nome = "lorenzo";
//$password = "";
//$postdata = 1;


if ( isset($postdata) && $idutente != "" && $idcontatto != "" && isset($livello) ) {

  $MySql = "SELECT nomecontatto FROM contatti WHERE idcontatto = $idcontatto";
  $Result = mysqli_query($db, $MySql);
  $res = mysqli_fetch_array ( $Result);

  $nomecontatto = $res ['nomecontatto'];


  if ( $livello == 0) {
    $MySql = "DELETE FROM contatti
      WHERE idcontatto = $idcontatto";
    $Result = mysqli_query($db, $MySql);


    $Azione = "Rimosso contatto ".$nomecontatto;
  }


  if ($livello != 0  ) {
    $MySql = "UPDATE contatti SET livello = $livello
      WHERE idcontatto = $idcontatto";
    $Result = mysqli_query($db, $MySql);

    $Azione = "Contatto ".$nomecontatto.' a '.$livello;
  }




  if ( $au == 'A') {
    $Azione = 'ADMIN '.$Azione;
  }
  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, 0 , '$Azione' ) ";
  $Result = mysqli_query($db, $MySql);


  $MySql = "SELECT sum(livello) as s FROM contatti
  WHERE idutente = $idutente";
  $Result = mysqli_query($db, $MySql);
  $res = mysqli_fetch_array($Result);
  $somma = $res['s'];

  if ( $somma == 0 ) {
    $MySql = "DELETE FROM background
    WHERE idutente = $idutente AND idback = 77 ";
    $Result = mysqli_query($db, $MySql);
  }
  if ( $somma != 0 AND $somma != 1 ) {
    $MySql = "UPDATE background
    SET livello = $somma
    WHERE idutente = $idutente AND idback = 77 ";
    $Result = mysqli_query($db, $MySql);
  }
  if (  $somma == 1 ) {
    $MySql = "DELETE FROM background
    WHERE idutente = $idutente AND idback = 77 ";
    $Result = mysqli_query($db, $MySql);
    $MySql = " INSERT INTO background (idback, idutente, livello)
      VALUES (77, $idutente, 1 )";
    $Result = mysqli_query($db, $MySql);
  }






  if (mysqli_errno($db)) {
    header("HTTP/1.1 403 Forbidden");
    die($MySql);

  } else {

      header("HTTP/1.1 200 OK");

      $out = "OK";
      $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
      echo $out;

  }



} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
