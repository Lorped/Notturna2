<?php
	// include ('session_start.inc.php');
	include ('db_start.inc.php');


/***********
	if (!isset ($_SESSION['idutente'])) {
		//die ("Errore, nessuna sessione attiva!");
		session_write_close();
		header("Location: index.php", true);
	}


	$idutente=$_SESSION['idutente'];
	**********/
	$idutente =$_GET['idutente'];

//	$idutente = 1;


	$MySql = "SELECT *  FROM personaggio
		LEFT JOIN clan ON personaggio.idclan=clan.idclan
		LEFT JOIN statuscama ON personaggio.idstatus=statuscama.idstatus
		LEFT JOIN sentieri ON personaggio.idsentiero=sentieri.idsentiero
		LEFT JOIN generazione ON personaggio.generazione=generazione.generazione
		LEFT JOIN blood ON personaggio.bloodp=blood.bloodp
		WHERE idutente = $idutente ";

	$Result = mysqli_query($db, $MySql);
	$res = mysqli_fetch_array($Result);

	$nome=$res['nomepg'];

	$clan=$res['nomeclan'];
	$generazione=$res['generazione'];

	$ps=$res['ps'];
	$psturno=$res['psturno'];

	$forza=$res['forza'];
	$destrezza=$res['destrezza'];
	$attutimento=$res['attutimento'];
	$carisma=$res['carisma'];
	$persuasione=$res['persuasione'];
	$saggezza=$res['saggezza'];
	$percezione=$res['percezione'];
	$intelligenza=$res['intelligenza'];
	$prontezza=$res['prontezza'];

	$fdv=$res['fdv'];
	$fdvmax=$res['fdvmax'];
	$status=$res['status'];
	$attivstatus=$res['attivazione'];

	$valsentiero=$res['valsentiero'];
	$sentiero=$res['sentiero'];
	$idsentiero=$res['idsentiero'];


	$fama1=$res['fama1']; //città
	$fama2=$res['fama2']; //vamp
	$fama3=$res['fama3'];  //wod

	$xp=$res['xp'];
	$xpspesi=$res['xpspesi'];

	$rifugio=$res['rifugio'];
	$zona = $res['zona'];

	$sete=$res['sete']+$res['addsete'];
	$bp=$res['bloodp'];

	$artigli=0;
	$Mysql="SELECT livello FROM discipline WHERE iddisciplina = 10 AND idutente = $idutente";
	$Result=mysqli_query($db, $Mysql);
	if ( $res=mysqli_fetch_array($Result)  ) {
		if ( $res['livello'] > 1 ) {
			$artigli=1;
		}
	}
	$zulo=0;
	$Mysql="SELECT livello FROM discipline WHERE iddisciplina = 16 AND idutente = $idutente";
	$Result=mysqli_query($db, $Mysql);
	if ( $res=mysqli_fetch_array($Result)  ) {
		if ( $res['livello'] > 3 ) {
			$zulo=1;
		}
	}

	//


	// PF
	$Mysql="SELECT * from discipline where iddisciplina=12 and idutente=$idutente";
	$Result=mysqli_query($db, $Mysql);
	if ( $res=mysqli_fetch_array($Result)) {
		$robustezza=$res['livello'];
	}
	$Mysql="SELECT * from skill where idskill=28 and idutente=$idutente";
	$Result=mysqli_query($db, $Mysql);
	if ( $res=mysqli_fetch_array($Result)) {
		$schivare=$res['livello'];
	}
	$pf = (3+$attutimento)*2 + $robustezza + $schivare ;

	$Mysql="SELECT * from poteri where idpotere=70 and idutente=$idutente";
	$Result=mysqli_query($db, $Mysql);
	if ( $res=mysqli_fetch_array($Result)) {
		$pf = $pf + $robustezza + 5 ;
	}
	$Mysql="SELECT * from poteri where idpotere=74 and idutente=$idutente";
	$Result=mysqli_query($db, $Mysql);
	if ( $res=mysqli_fetch_array($Result)) {
		$pf = $pf + 5 ;   //Resilienza già +5
	}

	// ferita permanente -3 PF
	$Mysql="SELECT * from pregidifetti where idpregio =11 and idutente=$idutente";
	$Result=mysqli_query($db, $Mysql);
	if ( $res=mysqli_fetch_array($Result)) {
		$pf=$pf-3;
	}
	// 9 vite +10 PF
	$Mysql="SELECT * from pregidifetti where idpregio =126 and idutente=$idutente";
	$Result=mysqli_query($db, $Mysql);
	if ( $res=mysqli_fetch_array($Result)) {
		$pf=$pf+10;
	}

	$RP = floor ( ( $attutimento + $robustezza ) / 2 ) ;

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head profile="http://gmpg.org/xfn/11">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Notturna - Cronaca di Roma</title>

	<link href="https://fonts.googleapis.com/css?family=Libre+Baskerville" rel="stylesheet">
	<!-- <link href="w3.css" rel="stylesheet" > -->
	<style>


		@font-face {
			font-family:Percolator;
			src:url(fonts/Percolator.otf)
		}
		@font-face {
			font-family:Percolator expert;
			src:url(fonts/PercolatorExpert.otf)
		}
		<!--
		@font-face{
			font-family:Goudy Old Style;
			src:url(fonts/GoudyOldStyle.ttf)
		}
		-->
		@font-face{
			font-family:Dots;
			src:url(fonts/Dots.otf)
		}

		body {
    		margin: 0;
		}

		.list-align {
			text-align: center;
			width: 100%;
			display: none;
			position: relative;
			margin: 0;
		}
		.list {
    		width: 750px;
    		height: 1061px;
    		display: inline-block;
    		line-height: 1;
    		position: relative;
		}
		.bg-image {
    		width: 100%;
    		height: 100%;
		}
		.list-inner {
			padding-left: 80px; /*for background */
			padding-right: 60px; /*for background */
			padding-top: 65px; /*for background */
			padding-bottom: 65px; /*for background */
			font-size: 0; /* to avoid margins for inline divs*/
			position: absolute;
			top: 0;
			width: 100%;
		}
		.main-header {
			font-family: Percolator;
			text-align: center;
			font-size: 40px;
			color: #000;
			height: 35px;
		}

		*,:after,:before {
			-moz-box-sizing:border-box;
			box-sizing:border-box
		}

		body {
 			font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
			font-size:14px;
			line-height:1.42857143;
			color:#333;
			background-color:#fff
		}

		.rubrica1 {
 			font-family:'Libre Baskerville';
 			text-align:left;
 			font-size:12px;
			display:inline-block;
 			line-height:22px;
			width:35%;
		}
		.rubrica2  {
 			font-family:'Dots';
			font-size:13px;
			font-style:normal;
 			text-align:center;
			display:inline-block;
 			line-height:22px;
			width:10%;
		}
		.rubrica_header {
			font-family:'Percolator expert';
			font-size:18px;
		}

		.prop {
 			font-family:'Percolator expert';
 			text-align:left;
 			font-size:17px;
		}
		.prop,.prop_value {
 			display:inline-block;
 			line-height:22px;
		}
		.prop_value {
 			font-family:'Libre Baskerville';
 			font-size:14px;
 			font-style:italic;
 			text-align:center;
 			vertical-align:top
		}
		.tabellaarmi {
			width:100%;
		}
		.propx , .propx3 {
			font-family:'Percolator expert';
 			font-size:16px;
			vertical-align:top;
			display:inline-block;
 			line-height:24px;
			text-align:center;
			width:20%;
		}
		.propx3 {
			width:25%;
		}
		.prop2, .prop3 {
			font-family:'Libre Baskerville';
 			font-size:12px;
			vertical-align:top;
			display:inline-block;
 			line-height:21px;
			text-align:center;
			width:20%;
		}
		.prop3 {

			width:25%;
		}

		.header-sub {
 			font-family:'Percolator expert';
 			text-align:center;
 			font-size:28px;
 			top:0
		}
		.header-sub,.header-sub-img {
 			position:absolute;
 			width:100%
		}
		.header-sub-img {
 			top:10px;
 			left:0
		}
		.header-sub-placeholder {
 			display:inline-block;
 			position:relative;
 			width:100%;
 			height:30px
		}
		.header-sub-bg {
 			position:absolute;
 			width:100%
		}
		.header-sub-bg img {
 			height:20px
		}

		.dots {
			font-family:'Dots';
 			font-size:13px;
			font-style:normal;
		}

		.red {
			color:#e71010;
			font-style:bold;
		}



		.prop-header {
 			position:absolute;
 			top:0;
 			width:100%
		}
		.prop-header,.prop-header-nobg, .prop-header-nobg2 {
 			font-family:'Percolator expert';
 			text-align:center;
 			font-size:22px
		}
		.prop-header-nobg {
 			width:33.3%;
 			display:inline-block
		}
		.prop-header-nobg2 {
 			width:50%;
 			display:inline-block
		}
		.prop-header-img {
 			width:100%;
 			position:absolute;
 			top:10px;
 			left:0
		}
		.prop-header-placeholder {
 			display:inline-block;
 			position:relative;
 			width:100%;
 			height:25px
		}
		.prop-header-bg {
 			position:absolute;
 			width:100%
		}
		.prop-header-bg img {
 			height:20px
		}

		.attr {
			font-family: 'Libre Baskerville';
 			text-align:left;
 			font-size:12px;
			width:21.3%;
		}
		.attr,.attr_value {
 			display:inline-block;
 			line-height:20px;
 			vertical-align:top;
		}
		.attr_value {
			font-family: 'Dots';
 			font-size:13px;
			font-style:normal;
			width:12%;
		}

		.abilities,.advantages,.attributes {
			width:100%;
 			text-align:center;
 			line-height:12px
		}
		.background_container,.umanita_container,.rituali_container {
			width:33.3%;
 			text-align:center;
			display: inline-block;
			vertical-align: top;
		}

		.discipline,.vie  {
 			width:50%;
 			display:inline-block;
 			vertical-align:top
		}

		.disc_name {
			font-family: 'Libre Baskerville';
 			text-align:left;
 			font-size:12px;
		}
		.disc_name,.disc_value {
 			line-height:20px;
 			display:inline-block;
 			width:50%
		}
		.disc_value {
			font-family: 'Dots';
 			font-size:13px;
			font-style:normal;
 			vertical-align:top;
		}

		.background, .fama, .rituali {
 			line-height:1.4;
		}

		.umanita {
			height: 12px;
			white-space: nowrap;
			font-family: 'Dots';
			vertical-align: top;
			display: inline-block;
			font-size:13px;
		}

		.rituali_name {
			font-family: 'Libre Baskerville';
			text-align:left;
			font-size:10px;
			width:100%;
			line-height:20px;
			display:inline-block;
		}
		.rituali_name_empty {
			font-family: 'Libre Baskerville';
			text-align:left;
			font-size:10px;
			width:100%;
			line-height:15px;
			display:inline-block;
		}


		.bg_name {
			font-family: 'Libre Baskerville';
			text-align:left;
			font-size:12px;
			width:60%
		}
		.bg_name,.bg_value {
			line-height:20px;
			display:inline-block;

		}
		.bg_value {
			font-family: 'Dots';
			font-size:13px;
			font-style:normal;
			vertical-align:top;
			width:40%
		}

		.fama_name {
			font-family: 'Libre Baskerville';
			text-align:left;
			font-size:11px;
			width:75%;
		}
		.fama_name,.fama_value {
			line-height:20px;
			display:inline-block;

		}
		.fama_value {
			font-family: 'Dots';
			font-size:13px;
			font-style:normal;
			vertical-align:top;
			width:25%;
		}



		hr {
			border-top: 1px solid #000000;
			margin-top: 0.2em;
    		margin-bottom: 0.2em;
		}
		.ald {
			text-align:right;
		}
		.alc {
			text-align:center;
		}


		img {
			border: 0px;
			margin: 0px;
		}
		.owner {
			font-family: 'Libre Baskerville';
			font-size: 105%;
			font-weight: bold;
		}


		/* valign */
		.vab { vertical-align: bottom; }
		.vam { vertical-align: middle; }


	</style>



