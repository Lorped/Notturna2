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

//die(print_r ($request)) ;
//die(print_r ($request->aPG)) ;


	if (!isset($_POST)) die ("No post!");

	$idutente = $request -> idutente;
	$nomeplayer = mysqli_real_escape_string($db, $request -> aPG -> nomeplayer);
	$nomepg = mysqli_real_escape_string($db, $request -> aPG -> nomepg);

	$idclan = $request -> aPG -> idclan ;
	$generazione = $request -> aPG -> generazione;

	$forza = $request -> aPG -> forza;
	$destrezza = $request -> aPG -> destrezza;
	$attutimento = $request -> aPG -> attutimento;

	$carisma = $request -> aPG -> carisma;
	$persuasione = $request -> aPG -> persuasione;
	$saggezza = $request -> aPG -> saggezza;

	$percezione = $request -> aPG -> percezione;
	$intelligenza = $request -> aPG -> intelligenza;
	$prontezza = $request -> aPG -> prontezza;

	$idstatus = $request -> aPG -> idstatus;

	$fdv = $request -> aPG -> fdv;

	$idsentiero = $request -> aPG -> idsentiero ;

	$valsentiero = $request -> aPG -> valsentiero;

	$rifugio = mysqli_real_escape_string( $db, $request -> aPG -> rifugio);
	$zona = mysqli_real_escape_string( $db,  $request -> aPG -> zona);

/************************************/

	$bg = $request -> bg ;

	$contatti = $request -> cont ;

	$discipline = $request -> discipline ;

	$taumaturgie = $request -> taumaturgie ;

	$necromanzie = $request -> necromanzie ;

	$attitudini = $request -> attitudini ;

	$skill = $request -> skill ;

	$influenze = $request -> influenze ;



//echo $generazione, "<br>";

	$MySql = "SELECT * from generazione where generazione = $generazione";

//echo $MySql, "<br>";
	$Result = mysqli_query($db, $MySql);
	$res = mysqli_fetch_array($Result);
	$bp1 = $res['bloodpmin'];

	$MySql = "SELECT * from statuscama where idstatus = $idstatus";

//echo $MySql, "<br>";
	$Result = mysqli_query($db, $MySql);
	$res = mysqli_fetch_array($Result);
	$bp2 = $res['addbp'];

	$bp = $bp1 + $bp2;


	$MySql = "INSERT INTO personaggio
	(
  	idutente, nomepg, idclan, generazione,
  	forza, destrezza, attutimento, carisma, persuasione, saggezza, percezione, prontezza, intelligenza,
  	fdv, fdvmax,
  	idstatus, idsentiero, valsentiero,
  	fama1, fama2, fama3, xp, xpspesi, nomeplayer,
		rifugio, zona,
		bloodp
	)
	VALUES
	(
  	$idutente, '$nomepg', $idclan, $generazione,
    	$forza, $destrezza, $attutimento, $carisma, $persuasione, $saggezza, $percezione, $prontezza, $intelligenza,
    	$fdv, $fdv,
    	$idstatus, $idsentiero, $valsentiero ,
    	0, 0, 0 ,0, 0 , '$nomeplayer' ,
			'$rifugio' , '$zona' ,
			$bp
	)";


//echo $MySql, "<br>";
 	mysqli_query($db, $MySql);
	if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );

	/*******************************************/

	foreach ($bg as $abg ) {

		if ( $abg -> livello != 0 ) {

			$idback = $abg -> idback;
			$livello = $abg -> livello;

			$MySql = "INSERT INTO background ( idback, idutente, livello ) VALUES ( $idback, $idutente, $livello )";

//echo $MySql, "<br>";
			mysqli_query($db, $MySql);
			if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );

		}
	}



	/*******************************************/

	foreach ($influenze as $xx ) {

		if ( $xx -> livello != 0 ) {

			$idinfluenza = $xx -> idinfluenza;
			$livello = $xx -> livello;

			$MySql = "INSERT INTO influenze ( idinfluenza, idutente, livello ) VALUES ( $idinfluenza, $idutente, $livello )";

//echo $MySql, "<br>";
			mysqli_query($db, $MySql);
			if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );

		}
	}


	/*******************************************/

	foreach ($contatti as $cc ) {
		$livello = $cc -> livello;
		$nomecontatto = mysqli_real_escape_string( $db, $cc -> nomecontatto);
		if ( $livello != 0) {
			$MySql = "INSERT INTO contatti (  idutente, livello, nomecontatto ) VALUES (  $idutente, $livello, '$nomecontatto' )";

//echo $MySql, "<br>";
			mysqli_query($db, $MySql);
			if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );
		}
	}

	/*******************************************/

	foreach ($discipline as $adisciplina ) {

		$iddisciplina = $adisciplina -> iddisciplina;
		$livello = $adisciplina -> livello;

		if ( $idclan != 20 ) {
			$MySql = "INSERT INTO discipline (iddisciplina, idutente, livello, DiClan)
										VALUES ( $iddisciplina, $idutente, $livello, 'S' )";

//echo $MySql, "<br>";
			mysqli_query($db, $MySql);
			if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );

		} else {
			if ( $livello != 0 ) {
				$MySql = "INSERT INTO discipline (iddisciplina, idutente, livello, DiClan)
											VALUES ( $iddisciplina, $idutente, $livello, 'N' )";

//echo $MySql, "<br>";
				mysqli_query($db, $MySql);
				if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );

			}
		}
	}


	/*******************************************/

	if ( $idclan == 7 ) {                /*  TREMERE */

		$primaria = 1;
		foreach ($taumaturgie as $taum ) {

			$idtaum = $taum -> idtaum;
			$livello = $taum -> livello;

			if ( $livello > 0 ) {
				$MySql = "INSERT INTO taumaturgie (idtaum, idutente, livello, principale)
											VALUES ( $idtaum, $idutente, $livello, $primaria )";

//echo $MySql, "<br>";
				mysqli_query($db, $MySql);
				if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );
			}
			$primaria++;

		}

	}


	/*******************************************/

	if ( $idclan == 11 || $idclan == 14 ) {                /*  GIOVANNI + Cappadoci */

		$primaria = 1;
		foreach ($necromanzie as $necro ) {

			$idnecro = $necro -> idnecro;
			$livello = $necro -> livello;

			if ( $livello > 0 ) {
				$MySql = "INSERT INTO necromanzie (idnecro, idutente, livello, principale)
											VALUES ( $idnecro, $idutente, $livello, $primaria )";

//echo $MySql, "<br>";
				mysqli_query($db, $MySql);
				if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );
			}
			$primaria++;

		}

	}

	/*******************************************/

	foreach ($attitudini as $aa ) {
		$livello = $aa -> livello;
		$idskill = $aa -> idskill;

		if ( $livello != 0) {
			$MySql = "INSERT INTO skill (  idutente, livello, idskill ) VALUES (  $idutente, $livello, $idskill )";

//echo $MySql, "<br>";
			mysqli_query($db, $MySql);
			if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );
		}
	}

	foreach ($skill as $aa ) {
		$livello = $aa -> livello;
		$idskill = $aa -> idskill;

		if ( $livello != 0) {
			$MySql = "INSERT INTO skill (  idutente, livello, idskill ) VALUES (  $idutente, $livello, $idskill )";

//echo $MySql, "<br>";
			mysqli_query($db, $MySql);
			if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );
		}
	}

	/*******************************************/


	$out = [];

	header("HTTP/1.1 200 OK");

	echo json_encode ($out, JSON_UNESCAPED_UNICODE);





?>
