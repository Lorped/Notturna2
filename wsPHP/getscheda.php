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

  $idutente=$_GET['idutente'];



  /* controlli periodici */
	$MM="DELETE FROM dadi WHERE DATE_ADD( Ora , INTERVAL 24 HOUR )<NOW()";
	mysql_query($MM);

  controlla_ps ( $idutente) ;
  controlla_fdv ( $idutente) ;
  controlla_legami ($idutente) ;
  /************************/

  $user = "";

  $MySql = "SELECT *  FROM personaggio
    LEFT JOIN clan ON personaggio.idclan=clan.idclan
    LEFT JOIN statuscama ON personaggio.idstatus=statuscama.idstatus
    LEFT JOIN sentieri ON personaggio.idsentiero=sentieri.idsentiero
    LEFT JOIN generazione ON personaggio.generazione=generazione.generazione
    LEFT JOIN blood ON personaggio.bloodp=blood.bloodp
    WHERE idutente = '$idutente' ";

  $Result = mysql_query($MySql);
  if ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
    $user = $res;
    } else {
    header("HTTP/1.1 404 Not Found");
      die();
  }

  /*** discipline **/

  $discipline = [];
  $MySql = "SELECT  *  FROM discipline
        LEFT JOIN discipline_main ON discipline_main.iddisciplina=discipline.iddisciplina
        WHERE idutente = '$idutente'
        ORDER BY discipline.iddisciplina";
  $Result = mysql_query($MySql);
  while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
    $idd = $res ['iddisciplina'];

    $poteri = [];
    /*** poteri **/
    $MySql2 = "SELECT * FROM poteri
      LEFT join poteri_main on poteri.idpotere = poteri_main.idpotere
      WHERE poteri_main.iddisciplina = $idd AND idutente = '$idutente'";
    $Result2 = mysql_query($MySql2);
    while ( $res2 = mysql_fetch_array($Result2,MYSQL_ASSOC)   ) {
      $poteri[] =  $res2;
    }

    $discipline[] =  [
      "disciplina" => $res,
      "poteri" => $poteri
    ];
  }

  /*** taumaturgie **/

  $taumaturgie = [];
  $MySql = "SELECT  *  FROM taumaturgie
        LEFT JOIN taumaturgie_main ON taumaturgie_main.idtaum=taumaturgie.idtaum
        WHERE idutente = '$idutente' ORDER BY principale ASC";
  $Result = mysql_query($MySql);
  while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
		$idd = $res ['idtaum'];
		$lid = $res ['livello'];

		$MySql2 = "SELECT * FROM taumaturgie2
						WHERE idtaum = $idd AND livello <= $lid";
		$Result2 = mysql_query($MySql2);
		$taums = [];
		while ( $res2 = mysql_fetch_array($Result2,MYSQL_ASSOC)   ) {
			$taums[] = 	$res2;
		}
		$taumaturgie[] =  [
			"taumaturgia" => $res,
			"taums" => $taums
		];
  }

  /*** necromanzie  **/

  $necromanzie = [];
  $MySql = "SELECT  *  FROM necromanzie
        LEFT JOIN necromanzie_main ON necromanzie_main.idnecro=necromanzie.idnecro
        WHERE idutente = '$idutente' ORDER BY principale ASC ";
  $Result = mysql_query($MySql);
  while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
		$idd = $res ['idnecro'];
		$lid = $res ['livello'];

		$MySql2 = "SELECT * FROM necromanzie2
						WHERE idnecro = $idd AND livello <= $lid";
		$Result2 = mysql_query($MySql2);
		$necros = [];
		while ( $res2 = mysql_fetch_array($Result2,MYSQL_ASSOC)   ) {
			$necros[] = 	$res2;
		}
		$necromanzie[] =  [
			"necromanzia" => $res,
			"necros" => $necros
		];
  }

  /*** background **/

  $background = [];
  $MySql = "SELECT  *  FROM background
        LEFT JOIN background_main ON background_main.idback=background.idback
        WHERE idutente = '$idutente'
        ORDER BY background.idback";
  $Result = mysql_query($MySql);
  while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
    $background[] =  $res;
  }

  /*** contatti **/

  $contatti = [];
  $MySql = "SELECT  *  FROM contatti
        WHERE idutente = '$idutente'
        ORDER BY livello DESC";
  $Result = mysql_query($MySql);
  while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
    $contatti[] =  $res;
  }

  /*** skill **/

  $skill = [];
  $MySql = "SELECT skill_main.idskill, livello, nomeskill, tipologia  FROM skill_main
    LEFT JOIN skill ON skill_main.idskill = skill.idskill AND skill.idutente = '$idutente'
    WHERE tipologia = 0 ORDER BY nomeskill" ;
  $Result = mysql_query($MySql);
  while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
    $skill[] =  $res;
  }

	/*** skill **/

	$attitudini = [];
	$MySql = "SELECT skill_main.idskill, livello, nomeskill, tipologia FROM skill_main
		LEFT JOIN skill ON skill_main.idskill = skill.idskill AND skill.idutente = '$idutente'
		WHERE tipologia = 1 ORDER BY nomeskill" ;
	$Result = mysql_query($MySql);
	while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
		$attitudini[] =  $res;
	}


  /*** pregidifetti **/

  $pregidifetti = [];
  $MySql = "SELECT  *  FROM pregidifetti
    LEFT JOIN pregidifetti_main ON pregidifetti_main.idpregio=pregidifetti.idpregio
    WHERE idutente = '$idutente' ";
  $Result = mysql_query($MySql);
  while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
    $pregidifetti[] =  $res;
  }


  /*** rituali **/

  $rituali = [];
  $MySql = "SELECT  *  FROM rituali_t
    LEFT JOIN rituali_t_main ON rituali_t_main.idrituale=rituali_t.idrituale
    WHERE idutente = '$idutente' ORDER BY livello ASC";
  $Result = mysql_query($MySql);
  while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
    $rituali[] =  $res;
  }

  $MySql = "SELECT * FROM rituali_n
    LEFT JOIN rituali_n_main ON rituali_n_main.idrituale=rituali_n.idrituale
    WHERE idutente = '$idutente' ORDER BY livello ASC";
  $Result = mysql_query($MySql);
  while ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
    $rituali[] =  $res;
  }



  /***  PF **/
  $Mysql="SELECT attutimento FROM personaggio WHERE idutente=$idutente";
  $Result=mysql_query($Mysql);
  if ( $res=mysql_fetch_array($Result)) {
    $attutimento=$res['attutimento'];
  }

	$robustezza = 0;
  $Mysql="SELECT * FROM discipline WHERE iddisciplina = 12 and idutente=$idutente";
  $Result=mysql_query($Mysql);
  if ( $res=mysql_fetch_array($Result)) {
    $robustezza=$res['livello'];
  }

	$schivare = 0 ;
  $Mysql="SELECT * FROM skill WHERE idskill = 28 and idutente=$idutente";
  $Result=mysql_query($Mysql);
  if ( $res=mysql_fetch_array($Result)) {
    $schivare=$res['livello'];
  }

  $pf = (3+$attutimento)*2 + $robustezza + $schivare ;

  $Mysql="SELECT * FROM poteri WHERE idpotere = 70 and idutente=$idutente";
  $Result=mysql_query($Mysql);
  if ( $res=mysql_fetch_array($Result)) {
    $pf = $pf + $robustezza + 5 ;
  }

  $Mysql="SELECT * FROM poteri WHERE idpotere = 74 and idutente=$idutente";
  $Result=mysql_query($Mysql);
  if ( $res=mysql_fetch_array($Result)) {
    $pf = $pf + 5 ;   //Resilienza già +5
  }

  // ferita permanente -3 PF
  $Mysql="SELECT * FROM pregidifetti WHERE idpregio = 11 and idutente=$idutente";
  $Result=mysql_query($Mysql);
  if ( $res=mysql_fetch_array($Result)) {
    $pf=$pf-3;
  }
  // 9 vite +10 PF
  $Mysql="SELECT * FROM pregidifetti WHERE idpregio = 126 and idutente=$idutente";
  $Result=mysql_query($Mysql);
  if ( $res=mysql_fetch_array($Result)) {
    $pf=$pf+10;
  }

  /***********************/
	$rp = 0;
	$rp = floor ( ( $attutimento + $robustezza ) / 2 ) ;

	/***********************/


  $output = [
    "user" => $user,
    "pf" => $pf,
		"rp" => $rp,
    "discipline" => $discipline,
    "taumaturgie" => $taumaturgie,
    "necromanzie" => $necromanzie,
    "background" => $background,
    "contatti" => $contatti,
    "skill" => $skill,
		"attitudini" => $attitudini,
		"rituali" => $rituali,
    "pregidifetti" => $pregidifetti
  ];

	header("HTTP/1.1 200 OK");

  $out = json_encode ($output, JSON_UNESCAPED_UNICODE);
  echo $out;