</head>
<body>
	<div class="list-align" style="display: block;" >
    	<div class="list"><img src="img/index.png" class="bg-image" id="pg1">
			<div class="list-inner">
				<div class="main-header">NOTTURNA</div>
				<div class="props">
        			<div class="prop" style="width:8%">Nome:</div>
          			<div class="prop_value" style="width:32%"><?=$nome?></div>
					<div class="prop" style="width:8%">Clan:</div>
					<div class="prop_value" style="width:20%"><?=$clan?></div>
					<div class="prop" style="width:20%">Generazione:</div>
					<div class="prop_value" style="width:12%"><?=$generazione?></div>
					<div class="prop" style="width:8%">Status:</div>
					<div class="prop_value" style="width:32%"><?=$status?> (+<?=$attivstatus?>)</div>
					<div class="prop" style="width:8%">PF</div>
					<div class="prop_value" style="width:20%"><?= $pf ?></div>
					<div class="prop" style="width:10%">XP:</div>
					<div class="prop_value" style="width:22%"><?=$xp." (spesi ".$xpspesi.")"?></div>
					<div class="prop" style="width:8%">Rifugio:</div>
					<div class="prop_value" style="width:32%"><?=$rifugio?></div>
					<div class="prop" style="width:19%">Blood Potency</div>
					<div class="prop_value" style="width:9%"><?=$bp?></div>
					<div class="prop" style="width:16%">Res.Dom.: <?=floor(($intelligenza+$prontezza+$percezione+$carisma+$fdv)/5)?>  </div>
					<div class="prop" style="width:16%">Res.Pal.: <?=$RP?></div>
					<div class="prop" style="width:22%" >Ruolo nel Clan: </div>
					<div class="prop_value vab" style="width:22%;"><hr></div>
					<div class="prop" style="width:32%">&nbsp; Ruolo nella Camarilla: </div>
					<div class="prop_value vab" style="width:23%"><hr></div>
				</div>    <!-- end props -->

				<div class="header-sub-placeholder"><img src="img/bar.png" class="header-sub-img">
	      			<div class="header-sub-bg"><img src="img/pixel.gif" width="150px"></div>
        			<div class="header-sub"><span>Attributi</span></div>
     			</div>
      			<div class="prop-header-nobg"><span>Fisici</span></div>
      			<div class="prop-header-nobg"><span>Sociali</span></div>
      			<div class="prop-header-nobg"><span>Mentali</span></div>

      			<div class="attributes">

					<div class="attr">Forza</div>
					<div class="attr_value">
