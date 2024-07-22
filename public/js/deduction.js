error_count = 0;
submitted = 0;


$(document).ready(function() {
     
     // contributions
     
     var width = $('.rect_outsideCon').width();
              
     $.post("/api/get", { type: "contribution", grp: group, pbnr : PbNr }, processAndShow);
      
     function processAndShow(data) {
      
      
          x = data.split("$$");
          
          p1 = x[0];
          p2 = x[1];
          p3 = x[2];
          p4 = x[3];
          p5 = x[4];
          
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
          
          //////$('.inner').append('xxx');
          //////$('.inner').append(p1);
          
          //////$('.inner').append(x);
      
          
     }
      
     
     
     // effectiveness
     
     var ef1 = 1.0;
     var ef2 = 1.0;
     var ef3 = 1.0;
     var ef4 = 1.0;
     var ef5 = 1.0;
     
     $.post("/api/get", { type: "effectiveness", grp: group, pbnr : PbNr }, processAndShowEf);
     
     function processAndShowEf(data) {
          
          x = data.split("&&");
          
          ////$('.inner').append(x);
          
          sum = x[0].split('$$');
          //own = x[1].split('$$');   
          
          ef1 = parseFloat(sum[0]);
          ef2 = parseFloat(sum[1]);
          ef3 = parseFloat(sum[2]);
          ef4 = parseFloat(sum[3]);
          ef5 = parseFloat(sum[4]);
          
          
          if(isNaN(ef1)) {    ef1 = 1.0;    }
          if(isNaN(ef2)) {    ef2 = 1.0;    }
          if(isNaN(ef3)) {    ef3 = 1.0;    }
          if(isNaN(ef4)) {    ef4 = 1.0;    }
          if(isNaN(ef5)) {    ef5 = 1.0;    }
          
          $('#e1').html('(' + ef1.toFixed(1) + ')');
          $('#e2').html('(' + ef2.toFixed(1) + ')');
          $('#e3').html('(' + ef3.toFixed(1) + ')');
          $('#e4').html('(' + ef4.toFixed(1) + ')');
          $('#e5').html('(' + ef5.toFixed(1) + ')');
          
          
     } 
     
     
     
     
     
     
     
     // check and update input
     
     var width = $('.rect_outsideDed2').width();
              
     $('.input').keypress(function(event) {
          
         if(event.which < 47 || event.which > 59) {
             event.preventDefault();
         } // prevent if not number/dot

     });
     
     window.addEventListener('keyup', deduction, false)
     
     function deduction() {
          
          $('#d1').removeClass('illegal'); 
          $('#d2').removeClass('illegal');
          $('#d3').removeClass('illegal'); 
          $('#d4').removeClass('illegal'); 
          $('#d5').removeClass('illegal'); 
          
          
          $('#error').html('&nbsp;');
                    
          var ded2 = $('#d2').val();
          var ded3 = $('#d3').val();
          var ded4 = $('#d4').val();
          var ded5 = $('#d5').val();
          
          //////$('.inner').append(p1);
          
          
          
          
          pun2 = Math.round(ef1 * parseInt(ded2)*10)/10;
          pun3 = Math.round(ef1 * parseInt(ded3)*10)/10;
          pun4 = Math.round(ef1 * parseInt(ded4)*10)/10;
          pun5 = Math.round(ef1 * parseInt(ded5)*10)/10;     
          
          if(!isNaN(pun2))  {   $('#c2').html('(-' + pun2 + ')');   }
          else  {   $('#c2').html('');   }
          if(!isNaN(pun3))  {   $('#c3').html('(-' + pun3 + ')');   }
          else  {   $('#c3').html('');   }
          if(!isNaN(pun4))  {   $('#c4').html('(-' + pun4 + ')');   }
          else  {   $('#c4').html('');   }
          if(!isNaN(pun5))  {   $('#c5').html('(-' + pun5 + ')');   }
          else  {   $('#c5').html('');   }
          
          
          if(isNaN(ded2) || ded2 == '') {
               
               ded2text = '?';
          } 
          else {
               
               ded2text = ded2 + '/10';
          }
          
          if(isNaN(ded3) || ded3 == '') {
               
               ded3text = '?';
          }
          else {
               
               ded3text = ded3 + '/10';
          }          
          
          if(isNaN(ded4) || ded4 == '') {
               
               ded4text = '?';
          }
          else {
               
               ded4text = ded4 + '/10';
          }          
          
          if(isNaN(ded5) || ded5 == '') {
               
               ded5text = '?';
          }
          else {
               
               ded5text = ded5 + '/10';
          }          
                        
          
          $('div#C11').text(ded2text);
          $('div#C12').text(ded3text);
          $('div#C13').text(ded4text);
          $('div#C14').text(ded5text);
          
          rect_pix2 = (ded2 / maxDPs * 100) * width/100;
          rect_pix3 = (ded3 / maxDPs * 100) * width/100;
          rect_pix4 = (ded4 / maxDPs * 100) * width/100;
          rect_pix5 = (ded5 / maxDPs * 100) * width/100;
          
          //////$('.inner').append(ded2);
          //////$('.inner').append((ded2 / maxDPs * 100) * width/100);
          
          $('.rC11').css('width', rect_pix2.toString() + 'px');
          $('.rC12').css('width', rect_pix3.toString() + 'px');
          $('.rC13').css('width', rect_pix4.toString() + 'px');
          $('.rC14').css('width', rect_pix5.toString() + 'px');
          
          
          var total = parseInt(ded2) + parseInt(ded3) + parseInt(ded4) + parseInt(ded5);
          var total_pix = (total / (maxDPs * 4) * 100) * width/100;
          
          //////$('.inner').append(total);
          //////$('.inner').append((maxDPs * 4 * 100));
          //////$('.inner').append('   ');
          
          if(isNaN(total_pix) || total_pix == '') {
               
               //total_pix = 0;
               total2 = (parseInt(ded2) || 0) + (parseInt(ded3) || 0) + (parseInt(ded4) || 0) + (parseInt(ded5) || 0);
               //////$('.inner').append('   ' + total2 + '  ');
               total_pix = (total2 / (maxDPs * 4) * 100) * width/100;
               
          }          
          
          $('.rectDed1').css('width', total_pix.toString() + 'px');
          
          if(isNaN(total) || total == '' & total != 0) {
               
               totaltext = '?';
          }
          else {
               
               totaltext = total + '/40';
          }   
          
          $('div#rDed1').text(totaltext);       
          
     
     }
     
     //deduction();
     
     

     // submit
     
     function IsNumeric(n) {
     return !isNaN(parseFloat(n)) && isFinite(n);
   }
     
     $('#send').submit(function(evt) {
          
          var ded2 = $('#d2').val();
          var ded3 = $('#d3').val();
          var ded4 = $('#d4').val();
          var ded5 = $('#d5').val();
          
          var total = parseInt(ded2) + parseInt(ded3) + parseInt(ded4) + parseInt(ded5);
          
          if(!IsNumeric(total) || total > 40 || ded2 > 10 || ded3 > 10 || ded4 > 10 || ded5 > 10 || ded2 < 0 || ded3 < 0 || ded4 < 0 || ded5 < 0) 
               {
                    
                    if(ded2 > 10 || ded2 < 0 || ded2 == '') 
                         {
                             $('#d2').addClass('illegal');
                         }
                    else 
                         {
                              $('#d2').removeClass('illegal');        
                         }

                    if(ded3 > 10 || ded3 < 0 || ded3 == '') 
                         {
                             $('#d3').addClass('illegal');
                         }
                    else 
                         {
                              $('#d3').removeClass('illegal');        
                         } 

                    if(ded4 > 10 || ded4 < 0 || ded4 == '') 
                         {
                             $('#d4').addClass('illegal');
                         }
                    else 
                         {
                              $('#d4').removeClass('illegal');        
                         }  

                    if(ded5 > 10 || ded5 < 0 || ded5 == '') 
                         {
                             $('#d5').addClass('illegal');
                         }
                    else 
                         {
                              $('#d5').removeClass('illegal');        
                         }     
               
                    
               error_count = error_count + 1;
               
               evt.preventDefault();
               $('#error').html('invalid input.');
               $('#error').show();
               
               }    
          else 
          {
               
               var elapsed = (new Date() - window.start) / 1000;
               evt.preventDefault();
               
               if(submitted != 1) { $.post("/api/add", { type: "deduction", grp: group, pbnr : PbNr, ded1 : 0, ded2 : ded2, ded3 : ded3, ded4 : ded4, ded5 : ded5, RT : elapsed, errors : error_count  }, test); }
               submitted = 1;
               
               
               function test(data) {
                    //console.error(data);
                    //$('.inner').append(total);
                    window.location.href = "3_deduction_feedback.html" + "?cub=" + cubicle;
               }
               
               //$(document).ajaxStop(function() {
               //     
               //     //window.location.href = "3_deduction_feedback.html" + "?cub=" + cubicle;
               //     
               //});
               
          }
           
     });
     
     
     
});