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

include ('db2.inc.php'); // mysql//


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;
$disciplina = $request -> disciplina;
$val = $request -> valore;




if ( isset($postdata) && $idutente != "" && $disciplina != "" ) {

	$MySql = "SELECT nomedisc  FROM discipline_main
    WHERE iddisciplina =  $disciplina" ;
	$Result = mysqli_query($db, $MySql);

  $res = mysqli_fetch_array($Result);
  $nomedisc = $res['nomedisc'];

  $MySql = "SELECT livello  FROM discipline
    WHERE iddisciplina =  $disciplina and idutente = $idutente" ;
    $Result = mysqli_query($db, $MySql);

  $res = mysqli_fetch_array($Result);
  $livello = $res['livello'];
  $newlivello = $res['livello'] + $val;


  $MySql = "UPDATE discipline SET livello = $newlivello
    WHERE idutente = $idutente and iddisciplina = $disciplina";
  $Result = mysqli_query($db, $MySql);


  $Azione = "MASTER - " . $nomedisc . ' a ' . $newlivello ;

  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, 0 , '$Azione' ) ";
  $Result = mysqli_query($db, $MySql);
  

  // se scendo di livello  cancello i poteri specifici
  if ($val <0){
    $MySql = "SELECT poteri.idpotere FROM poteri LEFT JOIN poteri_main ON poteri_main.idpotere=poteri.idpotere WHERE idutente = $idutente and iddisciplina = $disciplina";
    $Result = mysqli_query($db, $MySql);
    while ($res = mysqli_fetch_array($Result)) {
      $idpotere = $res['idpotere'];
      $MySql2 = "DELETE FROM poteri WHERE idpotere = $idpotere and idutente = $idutente";
      $Result2 = mysqli_query($db, $MySql2);
    }
  }


  header("HTTP/1.1 200 OK");

  $out = "OK";
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;

} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
