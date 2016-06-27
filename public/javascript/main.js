function sanitize(aStr){
  var sanitizedTxt = $('<div>').text(aStr).html();
  return sanitizedTxt;
}

function pl(msg) {
    console.log('DEBUG->' + msg);
};

function obj(objToPrint) {
    console.log(objToPrint);
};

$(document).ready(function() {
  
  function sendGet(){
    var getDest = "/speaker/" + $(this).val();
    if($(this).attr("on") === "yes"){
      getDest += "/off";
      $(this).attr("on", "no");
      $(this).text("On");
    }else{
      getDest += "/on";
      $(this).attr("on", "yes");
      $(this).text("Off");
    }
    $.get(getDest);
  }
  
  $('.speaker-button').click(sendGet);
  
});