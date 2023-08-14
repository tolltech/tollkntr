$(document).ready(function () {    
    $('#ticks_input').change(function (evt) {
        var v = $('#ticks_input').val();

        getKntr('dateticks/' + v, function(responseData, textStatus, jqXHR){
            $('#ticks_label').html(responseData); 
        });       
    });
});

const domainHost = "https://tolltech.ru";
function getKntr(url, callback){
    $.ajax({
        type: 'GET',
        url: domainHost + '/kntr/' + url,
        contentType: 'application/json; charset=utf-8',
        crossDomain: true,
        // data: JSON.stringify({ Text: JSON.stringify(tracks) }),
        // dataType: 'json',
        cache: false,
        success: callback,
        complete: function (responseData, textStatus, jqXHR) {
            //alert('complete');
        },
        error: function (responseData, textStatus, errorThrown) {
            // alert('error');
            alert('POST failed.\r\n'
                + JSON.stringify(responseData) + '\r\n'
                + JSON.stringify(textStatus) + '\r\n'
                + JSON.stringify(errorThrown) + '\r\n'
            );
        }
    });
}