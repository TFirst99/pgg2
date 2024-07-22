
<?


$members = 5;

$grp = $_POST['group'];
$pbnr=$_POST['pbnr'];




include 'db.php';
include 'round.php';


if($round == 1) {
	
	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = 'contribution' AND round = $round";
	$check=mysql_query($anfrage);
	
	if(mysql_num_rows($check) == $members) { $round = $round + 1; }
}





$stage = '';
$stage2 = '';

$stage = 'contribution';


# effectiveness

if($round > 2) {

$stage = 'effectiveness';

$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = '$stage' AND round = $round AND pbnr = $pbnr";
$check=mysql_query($anfrage);

if(mysql_num_rows($check) == 1) {   $stage2 = 'effectiveness_feedback';    }

}


# contribution

$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = '$stage' AND round = $round";
$check=mysql_query($anfrage);

if(mysql_num_rows($check) == $members) {
	
     $stage = 'contribution';
     $stage2 = '';

		 $anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = '$stage' AND round = $round AND pbnr = $pbnr";
		 $check=mysql_query($anfrage);

		 if(mysql_num_rows($check) == 1) {   $stage2 = 'contribution_feedback';    }
}


if($round < 3) {
	
	     $stage = 'contribution';
	     $stage2 = '';

			 $anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = '$stage' AND round = $round AND pbnr = $pbnr";
			 $check=mysql_query($anfrage);

			 if(mysql_num_rows($check) == 1) {   $stage2 = 'contribution_feedback';    }
}
	




# deduction

if($round > 1) {

$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = '$stage' AND round = $round";
$check=mysql_query($anfrage);

if(mysql_num_rows($check) == $members) {
     
     $stage = 'deduction';
     $stage2 = '';
     
     $anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = '$stage' AND round = $round AND pbnr = $pbnr";
     $check=mysql_query($anfrage);
     
     if(mysql_num_rows($check) == 1) {  $stage2 = 'deduction_feedback';    }
     
}

}



















if($stage2 == '') {    echo $stage;       }
else {    echo $stage2;     }

#echo $anfrage;


mysql_close($db);


?>