<?php
for ( $i = 0 ; $i < $forza; $i++) echo "B";
for ( $i = $forza ; $i < 5; $i++) echo "A";
?>
					</div>
					<div class="attr">Carisma</div>
					<div class="attr_value">
<?php
for ( $i = 0 ; $i < $carisma; $i++) echo "B";
for ( $i = $carisma ; $i < 5; $i++) echo "A";
?>
					</div>
					<div class="attr">Percezione</div>
					<div class="attr_value">
<?php
for ( $i = 0 ; $i < $percezione; $i++) echo "B";
for ( $i = $percezione ; $i < 5; $i++) echo "A";
?>
					</div>
					<div class="attr">Destrezza</div>
					<div class="attr_value">
<?php
for ( $i = 0 ; $i < $destrezza; $i++) echo "B";
for ( $i = $destrezza ; $i < 5; $i++) echo "A";
?>
					</div>
					<div class="attr">Persuasione</div>
					<div class="attr_value">
<?php
for ( $i = 0 ; $i < $persuasione; $i++) echo "B";
for ( $i = $persuasione ; $i < 5; $i++) echo "A";
?>
					</div>
					<div class="attr">Intelligenza</div>
					<div class="attr_value">
<?php
for ( $i = 0 ; $i < $intelligenza; $i++) echo "B";
for ( $i = $intelligenza ; $i < 5; $i++) echo "A";
?>
					</div>
					<div class="attr">Attutimento</div>
					<div class="attr_value">
