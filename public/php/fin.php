
<?

$grp=$_POST['group'];
$pbnr=$_POST['pbnr'];

//$type='effectiveness';
//$grp=1;
//$pbnr=2;

include 'db.php';


$today = 0;

$anfrage="SELECT date FROM hce_behavior WHERE grp = $grp AND pbnr = $pbnr";
$ergebnis = mysql_query($anfrage);

$today = mysql_fetch_row($ergebnis);
#$today = $today[0];

if($today == '') {   
     
     $today = getdate();
     $today = $today[year] . $today[mon] . $today[mday] . $today[hours] . $today[minutes] . $today[seconds]; 
}
else {
     
     $today = $today[0];
     
}




# power received

if($pbnr == 1) {        $anfrage="SELECT p1 FROM hce_behavior WHERE grp = $grp  AND type = 'effectiveness' AND pbnr != $pbnr";  }
elseif($pbnr == 2) {    $anfrage="SELECT p2 FROM hce_behavior WHERE grp = $grp  AND type = 'effectiveness' AND pbnr != $pbnr";  }
elseif($pbnr == 3) {    $anfrage="SELECT p3 FROM hce_behavior WHERE grp = $grp  AND type = 'effectiveness' AND pbnr != $pbnr";  }
elseif($pbnr == 4) {    $anfrage="SELECT p4 FROM hce_behavior WHERE grp = $grp  AND type = 'effectiveness' AND pbnr != $pbnr";  }
elseif($pbnr == 5) {    $anfrage="SELECT p5 FROM hce_behavior WHERE grp = $grp  AND type = 'effectiveness' AND pbnr != $pbnr";  }

$ergebnis=mysql_query($anfrage);


#echo $anfrage;

$received = 0;

while($row = mysql_fetch_row($ergebnis)) {
     
     #echo $row[0];
     #echo '.';
	
	if($row[0] != 0) {  
	     $received = 1;     
	     break;
	     }
	
}


# power given

if($pbnr == 1) {        $anfrage="SELECT p2,p3,p4,p5 FROM hce_behavior WHERE grp = $grp AND type = 'effectiveness' AND pbnr = $pbnr";  }
elseif($pbnr == 2) {    $anfrage="SELECT p1,p3,p4,p5 FROM hce_behavior WHERE grp = $grp AND type = 'effectiveness' AND pbnr = $pbnr";  }
elseif($pbnr == 3) {    $anfrage="SELECT p1,p2,p4,p5 FROM hce_behavior WHERE grp = $grp AND type = 'effectiveness' AND pbnr = $pbnr";  }
elseif($pbnr == 4) {    $anfrage="SELECT p1,p2,p3,p5 FROM hce_behavior WHERE grp = $grp AND type = 'effectiveness' AND pbnr = $pbnr";  }
elseif($pbnr == 5) {    $anfrage="SELECT p1,p2,p3,p4 FROM hce_behavior WHERE grp = $grp AND type = 'effectiveness' AND pbnr = $pbnr";  }

$ergebnis=mysql_query($anfrage);

#echo $anfrage;


$transferred = 0;

while($row = mysql_fetch_row($ergebnis)) {
     
     #echo $row[0];
     #echo '.';
	
	if($row[0] != 0 || $row[1] != 0 || $row[2] != 0 || $row[3] != 0 || $row[4] != 0) {  
	     $transferred = 1;     
	     break;
	     }
	
}


# earnings

if($pbnr == 1) {        $anfrage="SELECT p1 FROM hce_payment WHERE grp = $grp";  }
elseif($pbnr == 2) {    $anfrage="SELECT p2 FROM hce_payment WHERE grp = $grp";  }
elseif($pbnr == 3) {    $anfrage="SELECT p3 FROM hce_payment WHERE grp = $grp";  }
elseif($pbnr == 4) {    $anfrage="SELECT p4 FROM hce_payment WHERE grp = $grp";  }
elseif($pbnr == 5) {    $anfrage="SELECT p5 FROM hce_payment WHERE grp = $grp";  }

$ergebnis=mysql_query($anfrage);
$zeile = mysql_fetch_row($ergebnis);

$earnings = $zeile[0];



echo $received . ' && ' . $transferred . ' && ' . $earnings . ' && ' . $today;




mysql_close($db);


?>


