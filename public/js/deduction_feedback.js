var con;
var round_selected;


function updateContent() {

     // rounds

      $.post("php/js_round.php", { grp: group, pbnr : PbNr }, append_round);

      function append_round(data) {


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

           round_selected = getQueryVariable('period');


           rounds = parseInt(data);
           if(round_selected == '') {  round_selected = rounds;    }

           //$('#period').append(data); 
           
           $('#period').html('&nbsp;');

           $('#period').append('period:');

           for (var i=1;i<=rounds;i++) {

                if(round_selected == i) {   $('#period').append("&nbsp;&nbsp;&nbsp;<a href=\"3_deduction_feedback.html" + "?cub=" + cubicle + "&period=" + i + "\"><b><i>" + i + "</i></b></a>");      }
                else {                      $('#period').append("&nbsp;&nbsp;&nbsp;<a href=\"3_deduction_feedback.html" + "?cub=" + cubicle + "&period=" + i + "\">" + i + "</a>");          }

           }
      
          //$('#period').replaceWith('&nbsp;');
      
      
      
      // effectiveness

       var ef1 = 0.0;
       var ef2 = 1.0;
       var ef3 = 1.0;
       var ef4 = 1.0;
       var ef5 = 1.0;

       $.post("php/get.php", { type: "effectiveness", grp: group, pbnr : PbNr, round : round_selected  }, processAndShowCosts, 'text');

       function processAndShowCosts(data) {

            ////$('.inner').append('xxx');

            x = data.split("&&");

            sum = x[0].split('$$');
            //own = x[1].split('$$');   

            ef1 = parseFloat(sum[0]);
            ef2 = parseFloat(sum[1]);
            ef3 = parseFloat(sum[2]);
            ef4 = parseFloat(sum[3]);
            ef5 = parseFloat(sum[4]);
            
            
            if(isNaN(ef1)) {       ef1 = 1.0;     }
            if(isNaN(ef2)) {       ef2 = 1.0;     }
            if(isNaN(ef3)) {       ef3 = 1.0;     }
            if(isNaN(ef4)) {       ef4 = 1.0;     }
            if(isNaN(ef5)) {       ef5 = 1.0;     }


            $('#e1').html('(' + ef1.toFixed(1) + ')');
            $('#e2').html('(' + ef2.toFixed(1) + ')');
            $('#e3').html('(' + ef3.toFixed(1) + ')');
            $('#e4').html('(' + ef4.toFixed(1) + ')');
            $('#e5').html('(' + ef5.toFixed(1) + ')');



            $.post("php/get.php", { type: "deduction", grp: group, pbnr : PbNr, round : round_selected }, processAndShowDP); 

            function processAndShowDP(data) { 

                 //////$('.inner').append('  ');
                 //////$('.inner').append(data);

                 y = data.split("&&");

                 ded1 = y[0].split("$$");
                 ded2 = y[1].split("$$");
                 ded3 = y[2].split("$$");
                 ded4 = y[3].split("$$");
                 ded5 = y[4].split("$$");

                 //////$('.inner').append(ded5);


                 $('div#rD11').text(ded1[0]);
                 $('div#rD12').text(ded1[1]);
                 $('div#rD13').text(ded1[2]);
                 $('div#rD14').text(ded1[3]);
                 $('div#rD15').text(ded1[4]);

                 $('div#rD21').text(ded2[0]);
                 $('div#rD22').text(ded2[1]);
                 $('div#rD23').text(ded2[2]);
                 $('div#rD24').text(ded2[3]);
                 $('div#rD25').text(ded2[4]);

                 $('div#rD31').text(ded3[0]);
                 $('div#rD32').text(ded3[1]);
                 $('div#rD33').text(ded3[2]);
                 $('div#rD34').text(ded3[3]);
                 $('div#rD35').text(ded3[4]);     

                 $('div#rD41').text(ded4[0]);
                 $('div#rD42').text(ded4[1]);
                 $('div#rD43').text(ded4[2]);
                 $('div#rD44').text(ded4[3]);
                 $('div#rD45').text(ded4[4]);   

                 $('div#rD51').text(ded5[0]);
                 $('div#rD52').text(ded5[1]);
                 $('div#rD53').text(ded5[2]);
                 $('div#rD54').text(ded5[3]);
                 $('div#rD55').text(ded5[4]);     



                 rect_pix1 = (ded1[0] / maxDPs * 100) * width/100;
                 rect_pix2 = (ded1[1] / maxDPs * 100) * width/100;
                 rect_pix3 = (ded1[2] / maxDPs * 100) * width/100;
                 rect_pix4 = (ded1[3] / maxDPs * 100) * width/100;
                 rect_pix5 = (ded1[4] / maxDPs * 100) * width/100;
                 $('.rC11').css('width', rect_pix1.toString() + 'px');       
                 $('.rC12').css('width', rect_pix2.toString() + 'px');  
                 $('.rC13').css('width', rect_pix3.toString() + 'px');  
                 $('.rC14').css('width', rect_pix4.toString() + 'px');  
                 $('.rC15').css('width', rect_pix5.toString() + 'px'); 

                 rect_pix1 = (ded2[0] / maxDPs * 100) * width/100;
                 rect_pix2 = (ded2[1] / maxDPs * 100) * width/100;
                 rect_pix3 = (ded2[2] / maxDPs * 100) * width/100;
                 rect_pix4 = (ded2[3] / maxDPs * 100) * width/100;
                 rect_pix5 = (ded2[4] / maxDPs * 100) * width/100;
                 $('.rC21').css('width', rect_pix1.toString() + 'px');       
                 $('.rC22').css('width', rect_pix2.toString() + 'px');  
                 $('.rC23').css('width', rect_pix3.toString() + 'px');  
                 $('.rC24').css('width', rect_pix4.toString() + 'px');  
                 $('.rC25').css('width', rect_pix5.toString() + 'px');      

                 rect_pix1 = (ded3[0] / maxDPs * 100) * width/100;
                 rect_pix2 = (ded3[1] / maxDPs * 100) * width/100;
                 rect_pix3 = (ded3[2] / maxDPs * 100) * width/100;
                 rect_pix4 = (ded3[3] / maxDPs * 100) * width/100;
                 rect_pix5 = (ded3[4] / maxDPs * 100) * width/100;
                 $('.rC31').css('width', rect_pix1.toString() + 'px');       
                 $('.rC32').css('width', rect_pix2.toString() + 'px');  
                 $('.rC33').css('width', rect_pix3.toString() + 'px');  
                 $('.rC34').css('width', rect_pix4.toString() + 'px');  
                 $('.rC35').css('width', rect_pix5.toString() + 'px');      

                 rect_pix1 = (ded4[0] / maxDPs * 100) * width/100;
                 rect_pix2 = (ded4[1] / maxDPs * 100) * width/100;
                 rect_pix3 = (ded4[2] / maxDPs * 100) * width/100;
                 rect_pix4 = (ded4[3] / maxDPs * 100) * width/100;
                 rect_pix5 = (ded4[4] / maxDPs * 100) * width/100;
                 $('.rC41').css('width', rect_pix1.toString() + 'px');       
                 $('.rC42').css('width', rect_pix2.toString() + 'px');  
                 $('.rC43').css('width', rect_pix3.toString() + 'px');  
                 $('.rC44').css('width', rect_pix4.toString() + 'px');  
                 $('.rC45').css('width', rect_pix5.toString() + 'px');         

                 rect_pix1 = (ded5[0] / maxDPs * 100) * width/100;
                 rect_pix2 = (ded5[1] / maxDPs * 100) * width/100;
                 rect_pix3 = (ded5[2] / maxDPs * 100) * width/100;
                 rect_pix4 = (ded5[3] / maxDPs * 100) * width/100;
                 rect_pix5 = (ded5[4] / maxDPs * 100) * width/100;
                 $('.rC51').css('width', rect_pix1.toString() + 'px');       
                 $('.rC52').css('width', rect_pix2.toString() + 'px');  
                 $('.rC53').css('width', rect_pix3.toString() + 'px');  
                 $('.rC54').css('width', rect_pix4.toString() + 'px');  
                 $('.rC55').css('width', rect_pix5.toString() + 'px');  



                 c1 = Math.round(ded1[0] * ef1*10)/10;
                 c2 = Math.round(ded1[1] * ef1*10)/10;
                 c3 = Math.round(ded1[2] * ef1*10)/10;
                 c4 = Math.round(ded1[3] * ef1*10)/10;
                 c5 = Math.round(ded1[4] * ef1*10)/10;

                 $('#c11').html('(-' + c1 + ')');
                 $('#c12').html('(-' + c2 + ')');
                 $('#c13').html('(-' + c3 + ')');
                 $('#c14').html('(-' + c4 + ')');
                 $('#c15').html('(-' + c5 + ')');                               

                 c1 = Math.round(ded2[0] * ef2*10)/10;
                 c2 = Math.round(ded2[1] * ef2*10)/10;
                 c3 = Math.round(ded2[2] * ef2*10)/10;
                 c4 = Math.round(ded2[3] * ef2*10)/10;
                 c5 = Math.round(ded2[4] * ef2*10)/10;

                 $('#c21').html('(-' + c1 + ')');
                 $('#c22').html('(-' + c2 + ')');
                 $('#c23').html('(-' + c3 + ')');
                 $('#c24').html('(-' + c4 + ')');
                 $('#c25').html('(-' + c5 + ')');          

                 c1 = Math.round(ded3[0] * ef3*10)/10;
                 c2 = Math.round(ded3[1] * ef3*10)/10;
                 c3 = Math.round(ded3[2] * ef3*10)/10;
                 c4 = Math.round(ded3[3] * ef3*10)/10;
                 c5 = Math.round(ded3[4] * ef3*10)/10;

                 $('#c31').html('(-' + c1 + ')');
                 $('#c32').html('(-' + c2 + ')');
                 $('#c33').html('(-' + c3 + ')');
                 $('#c34').html('(-' + c4 + ')');
                 $('#c35').html('(-' + c5 + ')');          

                 c1 = Math.round(ded4[0] * ef4*10)/10;
                 c2 = Math.round(ded4[1] * ef4*10)/10;
                 c3 = Math.round(ded4[2] * ef4*10)/10;
                 c4 = Math.round(ded4[3] * ef4*10)/10;
                 c5 = Math.round(ded4[4] * ef4*10)/10;

                 $('#c41').html('(-' + c1 + ')');
                 $('#c42').html('(-' + c2 + ')');
                 $('#c43').html('(-' + c3 + ')');
                 $('#c44').html('(-' + c4 + ')');
                 $('#c45').html('(-' + c5 + ')');    

                 c1 = Math.round(ded5[0] * ef5*10)/10;
                 c2 = Math.round(ded5[1] * ef5*10)/10;
                 c3 = Math.round(ded5[2] * ef5*10)/10;
                 c4 = Math.round(ded5[3] * ef5*10)/10;
                 c5 = Math.round(ded5[4] * ef5*10)/10;

                 $('#c51').html('(-' + c1 + ')');
                 $('#c52').html('(-' + c2 + ')');
                 $('#c53').html('(-' + c3 + ')');
                 $('#c54').html('(-' + c4 + ')');
                 $('#c55').html('(-' + c5 + ')');      

                  //////$('.inner').append(p5);





                 var total = 0;
                 $.each(ded1,function() {
                     total += parseInt(this);
                 });

                 $('.rectDed1').css('width', ((total / (maxDPs*(player-1)) * 100) * width/100).toString() + 'px');
                 $('div#rDed1').text(total + '/40');       


                 var total = 0;
                 $.each(ded2,function() {
                     total += parseInt(this);
                 });

                 $('.rectDed2').css('width', ((total / (maxDPs*(player-1)) * 100) * width/100).toString() + 'px');
                 $('div#rDed2').text(total + '/40');


                 var total = 0;
                 $.each(ded3,function() {
                     total += parseInt(this);
                 });

                 $('.rectDed3').css('width', ((total / (maxDPs*(player-1)) * 100) * width/100).toString() + 'px');
                 $('div#rDed3').text(total + '/40');


                 var total = 0;
                 $.each(ded4,function() {
                     total += parseInt(this);
                 });

                 $('.rectDed4').css('width', ((total / (maxDPs*(player-1)) * 100) * width/100).toString() + 'px');
                 $('div#rDed4').text(total + '/40');


                 var total = 0;
                 $.each(ded5,function() {
                     total += parseInt(this);
                 });

                 $('.rectDed5').css('width', ((total / (maxDPs*(player-1)) * 100) * width/100).toString() + 'px');
                 $('div#rDed5').text(total + '/40');


                 //sum = ded1.reduce(function(pv, cv) { return pv + cv; }, 0);

                 //////$('.inner').append(total);  

                 //$('.rectDed1').css('width', sum.toString() + 'px');
                 //$('div#rDed1').text(sum);          


            }



       } 


       // contributions

       var width = $('.rect_outsideCon').width();

       $.post("php/get.php", { type: "contribution", grp: group, pbnr : PbNr, round : round_selected   }, processAndShow);

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

            xxx = parseInt(p5) + '/' + MUs;
            

            $('div#rC1').text(p1.replace(/ /g,'') + '/' + MUs);
            $('div#rC2').text(p2.replace(/ /g,'') + '/' + MUs);
            $('div#rC3').text(p3.replace(/ /g,'') + '/' + MUs);
            $('div#rC4').text(p4.replace(/ /g,'') + '/' + MUs);
            $('div#rC5').text(xxx.replace(/ /g,''));

            //////$('.inner').append('xxx');
            //////$('.inner').append(p1);

            //////$('.inner').append(x);


       }

      
      
      }
      
      
      if(round_selected == 1) {
           
           $('div#content table tr:eq(2)').remove();
           $('div#content table tr:eq(2)').remove();
           $('div#content table tr:eq(2)').remove();
           $('div#content table tr:eq(2)').remove();
           $('div#content table tr:eq(2)').remove();
           $('div#content table tr:eq(2)').remove();
              
           
      }

      
 }



$(document).ready(function() {

     // submit
     $('#send').submit(function(evt) {
          
          evt.preventDefault();          
          window.location.href = "4_summary.html" + "?cub=" + cubicle;
           
     });
        
});