<?php
for ( $i = 0 ; $i < $attutimento; $i++) echo "B";
for ( $i = $attutimento ; $i < 5; $i++) echo "A";
?>
					</div>
					<div class="attr">Saggezza</div>
					<div class="attr_value">
<?php
for ( $i = 0 ; $i < $saggezza; $i++) echo "B";
for ( $i = $saggezza ; $i < 5; $i++) echo "A";
?>
					</div>
					<div class="attr">Prontezza</div>
					<div class="attr_value ">
<?php
for ( $i = 0 ; $i < $prontezza; $i++) echo "B";
for ( $i = $prontezza ; $i < 5; $i++) echo "A";
?>
					</div>
				</div>
				<!-- Fine attributi -->
				<!-- conoscenze header -->
				<div class="header-sub-placeholder"><img src="img/bar.png" class="header-sub-img">
					<div class="header-sub-bg"><img src="img/pixel.gif" width="150px"></div>
					<div class="header-sub"><span>Conoscenze</span></div>
				</div>
				<div class="abilities">
<?php
	$Mysql = "SELECT COUNT(*) FROM skill_main WHERE tipologia = 0";
	$res = mysqli_fetch_array ( mysqli_query($db, $Mysql) ) ;
	$num_rows= $res[0];

	$Mysql="SELECT * FROM skill_main LEFT JOIN skill ON skill_main.idskill = skill.idskill AND skill.idutente = $idutente WHERE tipologia = 0 ORDER BY nomeskill";
	$Result=mysqli_query($db, $Mysql);
	while ($res=mysqli_fetch_array($Result) ) {
		$liv = $res['livello'];
		if ($liv=='') $liv=0;
?>
					<div class="attr" ><?=$res['nomeskill']?></div>
					<div class="attr_value">
<?php
			for ( $i = 0 ; $i < $liv; $i++) echo "B";
			for ( $i = $liv ; $i < 5; $i++) echo "A";
?>
					</div>
<?php
		}
		for ( $i = 0 ; $i < $num_rows-floor($num_rows/3)*3+1 ; $i++ ) {
?>
					<div class="attr vab"  ><hr></div>
					<div class="attr_value">AAAAA</div>
<?php
		}
?>
				</div>
				<!-- Fine abilità -->
				<!-- attitudini header -->
				<div class="header-sub-placeholder"><img src="img/bar.png" class="header-sub-img">
					<div class="header-sub-bg"><img src="img/pixel.gif" width="150px"></div>
					<div class="header-sub"><span>Attitudini</span></div>
				</div>
				<div class="abilities">
<?php
	$Mysql="SELECT * FROM skill_main LEFT JOIN skill ON skill_main.idskill = skill.idskill AND skill.idutente = $idutente WHERE tipologia = 1 ORDER BY nomeskill";
	$Result=mysqli_query($db, $Mysql);
	while ($res=mysqli_fetch_array($Result) ) {
		$liv = $res['livello'];
		if ($liv=='') $liv=0;
?>
					<div class="attr" ><?=$res['nomeskill']?></div>
					<div class="attr_value">
<?php
		for ( $i = 0 ; $i < $liv; $i++) echo "B";
		for ( $i = $liv ; $i < 5; $i++) echo "A";
?>
					</div>
<?php
	}
?>
				</div>  	<!-- Fine attitudini -->
				<!-- discipline header -->
				<div class="header-sub-placeholder"><img src="img/bar.png" class="header-sub-img">
					<div class="header-sub-bg"><img src="img/pixel.gif" width="150px"></div>
					<div class="header-sub"><span>Discipline</span></div>
				</div>
            	<div class="prop-header-nobg2"><span>Discipline</span></div>
            	<div class="prop-header-nobg2"><span>Vie Taumaturgiche / Necromant.</span></div>
				<div class="advantages">
					<div class="discipline">
<?php
	$MySql = "SELECT  nomedisc ,livello  FROM discipline
    	LEFT JOIN discipline_main ON discipline_main.iddisciplina=discipline.iddisciplina
        WHERE idutente = $idutente
        ORDER BY  discipline.iddisciplina";
	$Results = mysqli_query($db, $MySql);
	while ( $res=mysqli_fetch_array($Results)) {
		$liv=$res['livello'];
?>
						<div class="disc_name" ><?=$res['nomedisc']?></div>
						<div class="disc_value">
<?php
		for ( $i = 0 ; $i < $liv; $i++) echo "B";
		for ( $i = $liv ; $i < 5; $i++) echo "A";
?>
						</div>
<?php
	}
	for (  $i=mysqli_num_rows($Results) ; $i< 5 ; $i++ ) {
?>
						<div class="disc_name vab" ><hr></div>
						<div class="disc_value">AAAAA</div>
<?php
	}
?>
					</div>
					<div class="vie">
