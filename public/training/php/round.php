<?

include 'db.php'; 

$anfrage="SELECT MAX(round) as round FROM hce_behavior WHERE grp = $grp AND pbnr = $pbnr";
$ergebnis=mysql_query($anfrage);

$round = mysql_fetch_row($ergebnis);

if($round[0] == '') {  $round = 0;   }
else {    $round = $round[0];        }



?>