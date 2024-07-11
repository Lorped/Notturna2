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

include ('db2.inc.php'); //MYSQLI//


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;
$idpregio = $request -> idpregio;

//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;


if ( isset($postdata) && $idutente != "" && $idpregio != "" ) {

  $MySql = "SELECT * FROM pregidifetti_main
    WHERE idpregio = $idpregio ";
  $Result = mysqli_query($db, $MySql);
  $res = mysqli_fetch_array ($Result);

  $nomepregio = $res['nomepregio'];
  $valore = $res['valore'];

  $MySql = "SELECT sum(valore) as somma, sum(pxspesi) as spesi FROM pregidifetti
    LEFT JOIN pregidifetti_main on pregidifetti_main.idpregio = pregidifetti.idpregio
    WHERE idutente = $idutente";
  $Result = mysqli_query($db, $MySql);
  $res = mysqli_fetch_array ($Result);
  $somma = $res['somma'];
  $spesi = $res['spesi'];

  if ( $valore < 0 ) {  /* difetto ==> aggiungo in ogni caso */
    $MySql = "INSERT INTO pregidifetti (idpregio, idutente, pxspesi)
      VALUES ( $idpregio , $idutente, 0 ) ";
    $Result = mysqli_query($db, $MySql);

    $spesapx = 0 ;
    $Azione = 'Acquisito difetto '.$nomepregio ;
  } else {
      $delta = $valore + $somma - $spesi/2  ;

      if ( $delta > 0 ) {  /*es  pregio da 3 ,  2 difetti (-1) => -2  + 1 pregio 1 (+1) ma preso con px (2) */
        $spesapx = $delta * 2 ;
        $MySql = "INSERT INTO pregidifetti (idpregio, idutente, pxspesi)
          VALUES ( $idpregio , $idutente, $spesapx ) ";
        $Result = mysqli_query($db, $MySql);

        $MySql = "UPDATE personaggio SET xpspesi = xpspesi + $spesapx
          WHERE idutente = $idutente";
        $Result = mysqli_query($db, $MySql);

        $Azione = 'Acquisito pregio '.$nomepregio.' spendendo '.$spesapx.' px';
      } else {   /*es  pregio da 1 ,  2 difetti (-1) => -2  + 1 pregio 1 (+1) ma preso con px (2) */
        $MySql = "INSERT INTO pregidifetti (idpregio, idutente, pxspesi)
          VALUES ( $idpregio , $idutente, 0 ) ";
        $Result = mysqli_query($db, $MySql);
        $spesapx = 0 ;
        $Azione = 'Acquisito pregio '.$nomepregio;
      }
  }


  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, -$spesapx , '$Azione' ) ";
  $Result = mysqli_query($db, $MySql);


  header("HTTP/1.1 200 OK");

  $out = "OK";
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;

} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
