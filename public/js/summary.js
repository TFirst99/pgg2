var con;


function updateContent() {
     
     // check and update input
     
     var width = $('.rect_outsideCon').width();
              
     $.post("/api/earnings", { type: "contribution", grp : group, pbnr : PbNr, multiplier : multiplier }, processAndShow);
      
     function processAndShow(data) {
      
          x = data.split("&&");
          contr = x[0].split('$$');
          ded = x[1].split('$$');
          
          total_contr = 0;
          $.each(contr,function() {
              total_contr += parseInt(this);
          });
          
          output = total_contr * multiplier;
          output_per_player = output / player;
          
          
          
          
          ////$('.inner').append(total_contr);
          ////$('.inner').append('  --  ');
          ////$('.inner').append(contr);
          ////$('.inner').append('  .  ');
          ////$('.inner').append(multiplier);
          ////$('.inner').append('  .  ');
          ////$('.inner').append(output);
          ////$('.inner').append('  .  ');
          ////$('.inner').append(output_per_player);
          
          
          e1 = Math.round(    ((20 - parseInt(contr[0])) + (parseFloat(output_per_player) - parseFloat(ded[0])))*10)/10;
          e2 = Math.round(    ((20 - parseInt(contr[1])) + (parseFloat(output_per_player) - parseFloat(ded[1])))*10)/10;
          e3 = Math.round(    ((20 - parseInt(contr[2])) + (parseFloat(output_per_player) - parseFloat(ded[2])))*10)/10;
          e4 = Math.round(    ((20 - parseInt(contr[3])) + (parseFloat(output_per_player) - parseFloat(ded[3])))*10)/10;
          e5 = Math.round(    ((20 - parseInt(contr[4])) + (parseFloat(output_per_player) - parseFloat(ded[4])))*10)/10;
          
          
          $('span#ea1').text(e1 + ' MUs');
          $('span#ea2').text(e2 + ' MUs');
          $('span#ea3').text(e3 + ' MUs');
          $('span#ea4').text(e4 + ' MUs');
          $('span#ea5').text(e5 + ' MUs');   
          
          
          output_rect_pix = output / (player * MUs * multiplier) * width;
          $('.rectContr1').css('width', output_rect_pix.toString() + 'px');
          $('div#rC1').text(Math.round(output*10)/10 + ' / ' + (player * MUs * multiplier));       

          
          
          
          //$('.inner').append(data);
          //////$('.inner').append(ded);
      
          
     }
      
}


$(document).ready(function() {
     
     updateContent();

     // submit
     $('#send').submit(function(evt) {
          
          evt.preventDefault();
          
          //$('.inner').append(group);
          //$('.inner').append(PbNr);
          
          $.post("/api/js_round", { grp: group, pbnr : PbNr }, round);
          
          function round(data) {
               
               rounds = parseInt(data);
               //$('.inner').append(group);
               //$('.inner').append(PbNr);
               //$('.inner').append(data);
                              
               if(rounds >= max_rounds) {   window.location.href = "5_fin.html" + "?cub=" + cubicle;                    }
               else if(rounds == 1) {            window.location.href = "instructions/second.php" + "?cub=" + cubicle;      }
               else if(rounds == 2) {            window.location.href = "instructions/third_ex.php" + "?cub=" + cubicle;    }
               else {   window.location.href = "5_next_period.html" + "?cub=" + cubicle;  }
               
          }
           
     });
     
     
     
});