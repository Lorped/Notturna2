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


include 'db2.inc.php';  //MYSQLI//




$idutente = @$_GET['idutente']; 
$type = @$_GET['type'];
$query = @$_GET['query'];


if ($idutente != "" && $type != "" && $query != "") {

	$RC = 0;
	$out = 0;

	$MySql = "SELECT * FROM personaggio WHERE idutente = '$idutente' ";
	$Result = mysqli_query($db, $MySql);
	if ( $res = mysqli_fetch_array($Result)) {


		switch ($type) {
			case 'S':				//SKILL
				$MySql = "SELECT * FROM skill_main WHERE idskill = '$query' ";
				$Result = mysqli_query($db, $MySql);
				if ( $res = mysqli_fetch_array($Result)) {

					$MySql = "SELECT * FROM skill WHERE idutente = '$idutente' AND idskill = '$query' ";
					$Result = mysqli_query($db, $MySql);
		
					if ( $res = mysqli_fetch_array($Result)) {
						$out = $res['livello'];
					}
				} else {
					$RC = 4;
				}
				break;
			case 'D':				//DISCIPLINA
				$MySql = "SELECT * FROM discipline_main WHERE iddisciplina = '$query' ";
				$Result = mysqli_query($db, $MySql);
				if ( $res = mysqli_fetch_array($Result)) {

					$MySql = "SELECT * FROM discipline WHERE idutente = '$idutente' AND iddisciplina = '$query' ";
					$Result = mysqli_query($db, $MySql);

					if ( $res = mysqli_fetch_array($Result)) {
						$out = $res['livello'];
					}
				} else {
					$RC = 4;
				}
				break;
			case 'P':				//POTERE
				$MySql = "SELECT * FROM poteri_main WHERE  idpotere = '$query' ";
				$Result = mysqli_query($db, $MySql);
				if ( $res = mysqli_fetch_array($Result)) {

					$MySql = "SELECT * FROM poteri WHERE idutente = '$idutente' AND idpotere = '$query' ";
					$Result = mysqli_query($db, $MySql);

					if ( $res = mysqli_fetch_array($Result)) {
						$out = 1;
					}
				} else {
					$RC = 4;
				}
				break;
					
			default:
				$RC = 3;
				$out = 0;
				break;
		}
	} else {
		$RC = 2;
	}


	$out = [
		'RC' => $RC,
		'out' => $out
	];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);



} else {
	$out = [
		'RC' => 1 ,
		'out' => -1
	];
	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
}


?>
