<?php

	include 'db_start.inc.php';


include('phpqrcode/qrlib.php');

/***
	if (!isset ($_SESSION['idutente'])) {
		//die ("Errore, nessuna sessione attiva!");
		session_write_close();
		header("Location: index.php", true);
	}
*******/
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Notturna - Cronaca di Roma</title>
	<link href="https://fonts.googleapis.com/css?family=Libre+Baskerville" rel="stylesheet">
	<!-- <link href="w3.css" rel="stylesheet" > -->
	<style>
		/*	table td {
			border: 1px solid red;
		} */
		body {
			font-family: arial, sans-serif;
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

		table {
			border-collapse: collapse;
			border-spacing: 0;
			margin: 0 auto;
		}

		/* valign */
		.val { vertical-align: top; }
		.valm { vertical-align: middle; }


		img {
			border: 0px;
			margin: 0px;
		}
		input[type=number] {
   			width:  80px;
   			-moz-appearance: textfield;
		}
		input[type=submit] {
    		width: 80px;
			padding: 0;
			line-height: 39px;
		}


		select {
    		width: 230px;
		}
		.title {
			font-family: 'Libre Baskerville';
			font-size: 110%;
			font-weight: bold;
		}
		.title2 {
			font-size: 105%;
			font-weight: bold;
		}

		.list-align {
			text-align: justify;
			width: 100%;
			display: none;
			position: relative;
			margin: 0;
		}
		.list {
    		width: 198px;
    		/* height: 1061px; */
    		display: inline-block;
    		line-height: 1;
    		position: relative;
		}
		.listesterno {
    		width: 595px;
    		/* height: 1061px; */
    		display: inline-block;
    		line-height: 1;
    		position: relative;
		}
		.bg-image {
    		width: 100%;
    		height: 100%;
		}
		.list-inner {
			padding-left: 20px; /*for background */
			padding-top: 20px; /*for background */
			padding-bottom: 65px; /*for background */
			font-size: 10;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			/* display: inline-block; */
		}
		.list-inneresterno {
			padding-left: 40px; /*for background */
			padding-top: 40px; /*for background */
			padding-bottom: 65px; /*for background */
			font-size: 10;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			margin-top: 105px;
			/* display: inline-block; */
		}
	</style>

</head>
<body>
	<div class="list-align" style="display: block;" >

<?php
			$Mysql="SELECT * FROM oggetti order by idoggetto";
			$Result=mysqli_query($db, $Mysql);
			while ($res=mysqli_fetch_array( $Result)) {
				if ($res['fissomobile']=="M") {
					$colore='rosso';
				} else if ($res['fissomobile']=="F" ){
					$colore='blu';
				} else if ($res['fissomobile']=="U" ){
					$colore='verde';
				} else if ($res['fissomobile']=="C" ){
					$colore='nero';
				} else if ($res['fissomobile']=="E" ){
					$colore='esterno';
				}
				if ($res['fissomobile']!="E") {
					$text=(string)$res['barcode'];
					$tt=$text;
				} else {
					$tt=(string)$res['barcode'];
					$text='https://www.facebook.com/NotturnaCronacadiRoma/#/'.(string)$res['barcode'];
					$text='https://www.lucisaps.com/IlCastelloDellaFollia/#/'.(string)$res['barcode'];
				}

				$id=$res['idoggetto'];

				$Mysql2="SELECT max(valcond) as m from cond_oggetti WHERE idoggetto=$id AND tipocond='D' AND tabcond=17";
				$Result2=mysqli_query($db, $Mysql2);
				$res2=mysqli_fetch_array($Result2);
				$pot=$res2['m'];
				$Mysql2="SELECT max(valcond) as m from cond_oggetti WHERE idoggetto=$id AND tipocond='D' AND tabcond=15";
				$Result2=mysqli_query($db, $Mysql2);
				$res2=mysqli_fetch_array($Result2);
				$vel=$res2['m'];
				$Mysql2="SELECT max(valcond) as m from cond_oggetti WHERE idoggetto=$id AND tipocond='D' AND tabcond=12";
				$Result2=mysqli_query($db, $Mysql2);
				$res2=mysqli_fetch_array($Result2);
				$rob=$res2['m'];


				//QRcode::png($text);
				$tempDir =  "/web/htdocs/www.roma-by-night.it/home/notturna/tmp/";
				$filename=$tempDir."QR".$tt.".png";

				if ($res['fissomobile']=="E") {
					QRcode::png($text, $filename, QR_ECLEVEL_H);
				} else {
					QRcode::png($text, $filename, QR_ECLEVEL_Q);
				}

?>

			<div class="list<?= $res['fissomobile']=='E'?'esterno':'' ?>">
				<img src='img/cart_<?=$colore?>.png' class="bg-image" id="pg1">

				<div class="list-inner<?= $res['fissomobile']=='E'?'esterno':'' ?>">
				<span style="font-size: 6pt; ">CARTELLINO OGGETTO NUMERO <?= $res['idoggetto'] ?> </span><br> <img src='tmp/QR<?=$tt?>.png' >

				<?php if ($pot!='') { ?>
					<div style="font-size: 8pt;">POTENZA <?= $pot ?> </div>
				<?php }
				  if ($rob!='') { ?>
					<div style="font-size: 8pt;">ROBUSTEZZA <?= $rob ?> </div>
				<?php }
				   if ($vel!='') { ?>
					<div style="font-size: 8pt;">VELOCITA' <?= $vel ?> </div>
				<?php }
				   if ($res['fissomobile']=='C') { ?>
					<div style="font-size: 8pt;">CELARE </div>
				<?php } ?>
				</div>
			</div>
<?php
			}
?>



	</div>
</body>
