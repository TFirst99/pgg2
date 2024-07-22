

var number = 0;

var questions = new Array();

questions[0] = 'What is the deduction effectiveness of <img src="symbols/D.png" class="small">?';
questions[1] = 'How much deduction effectiveness could <img src="symbols/A.png" class="small"> still shift to to other group members?';
questions[2] = 'How much of his/her own deduction effectiveness did <img src="symbols/A.png" class="small"> shift to other group members?';
questions[3] = 'Assume, <img src="symbols/C.png" class="small"> assigns 4 DPs to <img src="symbols/D.png" class="small"> in the deduction stage - by how many MUs does that decrease <img src="symbols/D.png" class="small"> payoff?';
questions[4] = 'Assume, <img src="symbols/A.png" class="small"> assigns 5 DPs to <img src="symbols/D.png" class="small"> in the deduction stage - by how many MUs does that decrease <img src="symbols/D.png" class="small"> payoff?';

answers = new Array(0.6,0.2,0.8,8,1);





function show(flag) {
     
     if(flag == true) {   $('#container2').fadeTo(550,0);    }
     else {     $('#ques').fadeTo(280,0);         }
          
     setTimeout(function() {
          
          var height = $('.rect_outside').height();
          
          //x = data.split("&&");
          
            sum = new Array(0.2,1.0,2.0,0.6,1.2);
            own = new Array(0.2,0,0.8,0,0);

            //$('.inner').append(x);

            p1 = sum[0] - own[0];
            p2 = sum[1] - own[1];
            p3 = sum[2] - own[2];
            p4 = sum[3] - own[3];
            p5 = sum[4] - own[4];

            e1 = own[0];
            e2 = own[1];
            e3 = own[2];
            e4 = own[3];
            e5 = own[4];

            e1_rect1_pix = (p1 / player) * height;
            e2_rect1_pix = (p2 / player) * height; 
            e3_rect1_pix = (p3 / player) * height;
            e4_rect1_pix = (p4 / player) * height;
            e5_rect1_pix = (p5 / player) * height;

            e1_rect2_pix = (e1 / player) * height;
            e2_rect2_pix = (e2 / player) * height; 
            e3_rect2_pix = (e3 / player) * height;
            e4_rect2_pix = (e4 / player) * height;
            e5_rect2_pix = (e5 / player) * height;     

            $('.rect11').css('height', e1_rect1_pix.toString() + 'px');
            $('.rect21').css('height', e2_rect1_pix.toString() + 'px');
            $('.rect31').css('height', e3_rect1_pix.toString() + 'px');
            $('.rect41').css('height', e4_rect1_pix.toString() + 'px');
            $('.rect51').css('height', e5_rect1_pix.toString() + 'px');


            $('.rect12').css(
                 {
                      'height': e1_rect2_pix.toString() + 'px',
                      'bottom': e1_rect1_pix.toString() + 'px'
                 })
            $('.rect22').css(
                 {
                      'height': e2_rect2_pix.toString() + 'px',
                      'bottom': e2_rect1_pix.toString() + 'px'
                 })          
            $('.rect32').css(
                 {
                      'height': e3_rect2_pix.toString() + 'px',
                      'bottom': e3_rect1_pix.toString() + 'px'
                 })
            $('.rect42').css(
                 {
                      'height': e4_rect2_pix.toString() + 'px',
                      'bottom': e4_rect1_pix.toString() + 'px'
                 })      
            $('.rect52').css(
                 {
                      'height': e5_rect2_pix.toString() + 'px',
                      'bottom': e5_rect1_pix.toString() + 'px'
                 })    


               total_p1 = parseFloat(p1) + parseFloat(e1);
               total_p2 = parseFloat(p2) + parseFloat(e2);
               total_p3 = parseFloat(p3) + parseFloat(e3);
               total_p4 = parseFloat(p4) + parseFloat(e4);
               total_p5 = parseFloat(p5) + parseFloat(e5);


               $('div#l1').text(total_p1);
               $('div#l2').text(total_p2);
               $('div#l3').text(total_p3);
               $('div#l4').text(total_p4);
               $('div#l5').text(total_p5);
          
          
          
          
   
          
          $('div#question').html(questions[number]);      
          
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
     
 
     if(answer.trim() == answers[number]) {    error = false;      }
     else {        error = true;       }        
     
          
     if(error == false) {    
          number = number + 1;      
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
     
     if(number < questions.length) {     show(flag);     }
     else {    window.location.href = "4_transition.html" + "?cub=" + cubicle + "&tr=" + 3;     }
     
     
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








