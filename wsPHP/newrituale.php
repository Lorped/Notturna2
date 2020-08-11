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

include ('db.inc.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idutente = $request -> idutente;
$idrituale = $request -> idrituale;
$necrotaum = $request -> necrotaum;

//$nome = "lorenzo";
//$password = "lor11ped";
//$postdata = 1;




if ( isset($postdata) && $idutente != "" && $idrituale != "" && $necrotaum != "") {

  if ( $necrotaum == 't' ) {

    $MySql = "SELECT * FROM rituali_t_main WHERE idrituale = $idrituale";
    $Result = mysql_query($MySql);
    $res = mysql_fetch_array ($Result);

    $nomerituale = $res['nomerituale'];
    $livello = $res['livello'];

    $spesapx =  $livello * 3 ;

    $MySql = "INSERT INTO rituali_t (idrituale , idutente)
      VALUES ($idrituale , $idutente)";
    $Result = mysql_query($MySql);

  } else {

    $MySql = "SELECT * FROM rituali_n_main WHERE idrituale = $idrituale";
    $Result = mysql_query($MySql);
    $res = mysql_fetch_array ($Result);

    $nomerituale = $res['nomerituale'];
    $livello = $res['livello'];

    $spesapx =  $livello * 3 ;

    /** check a costo zero **/
    $MySql = "SELECT count(*) as c FROM rituali_n WHERE idutente=$idutente";
    $Result = mysql_query($MySql);
    $res = mysql_fetch_array ($Result);

    if ( $res['c'] == 0 ) {
      $spesapx = 0 ;
    }


    $MySql = "INSERT INTO rituali_n (idrituale , idutente)
      VALUES ($idrituale , $idutente)";
    $Result = mysql_query($MySql);

  }

  $MySql = "UPDATE personaggio SET xpspesi = xpspesi + $spesapx
    WHERE idutente = $idutente";
  $Result = mysql_query($MySql);

  $Azione = 'Acquisto rituale ' . $livello . "." . $nomerituale ;

  $MySql = "INSERT INTO logpx (idutente, px, Azione )
    VALUES ( $idutente, -$spesapx , '$Azione' ) ";
  $Result = mysql_query($MySql);







  header("HTTP/1.1 200 OK");

  $out = "OK";
  $out = json_encode ($out, JSON_UNESCAPED_UNICODE);
  echo $out;

} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
