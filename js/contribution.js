submitted = 0;
error_count = 0;

$(document).ready(function() {
     
     // check and update input
     
     var width = $('.rect_outside').width();
              
     $('.input').keypress(function(event) {
          
         if(event.which < 47 || event.which > 59) {
             event.preventDefault();
         } // prevent if not number/dot

     });
     
     window.addEventListener('keyup', contribution, false)
     
     function contribution() {
          
          $('#con').removeClass('illegal');
          $('#con').addClass('legal');
          $('#error').hide();
          
          con = $('#con').val();
          rect_pix = (con / MUs * 100) * width/100;
          
          $('.rect11').css('width', rect_pix.toString() + 'px');
          
          if(isNaN(con) || con == '') 
               { 
                    own = '?'; 
                    $('div#l1').text(own);
               }
          else
               {
                    own = Math.round(con*10)/10
                    $('div#l1').text(own); 
                    
                    $('.rect_outside').css('opacity', 1.0);  
               }
               
               
               
          
     }
     
     

     // submit
     
     function IsNumeric(n) {
     return !isNaN(parseFloat(n)) && isFinite(n);
   }
     
     $('#send').submit(function(evt) {
          
          contr = $('#con').val();
          
          if(!IsNumeric(contr) || contr < 0 || contr > 20) 
               {
                    
               error_count = error_count + 1;
                    
               $('#con').removeClass('legal');
               $('#con').addClass('illegal');
               
               evt.preventDefault();
               $('#error').html('invalid input.');
               $('#error').show();
               
               }    
          else 
          {
               
               var elapsed = (new Date() - window.start) / 1000;
               evt.preventDefault();

               function test(data) {
                    $('.inner').append(data);
               }

			function addData() {
				$.post("php/add.php", { type: "contribution", grp: group, pbnr : PbNr, contr : contr, RT : elapsed, errors : error_count }, test).error(function() {   
					setTimeout(addData, 700);   
					});				
			}
               
               if(submitted != 1) { 
					addData();				
				}
               submitted = 1;
               

            function test(data) {
                    //console.error(data);
                    //$('.inner').append(total);
                    window.location.href = "2_contribution_feedback.html" + "?cub=" + cubicle;
               }
               
               //$(document).ajaxStop(function() {
               //     
               //     window.location.href = "2_contribution_feedback.html" + "?cub=" + cubicle;
               //     
               //});
               
          }
           
     });
     
     
     
});