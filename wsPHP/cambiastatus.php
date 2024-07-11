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

include ('db2.inc.php');  //MYSQLI //


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;
$lista = $request -> lista;


//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;


if ( isset($postdata) && $idutente != "" ) {


  foreach ($lista as $key => $skill) {
    if ( $skill -> livello > 0 ) {
      $idskill = $skill -> idskill ;
      $liv = $skill -> livello;
      $nomeskill = $skill -> nomeskill;

      $MySql = "SELECT * from skill WHERE idutente = $idutente AND idskill = $idskill";
      $Result = mysqli_query($db, $MySql);
      if ($res = mysqli_fetch_array($Result)){
        $MySql = "UPDATE skill SET livello = livello + $liv WHERE idutente = $idutente AND idskill = $idskill";
        $Result = mysqli_query($db, $MySql);
      } else {
        $MySql = "INSERT INTO skill (idutente, idskill, livello) VALUES ( $idutente, $idskill, $liv)";
        $Result = mysqli_query($db, $MySql);
      }

      $Azione = 'Passaggio Status: '.$nomeskill.' a '.$liv ;

      $MySql = "INSERT INTO logpx (idutente, px, Azione )
        VALUES ( $idutente, 0 , '$Azione' ) ";
      $Result = mysqli_query($db, $MySql);


    }
  }

  $MySql = "SELECT personaggio.idstatus , status , fdvmax, bloodp, bloodpmax , sete , attivazione, personaggio.generazione , addbp, fdvbase, bgbase FROM personaggio
		LEFT JOIN statuscama on statuscama.idstatus = personaggio.idstatus
		LEFT JOIN generazione on generazione.generazione = personaggio.generazione
			WHERE  idutente = $idutente ";
	$Result = mysqli_query($db, $MySql);
	$res = mysqli_fetch_array ($Result,MYSQLI_ASSOC);

	$oldstatus = $res['idstatus'];
  $oldfdv = $res['fdvmax'];
  $oldfdvbase = $res['fdvbase'];

  $oldboodp = $res['bloodp'];
  $bloodpmax = $res['bloodpmax'];
  $oldaddbp = $res['addbp'];



	$MySql = "SELECT * FROM statuscama  WHERE idstatus = $oldstatus + 1 ";
	$Result = mysqli_query($db, $MySql);
	$res = mysqli_fetch_array ($Result,MYSQLI_ASSOC);

	$newfdvbase = $res['fdvbase'];
  $newstatus = $res['status'];

  $newfdv = $oldfdv - $oldfdvbase + $newfdvbase;
  if ($newfdv > 10 ) { $newfdv = 10 ; }      /// UPDATE


  $newaddbp = $res['addbp'];

  $newbloodp = $oldboodp - $oldaddbp + $newaddbp;
  if ($newbloodp > $bloodpmax ) { $newbloodp = $bloodpmax ; }      /// UPDATE

  $MySql = "UPDATE personaggio SET
    idstatus = idstatus + 1 ,
    fdvmax = $newfdv ,
    fdv = $newfdv ,
    bloodp = $newbloodp
    WHERE idutente = $idutente";
  $Result = mysqli_query($db, $MySql);

  $Azione = 'Passaggio Status a '.$newstatus ;
  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, 0 , '$Azione' ) ";
  $Result = mysqli_query($db, $MySql);

  $out = "OK";
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;

} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
