$(document).ready(function(){
    $("botton").click(function(){
        $("#elemento1").fadeIn();
    });
});
$(document).ready(function(){
    $("botton").click(function(){
        $("#elemento2").fadeOut();
    });
});
$(document).ready(function(){
    $("#btn1").click(function(){
        $("#box").animate({height:"200px"});
    });
    $("#btn2").click(function(){
        $("#box").animate({height:"100px"});
    });
});