<?php
	$MySql = "SELECT  nometaum, livello  FROM taumaturgie
    	LEFT JOIN taumaturgie_main ON taumaturgie_main.idtaum=taumaturgie.idtaum
    	WHERE idutente = $idutente ORDER BY livello DESC ";
	$Results = mysqli_query($db, $MySql);
	while ( $res=mysqli_fetch_array($Results)) {
		$liv=$res['livello'];
?>
						<div class="disc_name" ><?=$res['nometaum']?></div>
						<div class="disc_value">
<?php
		for ( $i = 0 ; $i < $liv; $i++) echo "B";
		for ( $i = $liv ; $i < 5; $i++) echo "A";
?>
						</div>
<?php
	}
	$MySql = "SELECT  nomenecro, livello  FROM necromanzie
    	LEFT JOIN necromanzie_main ON necromanzie_main.idnecro=necromanzie.idnecro
    	WHERE idutente = $idutente ORDER BY livello DESC";
	$Results2 = mysqli_query($db, $MySql);
	while ( $res=mysqli_fetch_array($Results2)) {
		$liv=$res['livello'];
?>
						<div class="disc_name" ><?=$res['nomenecro']?></div>
						<div class="disc_value">
<?php
		for ( $i = 0 ; $i < $liv; $i++) echo "B";
		for ( $i = $liv ; $i < 5; $i++) echo "A";
?>
						</div>
<?php
	}
	for (  $i=mysqli_num_rows($Results)+mysqli_num_rows($Results2) ; $i< 5 ; $i++ ) {
?>
						<div class="disc_name vab" ><hr></div>
						<div class="disc_value">AAAAA</div>
<?php
	}
?>
					</div>
				</div>	<!-- fine macrodiscipline -->


				<div class="background_container">
					<div class="prop-header-placeholder"><img src="img/bar2.png" class="prop-header-img">
            		<div class="prop-header-bg"><img src="img/pixel.gif" width="130px"></div>
						<div class="prop-header"><span>Background</span></div>
					</div>
					<div class="background">
<?php
	$MySql = "SELECT * FROM background_main
		LEFT JOIN background ON background.idback=background_main.idback and idutente=$idutente";
	$Result=mysqli_query($db, $MySql);
	while ($res=mysqli_fetch_array($Result)) {
		$liv=$res['livello'];
		if ($liv =="" ) $liv=0;
?>
						<div class="bg_name" ><?=$res['nomeback']?></div>
						<div class="bg_value">
<?php
		for ( $i = 0 ; $i < $liv; $i++) echo "B";
		for ( $i = $liv ; $i < 5; $i++) echo "A";
?>
						</div>
<?php
	}
?>
					</div>
					<div class="prop-header-placeholder"><img src="img/bar2.png" class="prop-header-img">
						<div class="prop-header-bg"><img src="img/pixel.gif" width="130px"></div>
						<div class="prop-header"><span>Contatti</span></div>
					</div>
					<div class="background">
<?php
	$MySql = "SELECT * FROM contatti WHERE idutente=$idutente ORDER BY livello DESC";
	$Result=mysqli_query($db, $MySql);
	while ($res=mysqli_fetch_array($Result)) {
		$liv=$res['livello'];
?>
						<div class="bg_name" ><?=$res['nomecontatto']?></div>
						<div class="bg_value">
<?php
		for ( $i = 0 ; $i < $liv; $i++) echo "B";
		for ( $i = $liv ; $i < 5; $i++) echo "A";
?>
						</div>
<?php
	}
	for (  $i=mysqli_num_rows($Result) ; $i< 6 ; $i++ ) {
?>
						<div class="bg_name vab" style="width:60%;" ><hr></div>
						<div class="bg_value">AAAAA</div>
<?php
	}
?>
					</div>
				</div>



				<div class="umanita_container">
				<!-- sentiero header-->
					<div class="prop-header-placeholder" ><img src="img/bar2.png" class="prop-header-img">
						<div class="prop-header-bg"><img src="img/pixel.gif" width="130px"></div>
						<div class="prop-header"><span><?=($idsentiero==1?"Umanità":"Sentiero")?></span></div>
					</div>
					<!-- sentiero -->
					<div class="prop" style="width:100%; text-align:center; line-height:12px;"><?=($idsentiero==1?"&nbsp;":$sentiero)?></div>
					<div style="margin-top:10px;" >
						<div class="umanita" style="width:100%">
<?php
	for ( $i = 0 ; $i < $valsentiero; $i++) echo "B";
	for ( $i = $valsentiero ; $i < 10; $i++) echo "A";
?>
						</div>
					</div>
					<!-- FDV header-->
					<div class="prop-header-placeholder" style="margin-top:18px"><img src="img/bar2.png" class="prop-header-img">
						<div class="prop-header-bg"><img src="img/pixel.gif" width="130px"></div>
						<div class="prop-header"><span>Volontà</span></div>
					</div>
					<!-- FDV -->
					<div style="margin-top:10px;" >
						<div class="umanita" style="width:100%;">
<?php
	for ( $i = 0 ; $i < $fdvmax; $i++) echo "B";
	for ( $i = $fdvmax ; $i < 10; $i++) echo "A";
?>
						</div>
						<div class="umanita" style="width:100%;">
<?php
	for ( $i = 0 ; $i < ($fdvmax-$fdv); $i++) echo "D";
	for ( $i = ($fdvmax-$fdv) ; $i < $fdvmax; $i++) echo "C";
?>
						</div>

					</div>
					<!-- PS header-->
					<div class="prop-header-placeholder" style="margin-top:17px"><img src="img/bar2.png" class="prop-header-img">
						<div class="prop-header-bg"><img src="img/pixel.gif" width="130px"></div>
						<div class="prop-header"><span>Sete</span></div>
					</div>
					<div class="prop"><?=$sete?> </div>
					<div style="margin-top:10px;" >
						<div class="umanita" style="width:100%;">
