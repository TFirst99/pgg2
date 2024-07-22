
error_count = 0;
submitted = 0;

$(document).ready(function() {
     
     var height = $('.rect_outside').height();
     
     var p1 = 0.0;
     var p2 = 1.0;
     var p3 = 1.0;
     var p4 = 1.0;
     var p5 = 1.0;
     
     total_p1 = 0.0;
     own = 0.0;
     
     
     $.post("php/get.php", { type: "effectiveness", grp: group, pbnr : PbNr }, processAndShow);
     
     function processAndShow(data) {
          
          x = data.split("&&");
          
          sum = x[0].split('$$');
          own = x[1].split('$$');
          
          p1 = sum[0] - own[0];
          p2 = sum[1] - own[1];
          p3 = sum[2] - own[2];
          p4 = sum[3] - own[3];
          p5 = sum[4] - own[4];
          
          e1 = parseFloat(own[0]);
          e2 = parseFloat(own[1]);
          e3 = parseFloat(own[2]);
          e4 = parseFloat(own[3]);
          e5 = parseFloat(own[4]);
          
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
			 
			 
			 total_p1 = Math.round(total_p1*10)/10;
			 total_p2 = Math.round(total_p2*10)/10;
			 total_p3 = Math.round(total_p3*10)/10;
			 total_p4 = Math.round(total_p4*10)/10;
			 total_p5 = Math.round(total_p5*10)/10;
             
             
             $('div#l1').text(total_p1);
             $('div#l2').text(total_p2);
             $('div#l3').text(total_p3);
             $('div#l4').text(total_p4);
             $('div#l5').text(total_p5);
             
             
             $('#e1').val(e1.toFixed(1));
             $('#e2').val(e2.toFixed(1));
             $('#e3').val(e3.toFixed(1));
             $('#e4').val(e4.toFixed(1));
             $('#e5').val(e5.toFixed(1));
             
             own = total_p1;
          
          
     } 
     
     
     
     
     
     // check and update input
     
     $('.input').keypress(function(event) {
          
          $('#error').hide();
          
         if(event.which < 46 || event.which > 59) {
             event.preventDefault();
         } // prevent if not number/dot

         if(event.which == 46 && $(this).val().indexOf('.') != -1) {
             event.preventDefault();
         } // prevent if already dot
     });
     
     function effectiveness() {
          
          $('#error').hide();
           
         
          e1 = $('#e1').val();
          e2 = $('#e2').val();
          e3 = $('#e3').val();
          e4 = $('#e4').val();
          e5 = $('#e5').val();
          
          
     
          own_power = power - (parseFloat(e2) + parseFloat(e3) + parseFloat(e4) + parseFloat(e5));

          e1_rect1_pix = (p1 / player) * height;
          e2_rect1_pix = (p2 / player) * height; 
          e3_rect1_pix = (p3 / player) * height;
          e4_rect1_pix = (p4 / player) * height;
          e5_rect1_pix = (p5 / player) * height;

          e1_rect2_pix = ((power - (parseFloat(e2) + parseFloat(e3) + parseFloat(e4) + parseFloat(e5))) / player) * height;
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


          if(isNaN(own_power)) 
               { 
                    own_text = '?'; 
                    $('#e1').val(own_text);
               }
          else if(own_power == 1) 
               {
                    own_text = "1.0"
                    $('#e1').val(own_text);    
               }
          else 
               {
                    own_text = Math.round(own_power*10)/10
                    $('#e1').val(own_text.toFixed(1));
               }
          

          //if(own_power < 0) 
          //     {
          //         $('#e1').removeClass('legal')
          //         $('#e1').addClass('illegal')
          //     }
          //else 
          //     {
          //          $('#e1').addClass('legal')
          //          $('#e1').removeClass('illegal')        
          //     }

          total_p2 = parseFloat(p2) + parseFloat(e2);
          total_p3 = parseFloat(p3) + parseFloat(e3);
          total_p4 = parseFloat(p4) + parseFloat(e4);
          total_p5 = parseFloat(p5) + parseFloat(e5);
          
          
          total_p2 = Math.round(total_p2*10)/10;
          total_p3 = Math.round(total_p3*10)/10;
          total_p4 = Math.round(total_p4*10)/10;
          total_p5 = Math.round(total_p5*10)/10;
          
          
          if(isNaN(total_p2)) 
               {  
                    total_p2 = '?';  
               }
          if(isNaN(total_p3)) 
               {  
                    total_p3 = '?';  
               }   
          if(isNaN(total_p4)) 
               {  
                    total_p4 = '?';  
               }                           
          if(isNaN(total_p5)) 
               {  
                    total_p5 = '?';  
               }

          if(own_power < 0) 
               {
                   //$('#e1').removeClass('legal')
                   //$('#e1').addClass('illegal')
               }
          else 
               {
                    $('#e1').addClass('legal')
                    $('#e1').removeClass('illegal')        
               }               
               
               
          own = Math.round((total_p1 - (parseFloat(e2) + parseFloat(e3) + parseFloat(e4) + parseFloat(e5)) + power)*10)/10;
          if(isNaN(own))  {   own = '?'; }
          
          $('div#l1').text(own);
          $('div#l2').text(total_p2);
          $('div#l3').text(total_p3);
          $('div#l4').text(total_p4);
          $('div#l5').text(total_p5);
          
          //////$('.inner').append(e1_pix.toString() + 'px');
          //////$('.inner').append(Math.round((p2 + e2)*10)/100);
          //////$('.inner').append(" ... ");
          //////$('.inner').append(p2);
          //////$('.inner').append("  ");
          //////$('.inner').append(e2);

     }
     
     effectiveness()
     window.addEventListener('keyup', effectiveness, false)
  


     // submit
     
     function IsNumeric(n) {
     return !isNaN(parseFloat(n)) && isFinite(n);
   }
     
     $('#send').submit(function(evt) {
          
          e1 = $('#e1').val();
          e2 = $('#e2').val();
          e3 = $('#e3').val();
          e4 = $('#e4').val();
          e5 = $('#e5').val();
          
          if(!IsNumeric(e1) || !IsNumeric(e2) || !IsNumeric(e3) || !IsNumeric(e4) || !IsNumeric(e5) || e1 < 0 || e2 < 0 || e3 < 0 || e4 < 0 || e5 < 0) 
               {
               
               evt.preventDefault();
               $('#error').html('invalid input.');
               $('#error').show();
               
               error_count = error_count + 1;
               
               if(own_power < 0) 
                    {
                        $('#e1').removeClass('legal');
                        $('#e1').addClass('illegal');
                    }
               else 
                    {
                         $('#e1').addClass('legal');
                         $('#e1').removeClass('illegal');
                    }
               
               
               }    
          else 
          {
               
               var elapsed = (new Date() - window.start) / 1000;
               evt.preventDefault();
               
               e1 = Math.round(parseFloat(e1)*10)/10;
               e2 = Math.round(parseFloat(e2)*10)/10;
               e3 = Math.round(parseFloat(e3)*10)/10;
               e4 = Math.round(parseFloat(e4)*10)/10;
               e5 = Math.round(parseFloat(e5)*10)/10;
               
               if(submitted != 1) {  $.post("php/add.php", { type: "effectiveness", grp: group, pbnr : PbNr, e1 : e1, e2 : e2, e3 : e3, e4 : e4, e5 : e5, RT : elapsed, errors : error_count }, test); }
               submitted = 1;
               
               
               function test(data) {
                    //$('.inner').append(data);
                    window.location.href = "1_effectiveness_feedback.html" + "?cub=" + cubicle;
               }
               
               ////$('.inner').append('xxx');
               
               //$(document).ajaxStop(function() {
               //     
               //     //window.location.href = "1_effectiveness_feedback.html" + "?cub=" + cubicle;
               //});
               
          }
           
     });
     
     
     
});