<?


include 'db.php'; 

$anfrage="SELECT MAX(round) as round FROM hce_behavior WHERE grp = $grp AND pbnr = $pbnr";
$ergebnis=mysql_query($anfrage);

$round = mysql_fetch_row($ergebnis);

if($round[0] == '') {  $round = 0;   }
else {    $round = $round[0];        }


#if($round == 0 || $round == 1) {
#	
#	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = 'contribution' AND round = $round AND pbnr = $pbnr";
#	$check=mysql_query($anfrage);
#	
#	#if(mysql_num_rows($check) != 1) {   		$round = $round + 1;   	 	}
#	#else {
#	#	
#	#	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = 'contribution' AND round = $round";
#	#	$check=mysql_query($anfrage);
#	#	
#	#	if(mysql_num_rows($check) == 5) {   $round = $round + 1;    }		
#	#	
#	#}
#	
#}
#elseif($round > 2) {
#	
#	$anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = 'effectiveness' AND round = $round AND pbnr = $pbnr";
#	$check=mysql_query($anfrage);
#	
#	if(mysql_num_rows($check) == 1) {   $round = $round + 1;    }
#	
#}

?>