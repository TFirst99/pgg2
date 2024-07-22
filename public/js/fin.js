

$(document).ready(function() {
     
     //$('.inner').append('y');
     
     $("#container").fadeTo(750,1);
     

     // submit
     $('#send').submit(function(evt) {
          
          
          evt.preventDefault();
          
          $.post('php/fin.php', { group : group, pbnr : PbNr, }, redirect, 'text');
          
          function redirect(data) {

               x = data.split("&&");
               
               //$('.inner').append(x);
               
                ////$('.inner').append(x[2].replace(/ /g,''));
               
               received = x[0].replace(/ /g,'');
               transferred = x[1].replace(/ /g,'');
               payoff = x[2].replace(/ /g,'');
               payoff = Math.round(payoff * 100);
               
               date = x[3].replace(/ /g,'');
               
               //$('.inner').append(payoff);
          
                ////$('.inner').append('1');
               //window.location.href = "http://www.licht-malerei.de/cgi-bin/questionnaires/HCE/questionnaire.cgi?" + "?cub=" + cubicle;
               
               
               //add DATE!!!
               window.location.href = "http://www.licht-malerei.de/cgi-bin/questionnaires/HCE/questionnaire.cgi?" + "p=1" + "&pb=" + PbNr.toString() + "&pg=" + transferred.toString() + "&pd=" + payoff.toString() + "&pr=" + received.toString() + "&gp=" + group.toString() + "&dt=" + date.toString();
               
                //$('.inner').append('1');
               
               //browser = webbrowser.open("http://www.licht-malerei.de/cgi-bin/questionnaires/HCE/questionnaire.cgi?" + "p=" + str(1) + "&pb=" + str(plNr) + "&pg=" + str(shift_to) + "&pd=" + str(int(payoff*100)) + "&pr=" + str(shift_rec) + "&gp=" + str(group) + "&dt=" + str(date3))
               
               }
           
     });
     
     
     
});