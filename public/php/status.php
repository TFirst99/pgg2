
<?

//$group = '10';
//$stage = 'effectiveness';

$members = 5;

$grp = $_POST['group'];
$stage = $_POST['stage'];

$change = $_POST['change'];
$pbnr=$_POST['pbnr'];


if($stage == 'contribution_feedback') {      $st = 'contribution';     }
elseif($stage == 'deduction_feedback') {      $st = 'deduction';     }
elseif($stage == 'effectiveness_feedback') {      $st = 'effectiveness';     }


include 'db.php';
include 'round.php';




if($change == 'change') {
	
	$anfrage="UPDATE hce_ready SET ". 'p'.$pbnr . " = '$stage' WHERE grp = $grp"; 
	$ergebnis=mysql_query($anfrage);
	
	}
	
else {	
     
  $anfrage="SELECT * FROM hce_behavior WHERE grp = $grp AND type = '$st' AND round = $round";
	$ergebnis=mysql_query($anfrage);
	
	$row_nr = mysql_num_rows($ergebnis);
     
     if($row_nr == $members) {
          
          $status = 'ready';
          
     }
     
     else {
          
          $status = 'waiting';
          
     }
     
		
	#$anfrage="SELECT * FROM hce_ready WHERE grp = $group"; 
	#$ergebnis=mysql_query($anfrage);
	#$zeile=mysql_fetch_row($ergebnis);
	#
	#if($zeile[1] == $stage && $zeile[2] == $stage && $zeile[3] == $stage && $zeile[4] == $stage && $zeile[5] == $stage) {
	#	
	#	$status = 'ready';
	#}
	#else {
	#	
	#	$status = 'waiting';	
	#}	
	
}	


mysql_close($db);
echo $status;

?>
