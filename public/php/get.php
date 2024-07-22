
<?

$type=$_POST['type'];
$grp=$_POST['grp'];
$pbnr=$_POST['pbnr'];
$round=$_POST['round'];

//$type='effectiveness';
//$grp=1;
//$pbnr=1;

include 'db.php';


if($round == '') {   include 'round.php';  }





$p1 = 0;
$p2 = 0;
$p3 = 0;
$p4 = 0;
$p5 = 0;



if($type == 'effectiveness') {
	
	#$roundCheck = $round - 1;
	#if($round != 1) {  $roundCheck = $round -1 }
	#else {   $roundCheck = $round      }
	#$round = $round -1;
	#if($round < 0) {    $round = 1;  }
	#$round = $round - 1;
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp  AND type = '$type' AND round = $round";
	$ergebnis=mysql_query($anfrage);	
	
	while ($row = mysql_fetch_assoc($ergebnis)) {
		
		$p1 = $p1 + $row["p1"];
		$p2 = $p2 + $row["p2"];
		$p3 = $p3 + $row["p3"];
		$p4 = $p4 + $row["p4"];
		$p5 = $p5 + $row["p5"];		
		
	}
	
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = '$type' AND round = $round AND pbnr = $pbnr";
	$ergebnis=mysql_query($anfrage);
	
	$row = mysql_fetch_assoc($ergebnis);
	
	if($row != '') {
	
			if($pbnr == 1) {	
			
				echo $p1 . ' $$ ' . $p2 . ' $$ ' . $p3 . ' $$ ' . $p4 . ' $$ ' . $p5 . ' && ' . $row["p1"] . ' $$ ' . $row["p2"] . ' $$ ' . $row["p3"] . ' $$ ' . $row["p4"] . ' $$ ' . $row["p5"];
  		
			}
			elseif($pbnr == 2) {	
			
				echo $p2 . ' $$ ' . $p1 . ' $$ ' . $p3 . ' $$ ' . $p4 . ' $$ ' . $p5 . ' && ' . $row["p2"] . ' $$ ' . $row["p1"] . ' $$ ' . $row["p3"] . ' $$ ' . $row["p4"] . ' $$ ' . $row["p5"];
  		
			}
			elseif($pbnr == 3) {	
			
				echo $p3 . ' $$ ' . $p1 . ' $$ ' . $p2 . ' $$ ' . $p4 . ' $$ ' . $p5 . ' && ' . $row["p3"] . ' $$ ' . $row["p1"] . ' $$ ' . $row["p2"] . ' $$ ' . $row["p4"] . ' $$ ' . $row["p5"];
  		
			}	
			elseif($pbnr == 4) {	
			
				echo $p4 . ' $$ ' . $p1 . ' $$ ' . $p2 . ' $$ ' . $p3 . ' $$ ' . $p5 . ' && ' . $row["p4"] . ' $$ ' . $row["p1"] . ' $$ ' . $row["p2"] . ' $$ ' . $row["p3"] . ' $$ ' . $row["p5"];
  		
			}
			elseif($pbnr == 5) {	
			
				echo $p5 . ' $$ ' . $p1 . ' $$ ' . $p2 . ' $$ ' . $p3 . ' $$ ' . $p4 . ' && ' . $row["p5"] . ' $$ ' . $row["p1"] . ' $$ ' . $row["p2"] . ' $$ ' . $row["p3"] . ' $$ ' . $row["p4"];
  		
			}
	}

}

else if($type == 'contribution') {

	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp  AND type = '$type' AND round = $round AND pbnr = 1";
	$ergebnis=mysql_query($anfrage);
	
	$p1 = mysql_fetch_row($ergebnis);
	$p1 = $p1[3];
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp  AND type = '$type' AND round = $round AND pbnr = 2";
	$ergebnis=mysql_query($anfrage);
	
	$p2 = mysql_fetch_row($ergebnis);
	$p2 = $p2[3];
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp  AND type = '$type' AND round = $round AND pbnr = 3";
	$ergebnis=mysql_query($anfrage);
	
	$p3 = mysql_fetch_row($ergebnis);
	$p3 = $p3[3];
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp  AND type = '$type' AND round = $round AND pbnr = 4";
	$ergebnis=mysql_query($anfrage);
	
	$p4 = mysql_fetch_row($ergebnis);
	$p4 = $p4[3];			
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp  AND type = '$type' AND round = $round AND pbnr = 5";
	$ergebnis=mysql_query($anfrage);
	
	$p5 = mysql_fetch_row($ergebnis);
	$p5 = $p5[3];
	
	
	if($pbnr == 1) {	
		
	echo $p1 . ' $$ ' . $p2 . ' $$ ' . $p3 . ' $$ ' . $p4 . ' $$ ' . $p5;
	}
	else if($pbnr == 2) {	
	
	echo $p2 . ' $$ ' . $p1 . ' $$ ' . $p3 . ' $$ ' . $p4 . ' $$ ' . $p5;
	}
	else if($pbnr == 3) {	
	
	echo $p3 . ' $$ ' . $p1 . ' $$ ' . $p2 . ' $$ ' . $p4 . ' $$ ' . $p5;
	}	
	else if($pbnr == 4) {	
	
	echo $p4 . ' $$ ' . $p1 . ' $$ ' . $p2 . ' $$ ' . $p3 . ' $$ ' . $p5;
	}
	else if($pbnr == 5) {	
	
	echo $p5 . ' $$ ' . $p1 . ' $$ ' . $p2 . ' $$ ' . $p3 . ' $$ ' . $p4;
	}

	
}

