var con;



$.post("/api/js_round", { grp: group, pbnr : PbNr }, round);
 
 function round(data) {
      
      rounds = parseInt(data);
 }



function updateContent() {
     
     // check and update input
     
     var width = $('.rect_outsideCon').width();
              
     $.post("/api/get", { type: "contribution", grp: group, pbnr : PbNr }, processAndShow);
      
     function processAndShow(data) {
      
      
          x = data.split("$$");
          
          p1 = x[0].trim();
          p2 = x[1].trim();
          p3 = x[2].trim();
          p4 = x[3].trim();
          p5 = x[4].trim();
          
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
          ////$('.inner').append('.' + p5.trim() + '.');
          
          //////$('.inner').append(x);
      
          
     }
      
}


$(document).ready(function() {
     
     
     //
     //function deduction() {
     //     
     //     $('#error').hide();
     //               
     //     var ded2 = $('#d2').val();
     //     var ded3 = $('#d3').val();
     //     var ded4 = $('#d4').val();
     //     var ded5 = $('#d5').val();
     //     
     //     
     //     if(ded2 > 10) 
     //          {
     //              $('#d2').addClass('illegal')
     //          }
     //     else 
     //          {
     //               $('#d2').removeClass('illegal')        
     //          }
     //          
     //     if(ded3 > 10) 
     //          {
     //              $('#d3').addClass('illegal')
     //          }
     //     else 
     //          {
     //               $('#d3').removeClass('illegal')        
     //          } 
     //                        
     //     if(ded4 > 10) 
     //          {
     //              $('#d4').addClass('illegal')
     //          }
     //     else 
     //          {
     //               $('#d4').removeClass('illegal')        
     //          }  
     //
     //     if(ded5 > 10) 
     //          {
     //              $('#d5').addClass('illegal')
     //          }
     //     else 
     //          {
     //               $('#d5').removeClass('illegal')        
     //          }       
     //
     //
     //
     //     
     //     
     //     
     //     if(isNaN(ded2) || ded2 == '') {
     //          
     //          ded2text = '?';
     //     } 
     //     else {
     //          
     //          ded2text = ded2 + '/10';
     //     }
     //     
     //     if(isNaN(ded3) || ded3 == '') {
     //          
     //          ded3text = '?';
     //     }
     //     else {
     //          
     //          ded3text = ded3 + '/10';
     //     }          
     //     
     //     if(isNaN(ded4) || ded4 == '') {
     //          
     //          ded4text = '?';
     //     }
     //     else {
     //          
     //          ded4text = ded4 + '/10';
     //     }          
     //     
     //     if(isNaN(ded5) || ded5 == '') {
     //          
     //          ded5text = '?';
     //     }
     //     else {
     //          
     //          ded5text = ded5 + '/10';
     //     }          
     //                   
     //     
     //     $('div#C11').text(ded2text);
     //     $('div#C12').text(ded3text);
     //     $('div#C13').text(ded4text);
     //     $('div#C14').text(ded5text);
     //     
     //     rect_pix2 = (ded2 / maxDPs * 100) * width/100;
     //     rect_pix3 = (ded3 / maxDPs * 100) * width/100;
     //     rect_pix4 = (ded4 / maxDPs * 100) * width/100;
     //     rect_pix5 = (ded5 / maxDPs * 100) * width/100;
     //     
     //     //////$('.inner').append(ded2);
     //     //////$('.inner').append((ded2 / maxDPs * 100) * width/100);
     //     
     //     $('.rC11').css('width', rect_pix2.toString() + 'px');
     //     $('.rC12').css('width', rect_pix3.toString() + 'px');
     //     $('.rC13').css('width', rect_pix4.toString() + 'px');
     //     $('.rC14').css('width', rect_pix5.toString() + 'px');
     //     
     //     
     //     var total = parseInt(ded2) + parseInt(ded3) + parseInt(ded4) + parseInt(ded5);
     //     var total_pix = (total / (maxDPs * 4) * 100) * width/100;
     //     
     //     //////$('.inner').append(total);
     //     //////$('.inner').append((maxDPs * 4 * 100));
     //     //////$('.inner').append('   ');
     //     
     //     if(isNaN(total_pix) || total_pix == '') {
     //          
     //          total_pix = 0;
     //     }          
     //     
     //     $('.rectDed1').css('width', total_pix.toString() + 'px');
     //     
     //     if(isNaN(total) || total == '') {
     //          
     //          totaltext = '?';
     //     }
     //     else {
     //          
     //          totaltext = total + '/40';
     //     }   
     //     
     //     $('div#rDed1').text(totaltext);       
     //     
     //
     //}
     //

     // submit
     $('#send').submit(function(evt) {
          
          //$('.inner').append(rounds);
          
          evt.preventDefault();  
          
          if(rounds == 1) {
               window.location.href = "4_summary.html" + "?cub=" + cubicle;
          }
          else {                  
               window.location.href = "3_deduction.html" + "?cub=" + cubicle;
          }
           
     });
     
     
     
});