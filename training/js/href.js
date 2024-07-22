

$(document).ready(function() {
     
     if(stage == 'contribution_training') {      $("a#skip").attr("href", "4_transition.html" + "?cub=" + cubicle + "&tr=" + 1); }   
     if(stage == 'deduction_training') {      $("a#skip").attr("href", "4_transition.html" + "?cub=" + cubicle + "&tr=" + 2); }
     if(stage == 'effectiveness_training') {      $("a#skip").attr("href", "4_transition.html" + "?cub=" + cubicle + "&tr=" + 3); } 
     
     
 
        
});








