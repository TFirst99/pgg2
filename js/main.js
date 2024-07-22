
// cubicle number to PbNr + group

window.onpageshow = function(evt) {
    // If persisted then it is in the page cache, force a reload of the page.
    if (evt.persisted) {
        document.body.style.display = "none";
        location.reload();
    }
};


function getQueryVariable(variable) { 

     var query = window.location.search.substring(1); 
     var vars = query.split("&"); 

     for (var i = 0; i < vars.length; i++) { 

          var pair = vars[i].split("="); 
          
          if (pair[0] == variable) { 
               return unescape(pair[1]); 
          } 
     } 
     return false; 
}

var cubicle = getQueryVariable('cub');
round_selected = getQueryVariable('period');

var group = 0;
var PbNr = 0;
var ready = 0;



// main variables

var MUs = 20;
var power  = 1.0;
var player = 5;
var maxDPs = 10;
var multiplier = 1.5;
var max_rounds = 4;



if(cubicle == 1) {
     
     group = 0;
     PbNr = 0;
}
else if(cubicle == 2) {
     
     group = 2;
     PbNr = 5;     
}
else if(cubicle == 3) {
     
     group = 3;
     PbNr = 1;     
}
else if(cubicle == 4) {
     
     group = 0;
     PbNr = 0;     
}
else if(cubicle == 5) {
     
     group = 2;
     PbNr = 1;     
}
else if(cubicle == 6) {
     
     group = 5;
     PbNr = 2;     
}
else if(cubicle == 7) {
     
     group = 3;
     PbNr = 3;     
}
else if(cubicle == 8) {
     
     group = 4;
     PbNr = 2;     
}
else if(cubicle == 9) {
     
     group = 0;
     PbNr = 0;     
}
else if(cubicle == 10) {
     
     group = 1;
     PbNr = 5;     
}
else if(cubicle == 11) {
     
     group = 5;
     PbNr = 4;     
}
else if(cubicle == 12) {
     
     group = 2;
     PbNr = 4;     
}
else if(cubicle == 13) {
     
     group = 0;
     PbNr = 0;     
}
else if(cubicle == 14) {
     
     group = 1;
     PbNr = 4;     
}
else if(cubicle == 15) {
     
     group = 3;
     PbNr = 4;     
}
else if(cubicle == 16) {
     
     group = 4;
     PbNr = 4;     
}
else if(cubicle == 17) {
     
     group = 1;
     PbNr = 2;     
}
else if(cubicle == 18) {
     
     group = 5;
     PbNr = 3;     
}
else if(cubicle == 19) {
     
     group = 0;
     PbNr = 0;     
}
else if(cubicle == 20) {
     
     group = 4;
     PbNr = 3;     
}
else if(cubicle == 21) {
     
     group = 1;
     PbNr = 1;     
}
else if(cubicle == 22) {
     
     group = 0;
     PbNr = 0;     
}
else if(cubicle == 23) {
     
     group = 2;
     PbNr = 2;     
}
else if(cubicle == 24) {
     
     group = 4;
     PbNr = 5;     
}
else if(cubicle == 25) {
     
     group = 5;
     PbNr = 5;     
}
else if(cubicle == 26) {
     
     group = 1;
     PbNr = 3;     
}
else if(cubicle == 27) {
     
     group = 3;
     PbNr = 2;     
}
else if(cubicle == 28) {
     
     group = 2;
     PbNr = 3;     
}
else if(cubicle == 29) {
     
     group = 4;
     PbNr = 1;     
}
else if(cubicle == 30) {
     
     group = 0;
     PbNr = 0;     
}
else if(cubicle == 31) {
     
     group = 3;
     PbNr = 5;     
}
else if(cubicle == 32) {
     
     group = 5;
     PbNr = 1;     
}
else if(cubicle == 33) {
     
     group = 0;
     PbNr = 0;     
}




// update status

$.post('php/status.php', { stage : stage, group : group, pbnr : PbNr, change : 'change' }, xxx, 'text');

function xxx(data) {
     
     //$('.inner').append(data);
     //console.error(data);
     
}



// show content if ready

