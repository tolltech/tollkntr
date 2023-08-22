$(document).ready(function () {    
    $('#ticks_input').change(function (evt) {
        var v = $('#ticks_input').val();

        getKntr('dateticks/' + v, function(responseData){
            $('#ticks_label').html(responseData); 
        });       
    });
});