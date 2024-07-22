


$.post('/api/status', { stage : stage, group : group, pbnr : PbNr, change : 'change' }, xxx, 'text');



function xxx(data) {
     
     console.error(data);
     
}

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
     $.post('/api/status', { stage : stage, group : group, pbnr : PbNr }, switchResp, 'text');
}

function switchResp(data) {
     
     //console.error(1700 + normal_random(0, 15000));
     console.error($.trim(data));    
     
          
               
     if($.trim(data) == 'ready') {
          
          //$('.inner').append('xxxx');
          
          clearInterval(ready);          
          window.location.href = "5_next_period.html" + "?cub=" + cubicle;
                         
     }
     
}



$(document).ready(function() {     
     
     
     ready = setInterval(getReady, 1600 + normal_random(0, 10000));
     
     
});



