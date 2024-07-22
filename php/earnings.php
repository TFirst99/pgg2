
<?


$grp = $_POST['grp'];
$pbnr=$_POST['pbnr'];
$multiplier=$_POST['multiplier'];

$MUs = 20;

$type = 'contribution';

#$grp = 1;
#$pbnr = 1;
#$multiplier = 1.5;


include 'db.php';
include 'round.php';



 
$c1 = 0;
$c2 = 0;
$c3 = 0;
$c4 = 0;
$c5 = 0;
$total = 0;


$ergebnis=mysql_query("SELECT p1 FROM hce_behavior WHERE grp = $grp  AND type = 'contribution' AND round = $round AND pbnr = 1");
$c1 = mysql_fetch_row($ergebnis);
$c1 = $c1[0];

$ergebnis=mysql_query("SELECT p1 FROM hce_behavior WHERE grp = $grp  AND type = 'contribution' AND round = $round AND pbnr = 2");
$c2 = mysql_fetch_row($ergebnis);
$c2 = $c2[0];

$ergebnis=mysql_query("SELECT p1 FROM hce_behavior WHERE grp = $grp  AND type = 'contribution' AND round = $round AND pbnr = 3");
$c3 = mysql_fetch_row($ergebnis);
$c3 = $c3[0];

$ergebnis=mysql_query("SELECT p1 FROM hce_behavior WHERE grp = $grp  AND type = 'contribution' AND round = $round AND pbnr = 4");
$c4 = mysql_fetch_row($ergebnis);
$c4 = $c4[0];

$ergebnis=mysql_query("SELECT p1 FROM hce_behavior WHERE grp = $grp  AND type = 'contribution' AND round = $round AND pbnr = 5");
$c5 = mysql_fetch_row($ergebnis);
$c5 = $c5[0];



// effectiveness

$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = 'effectiveness' AND round = $round";
$ergebnis=mysql_query($anfrage);
$zeile = mysql_fetch_row($ergebnis);

if($zeile[0] != '') {
     	
     $anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = 'effectiveness' AND round = $round";
     $ergebnis=mysql_query($anfrage);
	
	while($row = mysql_fetch_assoc($ergebnis)) {
		
		$ef1 = $ef1 + $row["p1"];
		$ef2 = $ef2 + $row["p2"];
		$ef3 = $ef3 + $row["p3"];
		$ef4 = $ef4 + $row["p4"];
		$ef5 = $ef5 + $row["p5"];
		
	}
}
else {
	
	$ef1 = 1;
	$ef2 = 1;
	$ef3 = 1;
	$ef4 = 1;
	$ef5 = 1;
}



// punishment * effectiveness

$ergebnis=mysql_query("SELECT p1,p2,p3,p4,p5 FROM hce_behavior WHERE grp = $grp AND type = 'deduction' AND round = $round AND pbnr = 1");

$pun1 = mysql_fetch_row($ergebnis);
$pun1costs = $pun1[0] + $pun1[1] + $pun1[2] + $pun1[3] + $pun1[4];
for ($i = 0; $i < count($pun1); $i++) {  $pun1[$i-1] = $pun1[$i-1] * $ef1;  }

$ergebnis=mysql_query("SELECT p1,p2,p3,p4,p5 FROM hce_behavior WHERE grp = $grp AND type = 'deduction' AND round = $round AND pbnr = 2");

$pun2 = mysql_fetch_row($ergebnis);
$pun2costs = $pun2[0] + $pun2[1] + $pun2[2] + $pun2[3] + $pun2[4];
for ($i = 0; $i < count($pun2); $i++) {  $pun2[$i-1] = $pun2[$i-1] * $ef2;  }


$ergebnis=mysql_query("SELECT p1,p2,p3,p4,p5 FROM hce_behavior WHERE grp = $grp AND type = 'deduction' AND round = $round AND pbnr = 3");

$pun3 = mysql_fetch_row($ergebnis);
$pun3costs = $pun3[0] + $pun3[1] + $pun3[2] + $pun3[3] + $pun3[4];
for ($i = 0; $i < count($pun3); $i++) {  $pun3[$i-1] = $pun3[$i-1] * $ef3;  }


$ergebnis=mysql_query("SELECT p1,p2,p3,p4,p5 FROM hce_behavior WHERE grp = $grp AND type = 'deduction' AND round = $round AND pbnr = 4");

$pun4 = mysql_fetch_row($ergebnis);
$pun4costs = $pun4[0] + $pun4[1] + $pun4[2] + $pun4[3] + $pun4[4];
for ($i = 0; $i < count($pun4); $i++) {  $pun4[$i-1] = $pun4[$i-1] * $ef4;  }