else if($type == 'deduction') {
	
	
	
	$array_order = array(1,2,3,4,5);
	unset($array_order[$pbnr-1]);
	array_unshift($array_order, $pbnr);
	
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp  AND type = '$type' AND round = $round AND pbnr = 1";
	$ergebnis=mysql_query($anfrage);
	$zeile = mysql_fetch_row($ergebnis);
	$p1 = $zeile[$array_order[0]+2] . ' $$ ' . $zeile[$array_order[1]+2] . ' $$ ' . $zeile[$array_order[2]+2] . ' $$ ' . $zeile[$array_order[3]+2] . ' $$ ' . $zeile[$array_order[4]+2];
	//$p1 = implode(" $$ ", array_slice(mysql_fetch_row($ergebnis),3,5));
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp  AND type = '$type' AND round = $round AND pbnr = 2";
	$ergebnis=mysql_query($anfrage);
	$zeile = mysql_fetch_row($ergebnis);
	$p2 = $zeile[$array_order[0]+2] . ' $$ ' . $zeile[$array_order[1]+2] . ' $$ ' . $zeile[$array_order[2]+2] . ' $$ ' . $zeile[$array_order[3]+2] . ' $$ ' . $zeile[$array_order[4]+2];
	
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp  AND type = '$type' AND round = $round AND pbnr = 3";
	$ergebnis=mysql_query($anfrage);
	$zeile = mysql_fetch_row($ergebnis);
	$p3 = $zeile[$array_order[0]+2] . ' $$ ' . $zeile[$array_order[1]+2] . ' $$ ' . $zeile[$array_order[2]+2] . ' $$ ' . $zeile[$array_order[3]+2] . ' $$ ' . $zeile[$array_order[4]+2];
	//$p3 = implode(" $$ ", array_slice(mysql_fetch_row($ergebnis),3,5));
	
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp  AND type = '$type' AND round = $round AND pbnr = 4";
	$ergebnis=mysql_query($anfrage);
	$zeile = mysql_fetch_row($ergebnis);
	$p4 = $zeile[$array_order[0]+2] . ' $$ ' . $zeile[$array_order[1]+2] . ' $$ ' . $zeile[$array_order[2]+2] . ' $$ ' . $zeile[$array_order[3]+2] . ' $$ ' . $zeile[$array_order[4]+2];
	//$p4 = implode(" $$ ", array_slice(mysql_fetch_row($ergebnis),3,5));		

	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp  AND type = '$type' AND round = $round AND pbnr = 5";
	$ergebnis=mysql_query($anfrage);
	$zeile = mysql_fetch_row($ergebnis);
	$p5 = $zeile[$array_order[0]+2] . ' $$ ' . $zeile[$array_order[1]+2] . ' $$ ' . $zeile[$array_order[2]+2] . ' $$ ' . $zeile[$array_order[3]+2] . ' $$ ' . $zeile[$array_order[4]+2];
	//$p5 = implode(" $$ ", array_slice(mysql_fetch_row($ergebnis),3,5));	
	
	
	
	if($pbnr == 1) {	

	echo $p1 . ' && ' . $p2 . ' && ' . $p3 . ' && ' . $p4 . ' && ' . $p5;
	}
	elseif($pbnr == 2) {	

	echo $p2 . ' && ' . $p1 . ' && ' . $p3 . ' && ' . $p4 . ' && ' . $p5;
	}
	elseif($pbnr == 3) {	

	echo $p3 . ' && ' . $p1 . ' && ' . $p2 . ' && ' . $p4 . ' && ' . $p5;
	}	
	elseif($pbnr == 4) {	

	echo $p4 . ' && ' . $p1 . ' && ' . $p2 . ' && ' . $p3 . ' && ' . $p5;
	}
	elseif($pbnr == 5) {	

	echo $p5 . ' && ' . $p1 . ' && ' . $p2 . ' && ' . $p3 . ' && ' . $p4;
	}	
	
}



mysql_close($db);


?>


