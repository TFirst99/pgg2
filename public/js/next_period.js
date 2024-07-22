

$(document).ready(function() {
     
     $("#container").fadeTo(650,1);
     
     setTimeout(function() {
          $("#container").fadeTo(650,0);
          setTimeout(function() {
               $.post("/api/js_round", { grp: group, pbnr : PbNr }, round);
          },640); 
     },1800);   
     
     function round(data) {
          
          window.location.href = "1_effectiveness.html" + "?cub=" + cubicle;
          
     }
     
     
     
});