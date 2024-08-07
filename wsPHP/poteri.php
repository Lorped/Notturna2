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


  include ('db2.inc.php'); //MYSQLI //

  $idutente=$_GET['idutente'];


	$discipline = [];
	$MySql = "SELECT  *  FROM discipline
				LEFT JOIN discipline_main ON discipline_main.iddisciplina=discipline.iddisciplina
				WHERE idutente = '$idutente'
				AND discipline.iddisciplina != 98 AND discipline.iddisciplina != 99
				ORDER BY discipline.iddisciplina";
	$Result = mysqli_query($db, $MySql);
	while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
		$iddisciplina = $res ['iddisciplina'];
		$livellodisc =  $res['livello'];


		$poteri = [];
		$MySql2 = "SELECT * FROM poteri
			LEFT join poteri_main on poteri.idpotere = poteri_main.idpotere
			WHERE poteri_main.iddisciplina = $iddisciplina AND idutente = '$idutente'";
		$Result2 = mysqli_query($db, $MySql2);
		while ( $res2 = mysqli_fetch_array($Result2,MYSQLI_ASSOC)   ) {
			$poteri[] =  $res2;
		}

		$numpoteri = count ( $poteri ) ;


		$listanewpoteri = [] ;

		if ( $numpoteri < $livellodisc ) {


			$MySql2 = "SELECT *  from poteri_main
				WHERE iddisciplina = $iddisciplina
				AND idpotere NOT IN ( SELECT idpotere from poteri where idutente = $idutente )
				AND livellopot <= $livellodisc
				ORDER BY livellopot ASC";

			$Result2 = mysqli_query($db, $MySql2);
			while ($res2 = mysqli_fetch_array($Result2,MYSQLI_ASSOC)) {
				$disabled=0;

				if ( $res2['discprereq'] != "" ) {
			 		$dp = $res2['discprereq'];
					$ldp = $res2['livdiscprereq'];
				 	$MySql3 = "SELECT count(*) as c from discipline WHERE iddisciplina=$dp AND idutente=$idutente and livello>=$ldp ";
				 	$Result3 = mysqli_query($db, $MySql3);
				 	$res3 = mysqli_fetch_array($Result3);
				 	if ( $res3['c'] == 0 ) {
						$disabled=1;
					}
				}

				if ( $res2['skillprereq'] != "" && $res2['skillprereq'] != 24 ) {    /* RISSA E MISCHIA A PARTE */
				 	$dp = $res2['skillprereq'];
				 	$ldp = $res2['livskillprereq'];
					$MySql3 = "SELECT count(*) as c from skill WHERE idskill=$dp AND idutente=$idutente and livello>=$ldp ";
			 		$Result3 = mysqli_query($db, $MySql3);
			 		$res3 = mysqli_fetch_array($Result3);
				 	if ( $res3['c'] == 0 ) {
						$disabled=1;
					}
				}

				if ( $res2['attrprereq'] != "") {
			 		$dp = $res2['attrprereq'];
			 		$ldp = $res2['livattrprereq'];
					$MySql3 = "SELECT $dp FROM personaggio WHERE idutente=$idutente";
					$Result3 = mysqli_query($db, $MySql3);
					$res3 = mysqli_fetch_array ($Result3);
			 		if ( $res3[$dp] < $ldp) {
						$disabled = 1;
					}
				}

				if ( $res2['potereprereq'] != "") {
			 		$dp = $res2['potereprereq'];
			 		$MySql3 = "SELECT count(*) as c from poteri WHERE idpotere=$dp AND idutente=$idutente  ";
			 		$Result3 = mysqli_query($db, $MySql3);
			 		$res3 = mysqli_fetch_array($Result3);
			 		if ( $res3['c'] == 0 ) {
						$disabled = 1;
					}
				}

				/*  Srissa e Mischia */
				if ( $res2['skillprereq'] != "" && $res2['skillprereq'] == 24 ) {
					$sk1 = 0 ;
					$sk2 = 0 ;

					$ldp = $res2['livskillprereq'];
					$dp = 23 ;  /* RISSA, oltre a 24 = mischia*/
					$MySql3 = "SELECT count(*) as c from skill WHERE idskill=$dp AND idutente=$idutente and livello>=$ldp ";
			 		$Result3 = mysqli_query($db, $MySql3);
			 		$res3 = mysqli_fetch_array($Result3);
				 	if ( $res3['c'] == 0 ) {
						$sk1 = 1;
					}
					$ldp = $res2['livskillprereq'];
					$dp = 24 ;  /* MISCHIA, oltre a 23 = rissa*/
					$MySql3 = "SELECT count(*) as c from skill WHERE idskill=$dp AND idutente=$idutente and livello>=$ldp ";
			 		$Result3 = mysqli_query($db, $MySql3);
			 		$res3 = mysqli_fetch_array($Result3);
				 	if ( $res3['c'] == 0 ) {
						$sk2 = 1;
					}
					if ( $sk1 == 1 && $sk2 == 1 ) {
						$disabled = 1;
					}

				}
				/******/


				if ( $numpoteri + 1 < $res2['livellopot'] ) {
					$disabled = 1;
				}

				$newpot = [
					"potere" => $res2,
					"disabled" => $disabled
				];

				$listanewpoteri[] = $newpot ;
			}
		}

		$fulldisc = [
			'disciplina' => $res,
			'poteri' => $poteri,
			'newpoteri' => $listanewpoteri
		];

		$discipline[] = $fulldisc;
	}


	header("HTTP/1.1 200 OK");

  $out = json_encode ($discipline, JSON_UNESCAPED_UNICODE);
  echo $out;


?>