function normal_random(mean, variance) {
     
  if (mean == undefined)
    mean = 0.0;
  if (variance == undefined)
    variance = 1.0;
  var V1, V2, S;
  do {
    var U1 = Math.random();
    var U2 = Math.random();
    V1 = 2 * U1 - 1;
    V2 = 2 * U2 - 1;
    S = V1 * V1 + V2 * V2;
  } while (S > 1);

  X = Math.sqrt(-2 * Math.log(S) / S) * V1;
//  Y = Math.sqrt(-2 * Math.log(S) / S) * V2;
  X = mean + Math.sqrt(variance) * X;
//  Y = mean + Math.sqrt(variance) * Y ;
  return X;
  
}

function getReady() {
     $.post('php/status.php', { stage : stage, group : group, pbnr : PbNr }, switchResp, 'text');
}

function switchResp(data) {
     
     //console.error(1700 + normal_random(0, 15000));
     //console.error(data);         
               
     if($.trim(data) == 'ready') {
          
          //$('.inner').append('xxxx');
          
          clearInterval(ready);          
          updateContent();          
          
          //console.error(data);
          
          //$('#container1').addClass('hidden');
          //$('#container2').removeClass('hidden');
          
          setTimeout(function() {
          $('#container1').hide();
          //$('#container2').show();
               $("#container2").fadeTo(650,1);
          },1000);
                         
     }
     
     else {
          
          //$('#container2').hide();
          //$('#container1').css('visibility', 'visible');
          
          $('#container2').hide();
          $('#container1').show();
          
     }
}







// other stuff

$(document).ready(function() {


     // redirect
     
     if(stage == 'effectiveness' || stage == 'contribution' || stage == 'deduction')  { 
          
          function redirect(data) {
               
               //$('.inner').append(stage);
               //console.error(stage);
               console.error(data);
               
               flag = false;
               if(stage == 'effectiveness' && $.trim(data) == 'deduction_feedback') {   flag = true; }
               
               if($.trim(data) != stage && flag == false) {   
                    
                    if($.trim(data) == 'effectiveness') { window.location.href = "1_effectiveness.html" + "?cub=" + cubicle; }
                    else if($.trim(data) == 'contribution') {  window.location.href = "2_contribution.html" + "?cub=" + cubicle; }
                    else if($.trim(data) == 'deduction') { window.location.href = "3_deduction.html" + "?cub=" + cubicle; }
                    else if($.trim(data) == 'effectiveness_feedback') {  window.location.href = "1_effectiveness_feedback.html" + "?cub=" + cubicle; }
                    else if($.trim(data) == 'contribution_feedback') { window.location.href = "2_contribution_feedback.html" + "?cub=" + cubicle; }
                    else if($.trim(data) == 'deduction_feedback') {  window.location.href = "3_deduction_feedback.html" + "?cub=" + cubicle; }
               }
               //else {    $('#container1').show();     }
                
               
          }
                                                  
          $.post('php/redirect.php', { group : group, pbnr : PbNr }, redirect, 'text');
          
     }
     

     

     $('#submit').hover(
          function() {
     $(this).removeClass('submit-active');
     $(this).addClass('submit-inactive');               
},
     function() {
     $(this).removeClass('submit-inactive');
     $(this).addClass('submit-active');
});
     
     
     if(stage == 'effectiveness_feedback' || stage == 'contribution_feedback' || stage == 'deduction_feedback')  { 

          //getReady();
          
          //console.error(round_selected);
          //console.error('xxxx');
          
          if(round_selected != '' && stage == 'deduction_feedback') {
               
               console.error('xxxx');
               
               getReady();
               
               setTimeout(function() {
                    $("#container2").fadeTo(650,1);
                    $('#container1').hide();
               },600);      
               
          }
          else {
               $('#container2').hide();
               $('#container1').show();
          
               ready = setInterval(getReady, 1600 + normal_random(0, 10000));
               }

     }

     else {  
          
          setTimeout(function() {
               $("#container1").fadeTo(450,1);
               
               setTimeout(function() {
                    
                    $("#container1").fadeTo(450,0);
                    
                    setTimeout(function() {
                         
                         $("#container1").hide();
                    
                         $("#container2").fadeTo(650,1);
                         window.start = new Date();
                    },800);

               },1400);
               
               
               
          },1200);      
                

     }
     

});