<?php
	for ( $i = 0 ; $i < $sete; $i++) echo "C";
?>
						</div>
					</div>
					<!-- fama header-->
					<div class="prop-header-placeholder" style="margin-top:18px"><img src="img/bar2.png" class="prop-header-img">
						<div class="prop-header-bg"><img src="img/pixel.gif" width="130px"></div>
						<div class="prop-header"><span>Fama</span></div>
					</div>
					<!-- fama -->
					<div class="fama">
						<div class="fama_name" >Fama in Città</div>
						<div class="fama_value">
<?php
	for ( $i = 0 ; $i < $fama1; $i++) echo "B";
	for ( $i = $fama1 ; $i < 5; $i++) echo "A";
?>
						</div>
						<div class="fama_name" >Fama tra i Vampiri</div>
						<div class="fama_value">
<?php
	for ( $i = 0 ; $i < $fama2; $i++) echo "B";
	for ( $i = $fama2 ; $i < 5; $i++) echo "A";
?>
						</div>
						<div class="fama_name" >Fama nel Mondo Oscuro</div>
						<div class="fama_value">
<?php
	for ( $i = 0 ; $i < $fama3; $i++) echo "B";
	for ( $i = $fama3 ; $i < 5; $i++) echo "A";
?>
						</div>
					</div>
				</div>


				<!-- qui altro... -->
				<div class="rituali_container">
					<div class="prop-header-placeholder"><img src="img/bar2.png" class="prop-header-img">
						<div class="prop-header-bg"><img src="img/pixel.gif" width="130px"></div>
						<div class="prop-header"><span>Rituali</span></div>
					</div>
					<div class="rituali" >
<?php
	$MySql = "SELECT  nomerituale ,livello FROM rituali_n
    	LEFT JOIN rituali_n_main ON rituali_n_main.idrituale=rituali_n.idrituale
        WHERE idutente = '$idutente' ORDER BY livello ASC";
	$Results = mysqli_query($db,$MySql);
	while ($res=mysqli_fetch_array($Results)) {
		$liv=$res['livello'];
?>
						<div class="rituali_name">&nbsp;<?=$res['nomerituale']?></div>
<?php
	}
	$MySql = "SELECT  nomerituale ,livello FROM rituali_t
    	LEFT JOIN rituali_t_main ON rituali_t_main.idrituale=rituali_t.idrituale
        WHERE idutente = '$idutente' ORDER BY livello ASC";
	$Results2 = mysqli_query($db, $MySql);
	while ($res=mysqli_fetch_array($Results2)) {
		$liv=$res['livello'];
?>
						<div class="rituali_name">&nbsp;<?=$res['nomerituale']?></div>
<?php
	}
	for (  $i=mysqli_num_rows($Results)+mysqli_num_rows($Results2) ; $i< 7 ; $i++ ) {
?>
						<div class="rituali_name_empty">&nbsp;<hr></div>
<?php
	}
?>
					</div>
					<div class="prop-header-placeholder"><img src="img/bar2.png" class="prop-header-img">
						<div class="prop-header-bg"><img src="img/pixel.gif" width="130px"></div>
						<div class="prop-header"><span>Pregi/Difetti</span></div>
					</div>
					<div class="rituali" >
<?php
	$MySql = "SELECT  * FROM pregidifetti
    	LEFT JOIN pregidifetti_main ON pregidifetti_main.idpregio=pregidifetti.idpregio
        WHERE idutente = '$idutente' ORDER BY valore ASC";
	$Results = mysqli_query($db, $MySql);
	while ($res=mysqli_fetch_array($Results)) {
		$liv=$res['livello'];
?>
						<div class="rituali_name">&nbsp;<?=$res['nomepregio']?></div>
<?php
	}
	for (  $i=mysqli_num_rows($Results) ; $i< 7 ; $i++ ) {
?>
						<div class="rituali_name_empty">&nbsp;<hr></div>
<?php
	}
?>
					</div>
				</div>
			</div> <!-- Fine LIST INNER -->
		</div>			<!-- Fine LIST  -->
	</div>			<!-- Fine LIST ALIGN -->


<?php
	$Mysql="SELECT livello FROM skill WHERE idskill=23 AND idutente=$idutente";
	$rissa=mysqli_fetch_array ( mysqli_query($db, $Mysql) )['livello'];

	if ($rissa == "" ) $rissa=0;
	// $rissa=$rissa -2;
	if ($rissa <0 ) $rissa=0;

	$Mysql="SELECT livello FROM skill WHERE idskill=24 AND idutente=$idutente";
	$mischia=mysqli_fetch_array ( mysqli_query($db, $Mysql) )['livello'];

	if ($mischia == "" ) $mischia=0;

	$Mysql="SELECT livello FROM skill WHERE idskill=25 AND idutente=$idutente";
	$fuoco=mysqli_fetch_array ( mysqli_query($db, $Mysql) )['livello'];

	if ($fuoco == "" ) $fuoco=0;
	$Bfuoco=$fuoco -2;
	if ($Bfuoco <0 ) $Bfuoco=0;

	$Mysql="SELECT livello FROM skill WHERE idskill=26 AND idutente=$idutente";
	$tiro=mysqli_fetch_array ( mysqli_query($db, $Mysql) )['livello'];

	if ($tiro == "" ) $tiro=0;
	$tiro=$tiro -2;
	if ($tiro <0 ) $tiro=0;

	$Mysql="SELECT livello FROM skill WHERE idskill=26 AND idutente=$idutente";
	$lancio=mysqli_fetch_array ( mysqli_query($db, $Mysql) )['livello'];

	if ($lancio == "" ) $lancio=0;
	$lancio=$lancio -2;
	if ($lancio <0 ) $lancio=0;

	$Mysql="SELECT livello FROM discipline WHERE iddisciplina=17 AND idutente=$idutente";
	$potenza=mysqli_fetch_array ( mysqli_query($db, $Mysql) )['livello'];

	if ($potenza == "" ) $potenza=0;
	?>


	<div class="list-align" style="display: block;" >
    	<div class="list"><img src="img/index.png" class="bg-image">
			<div class="list-inner">

				<div class="main-header">Poteri</div>
				<div class="tabellaarmix">

