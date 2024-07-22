<?

$grp = 1;
$round = 1;
$type = 'contribution';

if($round == 1 && $type == 'contribution') {
     
     $today = getdate();
     $today = $today[year] . $today[mon] . $today[mday] . $today[hours] . $today[minutes];
     #today.getFullYear().toString() + (today.getDay() + 1).toString() + (today.getMonth() + 1).toString() + today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
}
else {
     
     $anfrage="SELECT date FROM hce_behavior WHERE grp = $grp AND round = $round";
	$ergebnis = mysql_query($anfrage);
	
	$today = mysql_fetch_row($ergebnis);
	#$today = $today[0];
	
	if($today == '') {   
	     
	     $today = getdate();
          $today = $today[year] . $today[mon] . $today[mday] . $today[hours] . $today[minutes];
	     
	     
	}
     
     
}


echo $today;

?>