//  ================================  //

function controlla_fdv ( $idutente ) {    //controllo-aggiorno fdv

  $Mysql="SELECT fdv,fdvmax,lastfdv FROM personaggio WHERE idutente=$idutente";
  $Result=mysql_query ($Mysql);
  $res=mysql_fetch_array($Result);

  $fdv=$res['fdv'];
  $fdvmax=$res['fdvmax'];
  $lastfdv=$res['lastfdv'];

  if ( $fdv == $fdvmax ) {  // tutto ok
    $Mysql="UPDATE personaggio SET lastfdv=NOW()  WHERE idutente=$idutente";
    $Result=mysql_query ($Mysql);

  } else {
    $base=strtotime("2017-01-01 18:00:00");
    $qlastftv=strtotime($lastfdv);
    $now=time();

    $tramonti0=floor( ($qlastftv - $base)/( 24*60*60 )) ;
    $tramonti1=floor(($now - $base) / ( 24*60*60 ) );

    $difftramonti=$tramonti1-$tramonti0;

    if ( $difftramonti > 0 ) {
      $newfdv=$fdv+$difftramonti;
      if ($newfdv > $fdvmax)  {$newfdv=$fdvmax ;}

      $newlastfdv=$base + $tramonti1*( 24*60*60 )+1;

      $newlastfdvstring=date("Y-m-d H:i:s",$newlastfdv );

      $Mysql="UPDATE personaggio SET fdv = $newfdv , lastfdv = '$newlastfdvstring' WHERE idutente=$idutente";
      $Result=mysql_query ($Mysql);

    } else {
      // echo "<br>da quando ho controlato fdv non è passato un tramonto";
    }
  } // fine verifica se fdv < fdvmax
} // fine controllo fdv



