
function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var order = [1,2,3];
//var order = [1];
shuffle(order);
i = 0;

var number = 0;
var distribution_nr = 0;


var distribution1 = new Array(0,0,0,0,0);
var distribution2 = new Array(16,14,2,18,20); 
var distribution3 = new Array(20,20,20,20,20); 

var answers1      = new Array(0,20,0,0,0,20,20);
var answers2      = new Array(20,18,70,105,21,21,39);
var answers3      = new Array(0,20,100,150,30,30,30);



var questions1 = new Array();

questions1[0] = 'How many MUs did <img src="symbols/B.png" class="small"> contribute to the group project?';
questions1[1] = 'How many MUs did <img src="symbols/D.png" class="small"> keep for herself?';                
questions1[2] = 'How many MUs were in total contributed to the group project?';
questions1[3] = 'What is the output of the group project?';
questions1[4] = 'How many MUs will each group member receive from the group project?';
questions1[5] = 'How many MUs will <img src="symbols/B.png" class="small">  earn in this period?';       
questions1[6] = 'How many MUs will <img src="symbols/D.png" class="small"> earn in this period?';


var questions2 = new Array();

questions2[0] = 'How many MUs did <img src="symbols/E.png" class="small"> contribute to the group project?';
questions2[1] = 'How many MUs did <img src="symbols/C.png" class="small"> keep for herself?';          
questions2[2] = 'How many MUs were in total contributed to the group project?';
questions2[3] = 'What is the output of the group project?';
questions2[4] = 'How many MUs will each group member receive from the group project?';
questions2[5] = 'How many MUs will <img src="symbols/E.png" class="small"> earn in this period?';
questions2[6] = 'How many MUs will <img src="symbols/C.png" class="small"> earn in this period?';

    
var questions3 = new Array();

questions3[0] = 'How many MUs did <img src="symbols/C.png" class="small"> keep for herself?';               
questions3[1] = 'How many MUs did <img src="symbols/A.png" class="small"> contribute to the group project?';
questions3[2] = 'How many MUs were in total contributed to the group project?';  
questions3[3] = 'What is the output of the group project?';               
questions3[4] = 'How many MUs will each group member receive from the group project?';
questions3[5] = 'How many MUs will <img src="symbols/A.png" class="small"> earn in this period?';        
questions3[6] = 'How many MUs will <img src="symbols/E.png" class="small"> earn in this period?';           


function show(flag) {
     
     if(flag == true) {   $('#container2').fadeTo(550,0);    }
     else {     $('#ques').fadeTo(280,0);         }
          
     setTimeout(function() {
          
          var width = $('.rect_outsideCon').width();
          
          if(order[distribution_nr] == 1) {
          
               p1 = distribution1[0];
               p2 = distribution1[1];
               p3 = distribution1[2];
               p4 = distribution1[3];
               p5 = distribution1[4];
          }
          else if(order[distribution_nr] == 2) {
          
               p1 = distribution2[0];
               p2 = distribution2[1];
               p3 = distribution2[2];
               p4 = distribution2[3];
               p5 = distribution2[4];
          }          
          else if(order[distribution_nr] == 3) {
          
               p1 = distribution3[0];
               p2 = distribution3[1];
               p3 = distribution3[2];
               p4 = distribution3[3];
               p5 = distribution3[4];
          }                    
          
          e1_rect1_pix = (p1 / MUs) * width;
          e2_rect2_pix = (p2 / MUs) * width; 
          e3_rect3_pix = (p3 / MUs) * width;
          e4_rect4_pix = (p4 / MUs) * width;
          e5_rect5_pix = (p5 / MUs) * width;
          
          $('.rectContr1').css('width', e1_rect1_pix.toString() + 'px');
          $('.rectContr2').css('width', e2_rect2_pix.toString() + 'px');
          $('.rectContr3').css('width', e3_rect3_pix.toString() + 'px');
          $('.rectContr4').css('width', e4_rect4_pix.toString() + 'px');
          $('.rectContr5').css('width', e5_rect5_pix.toString() + 'px');
          
          $('div#rC1').text(p1 + '/' + MUs);
          $('div#rC2').text(p2 + '/' + MUs);
          $('div#rC3').text(p3 + '/' + MUs);
          $('div#rC4').text(p4 + '/' + MUs);
          $('div#rC5').text(p5 + '/' + MUs);
          
          
          if(order[distribution_nr] == 1) {          $('div#question').html(questions1[number]);     }
          else if(order[distribution_nr] == 2) {     $('div#question').html(questions2[number]);     }
          else if(order[distribution_nr] == 3) {     $('div#question').html(questions3[number]);     }
          
          $('#con').val('');
          
     },340); 
          
     
     if(flag == true) {   $('#container2').fadeTo(550,1);    }
     else {     $('#ques').fadeTo(280,1);         }
     
}

function check() {
     
     //console.error('xxx');
     
     answer = $('#con').val();
     
     error = true;
     flag = false;
     
     if(order[distribution_nr] == 1) {     
          if(answer.trim() == answers1[number]) {    error = false;       }
          else {        error = true;       }
          }
     else if(order[distribution_nr] == 2) {     
          if(answer.trim() == answers2[number]) {    error = false;       }
          else {        error = true;       }        
          }
     else if(order[distribution_nr] == 3) {     
          if(answer.trim() == answers3[number]) {    error = false;      }
          else {        error = true;       }        
          }  
          
     if(error == false) {    
          number = number + 1;      
          if(number > 6) {  
               number = 0;     
               distribution_nr = distribution_nr + 1;
               flag = true;
               }
     }
               
     if(error == true) {
          
          setTimeout(function() {
               $('#error').html('wrong answer.');
               $('#error').show();
          },350);     
          
     }
     
     else {
          
          $('#error').hide();
     }
     
     if(distribution_nr < order.length) {     show(flag);     }
     else {    window.location.href = "4_transition.html" + "?cub=" + cubicle + "&tr=" + 1;     }
     
     
}



$(document).ready(function() {
        
     
     $('#submit').hover(
     function() {
     $(this).removeClass('submit-active');
     $(this).addClass('submit-inactive');               
     },
     function() {
     $(this).removeClass('submit-inactive');
     $(this).addClass('submit-active');
     }
     );
     
     //if(order[i] == 1) {
     //     
     //     
     //     
     //     
     //}
     
     show(true);
     
     $('#send').submit(function(evt) {
          
          evt.preventDefault();
          check();
          
          
          
           
     });
          
});








