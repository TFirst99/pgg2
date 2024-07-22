var sum;
var own;
var x;


     

function updateContent() {
     
     var height = $('.rect_outside').height();
     
     $.post("php/get.php", { type: "effectiveness", grp: group, pbnr : PbNr }, processAndShow);
     
     function processAndShow(data) {
     
     x = data.split("&&");
     
     sum = x[0].split('$$');
     own = x[1].split('$$');
     
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
     
     
     } 
}



$(document).ready(function() {
     
     $('#send').submit(function(evt) {
          
          evt.preventDefault();          
           window.location.href = "2_contribution.html" + "?cub=" + cubicle;
           
     });
          
});