function controlla_ps ( $idutente) {  //inizio test su ps

  $Mysql="SELECT PScorrenti, sete, addsete, lastps FROM personaggio
    LEFT JOIN statuscama ON personaggio.idstatus = statuscama.idstatus
    LEFT JOIN blood ON personaggio.bloodp = blood.bloodp
  WHERE idutente=$idutente";
  $Result=mysql_query ($Mysql);
  $res=mysql_fetch_array($Result);

  $PScorrenti=$res['PScorrenti'];
  $setetot=$res['sete']+$res['addsete'];
  $lastps=$res['lastps'];

  if ( $PScorrenti == $setetot ) {  // tutto ok
    //
  } else {
    $now=time();
    $qlastps=strtotime($lastps);

    $diff =  ($now - $qlastps) / (24*60*60);

    if ( $diff > 1 ) {
      $newlastps=date("Y-m-d H:i:s",$now );
      $Mysql="UPDATE personaggio SET PScorrenti = $setetot , lastps = '$newlastps' WHERE idutente=$idutente";
      $Result=mysql_query ($Mysql);
    }
  }
}  //fine test su ps

function controlla_legami ($idutente) {
  // legami
  $Mysql="DELETE FROM legami WHERE target = $idutente and livello = 1 and (DATE_ADD(dataultima, INTERVAL 60 DAY) < NOW())";
  $Result = mysql_query($Mysql);
  $Mysql="UPDATE legami SET livello=1 , dataultima=NOW() WHERE target = $idutente and livello = 2 and (DATE_ADD(dataultima, INTERVAL 150 DAY) < NOW())";
  $Result = mysql_query($Mysql);
  $Mysql="UPDATE legami SET livello=2 , dataultima=NOW() WHERE target = $idutente and livello = 3 and (DATE_ADD(dataultima, INTERVAL 300 DAY) < NOW())";
  $Result = mysql_query($Mysql);
}


?>
