
<?

$type=$_POST['type'];
$grp=$_POST['grp'];
$pbnr=$_POST['pbnr'];
$RT=$_POST['RT'];
$errors=$_POST['errors'];

$members = 5;

$add = TRUE;

include 'db.php';
include 'round.php';



$today = 0;

$anfrage="SELECT date FROM hce_behavior WHERE grp = $grp AND round = 1 AND pbnr = $pbnr AND type = 'contribution'";
$ergebnis = mysql_query($anfrage);

if($round == 0 && $type == 'contribution' && mysql_num_rows($ergebnis) == '') {
     
     $today = getdate();
     $today = $today[year] . $today[mon] . $today[mday] . $today[hours] . $today[minutes] . $today[seconds];
     #today.getFullYear().toString() + (today.getDay() + 1).toString() + (today.getMonth() + 1).toString() + today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
}
else {
     
  $today = mysql_fetch_row($ergebnis);
  $today = $today[0];
	
}




if($type == 'effectiveness') {
	
	$round = $round + 1;
	
	if($pbnr == 1) {	

		$e1=$_POST['e1'];
		$e2=$_POST['e2'];
		$e3=$_POST['e3'];
		$e4=$_POST['e4'];
		$e5=$_POST['e5'];
	}
	elseif($pbnr == 2) {	

		$e2=$_POST['e1'];
		$e1=$_POST['e2'];
		$e3=$_POST['e3'];
		$e4=$_POST['e4'];
		$e5=$_POST['e5'];
	}
	elseif($pbnr == 3) {	

		$e3=$_POST['e1'];
		$e1=$_POST['e2'];
		$e2=$_POST['e3'];
		$e4=$_POST['e4'];
		$e5=$_POST['e5'];
	}	
	elseif($pbnr == 4) {	

		$e4=$_POST['e1'];
		$e1=$_POST['e2'];
		$e2=$_POST['e3'];
		$e3=$_POST['e4'];
		$e5=$_POST['e5'];
	}
	elseif($pbnr == 5) {	

		$e5=$_POST['e1'];
		$e1=$_POST['e2'];
		$e2=$_POST['e3'];
		$e3=$_POST['e4'];
		$e4=$_POST['e5'];
	}
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = '$type' AND round = $round AND pbnr = $pbnr";
	$check = mysql_query($anfrage);

	if (mysql_num_rows($check) == '') {
	     
	    $pr_round = $round-1;
	    $anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = 'deduction' AND round = $pr_round";
     	$check = mysql_query($anfrage);
	     
	     if (mysql_num_rows($check) == $members || $round == 1 || $round == 2) {

		     $anfrage="INSERT INTO hce_behavior VALUES ($grp,'$type',$pbnr,$e1,$e2,$e3,$e4,$e5, $round, $RT, $errors, '$today')";
		     $ergebnis=mysql_query($anfrage);
	     }
	}
	
	
}
	
else if($type == 'contribution') {
	
	if($round == 0 || $round == 1) {		$round = $round + 1; 		}

	$contr=$_POST['contr'];
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = '$type' AND round = $round AND pbnr = $pbnr";
	$check = mysql_query($anfrage);

	if (mysql_num_rows($check) == '') {
	     
     	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = 'effectiveness' AND round = $round";
     	$check = mysql_query($anfrage);	     
	     
	     if (mysql_num_rows($check) == $members || $round == 1 || $round == 2) {

		     $anfrage="INSERT INTO hce_behavior VALUES ($grp,'$type',$pbnr,$contr,0,0,0,0, $round, $RT, $errors, '$today')";
		     $ergebnis=mysql_query($anfrage);    
	     }
	}
	
}

else if($type == 'deduction') {
	
	if($pbnr == 1) {	
	
		$ded1=$_POST['ded1'];
		$ded2=$_POST['ded2'];
		$ded3=$_POST['ded3'];
		$ded4=$_POST['ded4'];
		$ded5=$_POST['ded5'];
	}
	elseif($pbnr == 2) {	
	
		$ded2=$_POST['ded1'];
		$ded1=$_POST['ded2'];
		$ded3=$_POST['ded3'];
		$ded4=$_POST['ded4'];
		$ded5=$_POST['ded5'];
	}
	elseif($pbnr == 3) {	
	
		$ded3=$_POST['ded1'];
		$ded1=$_POST['ded2'];
		$ded2=$_POST['ded3'];
		$ded4=$_POST['ded4'];
		$ded5=$_POST['ded5'];
	}	
	elseif($pbnr == 4) {	
	
		$ded4=$_POST['ded1'];
		$ded1=$_POST['ded2'];
		$ded2=$_POST['ded3'];
		$ded3=$_POST['ded4'];
		$ded5=$_POST['ded5'];
	}
	elseif($pbnr == 5) {	
	
		$ded5=$_POST['ded1'];
		$ded1=$_POST['ded2'];
		$ded2=$_POST['ded3'];
		$ded3=$_POST['ded4'];
		$ded4=$_POST['ded5'];
	}			
	
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = '$type' AND round = $round AND pbnr = $pbnr";
	$check = mysql_query($anfrage);

	if (mysql_num_rows($check) == '') {
	     
	     $anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = 'contribution' AND round = $round";
     	$check = mysql_query($anfrage);
     	
     	if (mysql_num_rows($check) == $members) {	     

		     $anfrage="INSERT INTO hce_behavior VALUES ($grp,'$type',$pbnr,$ded1,$ded2,$ded3,$ded4,$ded5, $round, $RT, $errors, '$today')";
		     $ergebnis=mysql_query($anfrage);
		}
	}	
	
}


#echo $anfrage;
mysql_close($db);


?>