<?php 				
					$Mysql="SELECT * FROM discipline LEFT JOIN discipline_main ON discipline.iddisciplina = discipline_main.iddisciplina where idutente=$idutente and livello>0 and discipline_main.iddisciplina!=99 and discipline_main.iddisciplina!=98 ORDER BY discipline.livello DESC";
					$Result=mysqli_query($db, $Mysql);
					while ( $res=mysqli_fetch_array($Result)) {
						$aiddisc=$res['iddisciplina'];
?>
					<div class="background_container">
						<div class="prop-header-placeholder"><img src="img/bar2.png" class="prop-header-img">
							<div class="prop-header-bg"><img src="img/pixel.gif" width="130px"></div>
							<div class="prop-header"><span><?=$res['nomedisc'] ?></span></div>
						</div>

						<div class="rituali" >
<?php
						$MySql = "SELECT * FROM poteri
									LEFT JOIN poteri_main ON poteri_main.idpotere=poteri.idpotere
										WHERE idutente = '$idutente' and iddisciplina=$aiddisc ORDER BY livellopot ASC";
						$Results = mysqli_query($db, $MySql);
						while ($res=mysqli_fetch_array($Results)) {
								$liv=$res['livellopot'];
						?>
												<div class="rituali_name">&nbsp;(<?=$liv?>)&nbsp;<?=$res['nomepotere']?></div>
						<?php
							}

						?>
					</div>
						</div>
<?php
					}
?>

				</div>
				<div class="header-sub-placeholder"><img src="img/bar.png" class="header-sub-img"></div>

				<div class="main-header">Rubrica</div>
				<div class="tabellaarmix">
					<div class="rubrica1 rubrica_header">Contatto</div>
					<div class="rubrica1 rubrica_header">Annotazioni</div>
					<div class="rubrica2 rubrica_header">Cell.</div>
					<div class="rubrica2 rubrica_header">Email</div>
					<div class="rubrica2 rubrica_header">Rifug.</div>
<?php
					$Mysql="SELECT * from rubrica where owner=$idutente";
					$Result=mysqli_query($db, $Mysql);
					while ( $res=mysqli_fetch_array($Result)) {
?>
					<div class="rubrica1"><?=$res['contatto']?></div>
					<div class="rubrica1"><?=$res['note']?></div>
					<div class="rubrica2"><?=($res['cell']==1?"D":"C")?></div>
					<div class="rubrica2"><?=($res['email']==1?"D":"C")?></div>
					<div class="rubrica2"><?=($res['home']==1?"D":"C")?></div>
<?php
					}
?>
					<div class="rubrica1 vab" style="width:30%"><hr></div>
					<div class="rubrica2" style="width:5%">&nbsp;</div>
					<div class="rubrica1 vab" style="width:30%"><hr></div>
					<div class="rubrica2" style="width:5%">&nbsp;</div>
					<div class="rubrica2">C</div>
					<div class="rubrica2">C</div>
					<div class="rubrica2">C</div>
					<!--
					<div class="rubrica1 vab" style="width:30%"><hr></div>
					<div class="rubrica2" style="width:5%">&nbsp;</div>
					<div class="rubrica1 vab" style="width:30%"><hr></div>
					<div class="rubrica2" style="width:5%">&nbsp;</div>
					<div class="rubrica2">C</div>
					<div class="rubrica2">C</div>
					<div class="rubrica2">C</div>
				-->
				</div>

				<div class="header-sub-placeholder"><img src="img/bar.png" class="header-sub-img">
<!--					<div class="header-sub-bg"><img src="img/pixel.gif" width="180px"></div>
						<div class="header-sub"><span>Armi da Fuoco</span></div> -->
				</div>


				<div class="main-header">Tabella Danni</div>
				<div class="tabellaarmix">

					<div class="tabellaarmi">
						<div class="propx" style="text-align:left;">Descrizione</div>
						<div class="propx">Danno Base</div>
						<div class="propx">Attitudine</div>
						<div class="propx">Potenza</div>
						<div class="propx">DANNI</div>
					</div>
					<div class="tabellaarmi">
						<div class="prop2" style="text-align:left;">Pugno/Calcio</div>
						<div class="prop2">(Fo+ATT+Po)/2</div>
						<div class="prop2">Rissa</div>
						<div class="prop2">SI</div>
						<div class="prop2" style="font-style:bold"><?=ceil(($forza+$rissa+$potenza)/2)?></div>
					</div>

