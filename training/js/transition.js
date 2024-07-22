var training = getQueryVariable('tr');


$(document).ready(function() {
     
     if(training == 1) {
          
          $("h1").html('You finished the training.<br><br>You now enter the first Period.');
          
     }
     
     else {
          
          $("h1").html('You finished the training.<br><br>You now enter the next Period.');
          
     }
     
     $("#container").fadeTo(1150,1);
     
     setTimeout(function() {
          $("#container").fadeTo(650,0);
     },2800);   
     
     
     if(training == 1 || training == 2) {
     
          setTimeout(function() {
               window.location.href = "../2_contribution.html" + "?cub=" + cubicle;
               },4000);  
          }    
 
     if(training == 3) {
          
          setTimeout(function() {
               window.location.href = "../1_effectiveness.html" + "?cub=" + cubicle;
               },4000);  
          }     
     
     
});