// On mouseup
document.addEventListener('mouseup', selectionHandlerFunction, false);

// Mouse up event handler function
function selectionHandlerFunction(event) {
    if (event.target && event.target.id == "ticks-convert-div") {
        return;
    }

    if (document.contains(document.getElementById("ticks-convert-snippet"))) {
        document.getElementById("ticks-convert-snippet").remove();
    }

    var text = window.getSelection().toString();
    if (text.length == 0 || text.length > 32) return;

    var wasProcessed = false;
    if (
        (!isNaN(text) && text.length >= 14) // it is a long number ticks maybe
        || /^(((\d{4})-(\d{2})-(\d{2}))|((\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)))((-(\d{2}):(\d{2})|Z)?)$/.test(text) //iso date regex
    ) {
        getKntr('dateticks/' + text, function (responseData) {
            $('#ticks-convert-div').html(responseData);
        });
        wasProcessed = true;
    }

    if (!wasProcessed) return;

    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    // Get cursor position
    const posX = event.clientX + 30;
    const posY = event.clientY - 30 + scrollTop;

    document.body.insertAdjacentHTML('beforeend', '<div id="ticks-convert-snippet" style="position: absolute; top: '
        + posY + 'px; left: ' + posX + 'px;"><div>'
        + '<div id="ticks-convert-div" style="background:#000000; color:#ffffff; padding: 3px;">Convert</div></div></div>');

    //alert(text);
}