<?php if ($zulo ==1 ) { ?>

					<div class="tabellaarmi">
						<div class="prop2" style="text-align:left;">Forma zulo</div>
						<div class="prop2">(Fo+ATT+Po+3)/2</div>
						<div class="prop2">Rissa</div>
						<div class="prop2">SI</div>
						<div class="prop2" style="font-style:bold"><?=ceil(($forza+3+$rissa+$potenza)/2)?></div>
					</div>

<?php } ?>
<?php if ($artigli ==1 ) { ?>
					<div class="tabellaarmi">
						<div class="prop2" style="text-align:left;">Artigli della Bestia</div>
						<div class="prop2">Fo+ATT+Po+1</div>
						<div class="prop2">Rissa</div>
						<div class="prop2">SI</div>
						<div class="prop2" style="font-style:bold"><?=($forza+$rissa+$potenza+1)?></div>
					</div>
<?php } ?>
					<div class="tabellaarmi">
						<div class="prop2" style="text-align:left;">Pugnale/Paletto </div>
						<div class="prop2">(Fo+ATT+Po)/2+1</div>
						<div class="prop2">Mischia</div>
						<div class="prop2">SI</div>
						<div class="prop2" style="font-style:bold"><?=ceil(($forza+$mischia+$potenza)/2)+1?></div>
					</div>
					<div class="tabellaarmi">
						<div class="prop2" style="text-align:left;">Spada corta/Mazza</div>
						<div class="prop2">(Fo+ATT+Po)/2+2</div>
						<div class="prop2">Mischia</div>
						<div class="prop2">SI</div>
						<div class="prop2" style="font-style:bold"><?=ceil(($forza+$mischia+$potenza)/2)+2?></div>
					</div>
					<div class="tabellaarmi">
						<div class="prop2" style="text-align:left;">Spada lunga</div>
						<div class="prop2">(Fo+ATT+Po)/2+3</div>
						<div class="prop2">Mischia</div>
						<div class="prop2">SI</div>
						<div class="prop2" style="font-style:bold"><?=ceil(($forza+$mischia+$potenza)/2)+3?></div>
					</div>
					<div class="tabellaarmi">
						<div class="prop2" style="text-align:left;">Pugnale da lancio</div>
						<div class="prop2">(Fo+ATT+Po)/2+1</div>
						<div class="prop2">Armi da lancio</div>
						<div class="prop2">SI</div>
						<div class="prop2" style="font-style:bold"><?=ceil(($forza+$lancio+$potenza)/2)+1?></div>
					</div>
					<div class="tabellaarmi">
						<div class="prop2" style="text-align:left;">Balestra</div>
						<div class="prop2">(3+ATT)/2+1</div>
						<div class="prop2">Armi da tiro</div>
						<div class="prop2">NO</div>
						<div class="prop2" style="font-style:bold"><?=ceil((3+$tiro)/2)+1?></div>
					</div>

					<div class="header-sub-placeholder"><img src="img/bar.png" class="header-sub-img">
						<div class="header-sub-bg"><img src="img/pixel.gif" width="180px"></div>
						<div class="header-sub"><span>Armi da Fuoco</span></div>
					</div>

					<div class="tabellaarmi">
						<div class="propx3" style="text-align:left;">Descrizione</div>
						<div class="propx3">Min. Attitud.</div>
						<div class="propx3">Danno Base</div>
						<div class="propx3">Danni</div>
					</div>
					<div class="tabellaarmi">
						<div class="prop3" style="text-align:left;">Revolver/Pistola leggera</div>
						<div class="prop3">1</div>
						<div class="prop3">(3+Fuoco)/2</div>
						<div class="prop3"><?=($fuoco>=1?ceil((3+$fuoco)/2):"-")?></div>
					</div>
					<div class="tabellaarmi">
						<div class="prop3" style="text-align:left;">Revolver/Pistola pesante</div>
						<div class="prop3">1</div>
						<div class="prop3">(3+Fuoco)/2+1</div>
						<div class="prop3"><?=($fuoco>=1?ceil((3+$fuoco)/2)+1:"-")?></div>
					</div>
					<div class="tabellaarmi">
						<div class="prop3" style="text-align:left;">Mitra leggero</div>
						<div class="prop3">2</div>
						<div class="prop3">(3+Fuoco)/2+2</div>
						<div class="prop3"><?=($fuoco>=2?ceil((3+$fuoco)/2)+2:"-")?></div>
					</div>
					<div class="tabellaarmi">
						<div class="prop3" style="text-align:left;">Mitra pesante/d'assalto</div>
						<div class="prop3">3</div>
						<div class="prop3">(3+Fuoco)/2+3</div>
						<div class="prop3"><?=($fuoco>=3?ceil((3+$fuoco)/2)+3:"-")?></div>
					</div>

				</div>
			</div>
		</div>
	</div>
	<p>
	<p>
	<p>
	<p>
	<table>
		<tr>
			<td colspan=9 >&nbsp;</td>
		</tr>
		<tr>
			<td colspan=9 >&nbsp;</td>
		</tr>
		<tr>
			<td colspan=9 >&nbsp;</td>
		</tr>

		<tr>
			<td colspan=9 ><button class="w3-btn w3-white w3-border w3-border-red w3-round w3-block" onclick="javascript:window.print();">Stampa</button></td>
		</tr>
		<!---
		<tr>
			<td colspan=9 ><button class="w3-btn w3-white w3-border w3-border-blue w3-round w3-block" onclick="javascript:window.location.href='scheda.php'">Indietro</button></td>
		</tr>
	-->
	</table>



</body>
