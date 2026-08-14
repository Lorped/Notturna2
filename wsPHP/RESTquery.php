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


require_once __DIR__ . '/db2.inc.php';  //MYSQLI//




$idutente = @$_GET['idutente']; 

if ( $idutente == "") {
	$MySql = "SELECT idutente, nomepg, nomeplayer, Descrizione 
	FROM `personaggio` 
	LEFT join cronaca on personaggio.IDcronaca = cronaca.IDcronaca 
	WHERE personaggio.IDcronaca != 99";

	$Result = mysqli_query($db, $MySql);

	$out = [];

	while ( $res = mysqli_fetch_array($Result, MYSQLI_ASSOC)){
		$out [] = $res;
	}

	echo json_encode ($out, JSON_UNESCAPED_UNICODE);
	die();

} 



$MySql = "SELECT idutente, nomeplayer, nomepg, clan.nomeclan, personaggio.generazione, lineedisangue.nomelds, forza,
	destrezza, attutimento, carisma, persuasione, saggezza, prontezza, intelligenza, fdv, fdvmax, statuscama.status , sentieri.sentiero , valsentiero, fama1, fama2, fama3, rifugio, zona, personaggio.bloodp, cronaca.Descrizione 
	FROM personaggio
	LEFT JOIN clan ON personaggio.idclan=clan.idclan
	LEFT JOIN statuscama ON personaggio.idstatus=statuscama.idstatus
	LEFT JOIN sentieri ON personaggio.idsentiero=sentieri.idsentiero
	LEFT JOIN generazione ON personaggio.generazione=generazione.generazione
	LEFT JOIN blood ON personaggio.bloodp=blood.bloodp
	LEFT JOIN cronaca ON personaggio.IDCronaca=cronaca.IDcronaca
	LEFT JOIN lineedisangue on personaggio.idlds=lineedisangue.idlds
	WHERE idutente =  '$idutente' ";
$Result = mysqli_query($db, $MySql);
if ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)) {	
	$user = $res;
} else {
	header("HTTP/1.1 404 Not Found");
	die();
}



  /*** discipline **/

$discipline = [];
$MySql = "SELECT  discipline.iddisciplina, discipline_main.nomedisc , livello  FROM discipline
	LEFT JOIN discipline_main ON discipline_main.iddisciplina=discipline.iddisciplina
	WHERE idutente = '$idutente'
       ORDER BY discipline.iddisciplina";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)  ) {
	$idd = $res ['iddisciplina'];
		    	/*** poteri **/
	$poteri = [];
	$MySql2 = "SELECT livellopot, nomepotere FROM poteri
		LEFT join poteri_main on poteri.idpotere = poteri_main.idpotere
		WHERE poteri_main.iddisciplina = $idd AND idutente = '$idutente'";
	$Result2 = mysqli_query($db, $MySql2);
	while ( $res2 = mysqli_fetch_array($Result2,MYSQLI_ASSOC)   ) {
		$poteri[] =  $res2;
	}

	$discipline[] =  [
		"disciplina" => $res,
		"poteri" => $poteri
	];
}




  /*** taumaturgie **/

$taumaturgie = [];
$MySql = "SELECT  taumaturgie.idtaum, taumaturgie_main.nometaum, livello  FROM taumaturgie
	LEFT JOIN taumaturgie_main ON taumaturgie_main.idtaum=taumaturgie.idtaum
	WHERE idutente = '$idutente' ORDER BY principale ASC";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$idd = $res ['idtaum'];
	$lid = $res ['livello'];

	$MySql2 = "SELECT nometaum2  FROM taumaturgie2
		WHERE idtaum = $idd AND livello <= $lid";
	$Result2 = mysqli_query($db, $MySql2);
	$taums = [];
	while ( $res2 = mysqli_fetch_array($Result2,MYSQLI_ASSOC)   ) {
		$taums[] = 	$res2;
	}
	$taumaturgie[] =  [
		"taumaturgia" => $res,
		"taums" => $taums
	];
}



  /*** necromanzie  **/

$necromanzie = [];
$MySql = "SELECT  necromanzie.idnecro, necromanzie_main.nomenecro, livello  FROM necromanzie
	LEFT JOIN necromanzie_main ON necromanzie_main.idnecro=necromanzie.idnecro
	WHERE idutente = '$idutente' ORDER BY principale ASC ";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$idd = $res ['idnecro'];
	$lid = $res ['livello'];

	$MySql2 = "SELECT nomenecro2 FROM necromanzie2
		WHERE idnecro = $idd AND livello <= $lid";
	$Result2 = mysqli_query($db, $MySql2);
	$necros = [];
	while ( $res2 = mysqli_fetch_array($Result2,MYSQLI_ASSOC)   ) {
		$necros[] = 	$res2;
	}
	$necromanzie[] =  [
		"necromanzia" => $res,
		"necros" => $necros
	];
}



  /*** background **/

$background = [];
$MySql = "SELECT  background.idback, background_main.nomeback, livello FROM background
	LEFT JOIN background_main ON background_main.idback=background.idback
	WHERE idutente = '$idutente'
	ORDER BY background.idback";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$background[] =  $res;
}


/*** contatti **/

$contatti = [];
$MySql = "SELECT  *  FROM contatti
	WHERE idutente = '$idutente'
	ORDER BY livello DESC";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$contatti[] =  $res;
}

/*** alleati **/

$alleati = [];
$MySql = "SELECT  *  FROM alleati
	WHERE idutente = '$idutente'
	ORDER BY livello DESC";
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$alleati[] =  $res;
}

/*** skill **/

$skill = [];
$MySql = "SELECT skill_main.idskill, livello, nomeskill  FROM skill_main
	LEFT JOIN skill ON skill_main.idskill = skill.idskill AND skill.idutente = '$idutente'
	WHERE tipologia = 0 and skill_main.subskill = 0  ORDER BY nomeskill" ;
$Result = mysqli_query($db, $MySql);
while ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
	$idskill = $res['idskill'];
	$livello = $res['livello'];
	$nomeskill = $res['nomeskill'];
	$subskill = 0;

	$subskill2 = [];
	$MySql2= "SELECT skill_main.idskill, livello, nomeskill  FROM skill_main
		LEFT JOIN skill ON skill_main.idskill = skill.idskill AND skill.idutente = '$idutente'
		WHERE tipologia = 0 and skill_main.subskill = '$idskill'  ORDER BY nomeskill";
	$Result2 = mysqli_query($db, $MySql2);
	while ( $res2 = mysqli_fetch_array($Result2,MYSQLI_ASSOC)   ) {
		$subskill2[] = $res2;
	}

	$skill[] = [
		'idskill' => $idskill,
		'nomeskill' => $nomeskill,
		'livello' => $livello,
		'subskill2' => $subskill2
	];

}

$out = [
	'personaggio' => $user,
	'discipline' => $discipline,
	'taumaturgie' => $taumaturgie,
	'necromanzie' => $necromanzie,
	'background' => $background,
	'contatti' => $contatti,
	'alleati' => $alleati,
	'skill' => $skill
];
echo json_encode ($out, JSON_UNESCAPED_UNICODE);






?>
