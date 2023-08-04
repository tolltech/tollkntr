$(document).ready(function () {
    $('#ticks_input').change(function (evt) {
        var v = $('#ticks_input').val();
        if (isNaN(v)){
            $('#ticks_label').html(dateTimeToTicks(v));
        }
        else{
            $('#ticks_label').html(ticksToDateTime(v));
        }
    });
});