$ergebnis=mysql_query("SELECT p1,p2,p3,p4,p5 FROM hce_behavior WHERE grp = $grp AND type = 'deduction' AND round = $round AND pbnr = 5");

$pun5 = mysql_fetch_row($ergebnis);
$pun5costs = $pun5[0] + $pun5[1] + $pun5[2] + $pun5[3] + $pun5[4];
for ($i = 0; $i < count($pun5); $i++) {  $pun5[$i] = $pun5[$i] * $ef5;  }


// total deduction

$ded1 = $pun1[0] + $pun2[0] + $pun3[0] + $pun4[0] + $pun5[0] + $pun1costs;
$ded2 = $pun1[1] + $pun2[1] + $pun3[1] + $pun4[1] + $pun5[1] + $pun2costs;
$ded3 = $pun1[2] + $pun2[2] + $pun3[2] + $pun4[2] + $pun5[2] + $pun3costs;
$ded4 = $pun1[3] + $pun2[3] + $pun3[3] + $pun4[3] + $pun5[3] + $pun4costs;
$ded5 = $pun1[4] + $pun2[4] + $pun3[4] + $pun4[4] + $pun5[4] + $pun5costs;



// update payoffs

if($pbnr == 1) {
	
	$conTot = ($c1 + $c2 + $c3 + $c4 + $c5) * $multiplier;
	
	$pay1 = ($conTot/5) - $ded1 + ($MUs - $c1);
	$pay2 = ($conTot/5) - $ded2 + ($MUs - $c2);
	$pay3 = ($conTot/5) - $ded3 + ($MUs - $c3);
	$pay4 = ($conTot/5) - $ded4 + ($MUs - $c4);
	$pay5 = ($conTot/5) - $ded5 + ($MUs - $c5);
	
	$anfrage="SELECT * FROM hce_payment WHERE grp = $grp";
     $ergebnis=mysql_query($anfrage);
     $zeile = mysql_fetch_row($ergebnis);

	if($zeile[0] == '') {  $anfrage="INSERT INTO hce_payment VALUES ($grp,$pay1,$pay2,$pay3,$pay4,$pay5)";	}
	else {   
		
		$pay1 = $pay1 + $zeile[1];
		$pay2 = $pay2 + $zeile[2];
		$pay3 = $pay3 + $zeile[3];
		$pay4 = $pay4 + $zeile[4];
		$pay5 = $pay5 + $zeile[5];
		
		$anfrage="UPDATE hce_payment SET p1 = $pay1, p2 = $pay2, p3 = $pay3, p4 = $pay4, p5 = $pay5 WHERE grp = $grp";	
		
		}
	
	$ergebnis=mysql_query($anfrage);	
	
}


if($pbnr == 1) {

	echo $c1 . ' $$ ' . $c2 . ' $$ ' . $c3 . ' $$ ' . $c4 . ' $$ ' . $c5 . ' && ' . $ded1 . ' $$ ' . $ded2 . ' $$ ' . $ded3 . ' $$ ' . $ded4 . ' $$ ' . $ded5;

}
else if($pbnr == 2) {

	echo $c2 . ' $$ ' . $c1 . ' $$ ' . $c3 . ' $$ ' . $c4 . ' $$ ' . $c5 . ' && ' . $ded2 . ' $$ ' . $ded1 . ' $$ ' . $ded3 . ' $$ ' . $ded4 . ' $$ ' . $ded5;
	
}
else if($pbnr == 3) {

	echo $c3 . ' $$ ' . $c1 . ' $$ ' . $c2 . ' $$ ' . $c4 . ' $$ ' . $c5 . ' && ' . $ded3 . ' $$ ' . $ded1 . ' $$ ' . $ded2 . ' $$ ' . $ded4 . ' $$ ' . $ded5;
	
}
else if($pbnr == 4) {

	echo $c4 . ' $$ ' . $c1 . ' $$ ' . $c2 . ' $$ ' . $c3 . ' $$ ' . $c5 . ' && ' . $ded4 . ' $$ ' . $ded1 . ' $$ ' . $ded2 . ' $$ ' . $ded3 . ' $$ ' . $ded5;
	
}
else if($pbnr == 5) {

	echo $c5 . ' $$ ' . $c1 . ' $$ ' . $c2 . ' $$ ' . $c3 . ' $$ ' . $c4 . ' && ' . $ded5 . ' $$ ' . $ded1 . ' $$ ' . $ded2 . ' $$ ' . $ded3 . ' $$ ' . $ded4;
	
}




mysql_close($db);


?>
