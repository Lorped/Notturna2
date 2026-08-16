<?php

//http://stackoverflow.com/questions/18382740/cors-not-working-php

use Dom\Mysql;

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

	require_once __DIR__ . '/db2.inc.php';  //MYSQLI //

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

	$idcronaca = $request -> aPG -> IDcronaca;

/************************************/

	$bg = $request -> bg ;

	$contatti = $request -> cont ;

	$alleati = $request -> alleati ;


	$discipline = $request -> discipline ;

	$taumaturgie = $request -> taumaturgie ;

	$necromanzie = $request -> necromanzie ;

	$attitudini = $request -> attitudini ;

	$skill = $request -> skill ;

	$skillother = $request -> skillother ;

	$pregio = $request -> new_p ;

	$difetto = $request -> new_d ;
	$bp = $request -> bp ;

	$focus = $request -> focus ;


	$idlds = $request -> lineadisangue;

	$fama2 = 0;
	if ($idlds == 28)
	{
		$fama2 = 1 ;
	}


	$MySql = "INSERT INTO personaggio
	(
  	idutente, nomepg, idclan, generazione,
  	forza, destrezza, attutimento, carisma, persuasione, saggezza, percezione, prontezza, intelligenza,
  	fdv, fdvmax,
  	idstatus, idsentiero, valsentiero,
  	fama1, fama2, fama3, xp, xpspesi, nomeplayer,
		rifugio, zona,
		bloodp , IDcronaca , PScorrenti,
		idlds
	)
	VALUES
	(
  	$idutente, '$nomepg', $idclan, $generazione,
    	$forza, $destrezza, $attutimento, $carisma, $persuasione, $saggezza, $percezione, $prontezza, $intelligenza,
    	$fdv, $fdv,
    	$idstatus, $idsentiero, $valsentiero ,
    	0, $fama2, 0 ,0, 0 , '$nomeplayer' ,
			'$rifugio' , '$zona' ,
			$bp , $idcronaca , 12,
			$idlds
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

	foreach ($alleati as $cc ) {
		$livello = $cc -> livello;
		$nomealleato = mysqli_real_escape_string( $db, $cc -> nomealleato);
		if ( $livello != 0) {
			$MySql = "INSERT INTO alleati (  idutente, livello, nomealleato ) VALUES (  $idutente, $livello, '$nomealleato' )";

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
		$subskill = $aa -> subskill;
		$subskill2 = $aa -> subskill2;

		if ( $livello != 0) {
			$MySql = "INSERT INTO skill (  idutente, livello, idskill ) VALUES (  $idutente, $livello, $idskill )";

//echo $MySql, "<br>";
			mysqli_query($db, $MySql);
			if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );


			if ( $subskill == 0 ) {

				foreach ($subskill2 as $ss2 ) {
					$liv2 = $ss2 -> livello;
					$id2= $ss2 -> idskill;
					$MySql = "INSERT INTO skill (  idutente, livello, idskill ) VALUES (  $idutente, $liv2, $id2 )";
					mysqli_query($db, $MySql);
					if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );

				}
			}
		}



	}

	/*******************************************/

	foreach ($skillother as $aa ) {
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

	if ($pregio != 0 ) {
		$MySql = "INSERT INTO pregidifetti (idutente, idpregio, pxspesi) VALUES ($idutente, $pregio, 0 )";
		mysqli_query($db, $MySql);
		if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );
	}
	if ($difetto != 0 ) {
		$MySql = "INSERT INTO pregidifetti (idutente, idpregio, pxspesi) VALUES ($idutente, $difetto,0 )";
		mysqli_query($db, $MySql);
		if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );
	}

	foreach ( $focus as $f) {

		$isfocus = $f -> focus;
		if ($isfocus == 1){
			$id = $f -> id;
			if ( $f-> disc_vie == "D"){				
				$MySql = "UPDATE discipline SET focus = 1 WHERE idutente = $idutente and iddisciplina = $id ";
			} elseif ( $f->disc_vie == "T"){
				$MySql = "UPDATE taumaturgie SET focus = 1 WHERE idutente = $idutente and idtaum = $id ";
			} elseif ( $f->disc_vie == "N"){
				$MySql = "UPDATE necromanzie SET focus = 1 WHERE idutente = $idutente and idnecro = $id ";
			}
			mysqli_query($db, $MySql);
			if (mysqli_errno($db)) die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );
		}
	}



	//check dur-an-ki

	foreach ($discipline as $adisciplina ) {
		$iddisciplina = $adisciplina -> iddisciplina;
		if ($iddisciplina == 21 ) { // dur-an-ki

			$mysql = "SELECT livello from skill where idskill = 18 and idutente =$idutente";
			$result = mysqli_query($db, $mysql);
			if ( $res= mysqli_fetch_array($result)){
				$livello = $res['livello'];

				if ($livello > 3) { $livello = 3;}  // ROZZO MA IN CREZIONE non può crescere

				$mysql2 = "UPDATE discipline set livello = $livello WHERE iddisciplina = 21 and idutente = $idutente";
				mysqli_query ($db, $mysql2);
			}
		}
	}

	//check misticismo

	foreach ($discipline as $adisciplina ) {
		$iddisciplina = $adisciplina -> iddisciplina;
		if ($iddisciplina == 23 ) { // misticismo abissale

			$mysql = "SELECT livello from skill where idskill = 18 and idutente =$idutente";
			$result = mysqli_query($db, $mysql);
			if ( $res= mysqli_fetch_array($result)){
				$livello0 = $res['livello'];

				$mysql1 = "SELECT livello from discipline where iddisciplina = 9 and idutente =$idutente";
				$result1 = mysqli_query($db, $mysql1);
				if ( $res1= mysqli_fetch_array($result1)){
					$livello1 = $res1['livello'];

					$livello = min ( $livello0 , $livello1, 3); // ROZZO MA IN CREZIONE non può crescere

					$mysql2 = "UPDATE discipline set livello = $livello WHERE iddisciplina = 23 and idutente = $idutente";
					mysqli_query ($db, $mysql2);

				}

			}
		}
	}

	$mysqlx = "select idutente from segreteria where idutente = $idutente";
	$resultx = mysqli_query($db, $mysqlx);
	if (mysqli_num_rows($resultx) == 0) {
		$Mysql = "INSERT INTO segreteria (idutente, eventi, eventodata, saldo) VALUES
			($idutente, 0, '0000-00-00', 0) ";
		mysqli_query($db, $Mysql);
	}

	$out = [];

	header("HTTP/1.1 200 OK");

	echo json_encode ($out, JSON_UNESCAPED_UNICODE);





?>
