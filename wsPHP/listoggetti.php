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

	$Atabcond = [
		'ZERO',
		'Forza',
		'Destrezza',
		'Attutimento',
		'Carisma',
		'Persuasione',
		'Saggezza',
		'Prontezza',
		'Intelligenza',
		'Percezione'
	];

	$oggetti = [];

	$MySql = "SELECT * FROM oggetti order by idoggetto ";
	$Result = mysqli_query($db, $MySql);

	while ( $res = mysqli_fetch_array ($Result,MYSQLI_ASSOC) ) {

		$idoggetto = $res['idoggetto'];

		$MySql2 = "SELECT * from cond_oggetti WHERE cond_oggetti.idoggetto = $idoggetto ";
		$Result2 = mysqli_query($db, $MySql2);

		$condizioni = [];
		$condizioni2 = [];
		while ( $res2 = mysqli_fetch_array ($Result2,MYSQLI_ASSOC) ) {
			$tipocond = $res2['tipocond'];

			switch ( $tipocond ) {
				case 'A':
					$cond = $Atabcond[$res2['tabcond']];
					break;
				case 'S':
					$ids=$res2['tabcond'];
					$Mysqlx = "SELECT nomeskill FROM skill_main WHERE idskill = $ids";
					$Resultx = mysqli_query($db, $Mysqlx);
					$resx = mysqli_fetch_array($Resultx);
					$cond = $resx['nomeskill'];
					break;
				case 'D':
					$ids=$res2['tabcond'];
					$Mysqlx="SELECT nomedisc FROM discipline_main WHERE iddisciplina = $ids";
					$Resultx = mysqli_query($db, $Mysqlx);
					$resx = mysqli_fetch_array($Resultx);
					$cond = $resx['nomedisc'];
					break;
				case 'P':
					$ids=$res2['tabcond'];
					$Mysqlx="SELECT nomepotere FROM poteri_main WHERE idpotere = $ids";
					$Resultx = mysqli_query($db, $Mysqlx);
					$resx = mysqli_fetch_array($Resultx);
					$cond = $resx['nomepotere'];
					break;
			}

			$res2['tipocond'] = $cond;

			if ( $res2['risp'] != '') {
				$condizioni2[] = $res2;
			} else {
				$condizioni[] = $res2;
			}

		}

		$fulloggetto = [
			'oggetto' => $res,
			'condizioni' => $condizioni,
			'condizioni2' => $condizioni2
		];

		$oggetti[] = $fulloggetto;

	}


	$out = [
		'oggetti' => $oggetti
	];

	//print_r( $out);
	//die();
	


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>
