// On mouseup
document.addEventListener('mouseup', selectionHandlerFunction, false);

// Mouse up event handler function
function selectionHandlerFunction(event) {

    if (document.contains(document.getElementById("ticks-convert-snippet"))) {
        document.getElementById("ticks-convert-snippet").remove();
    }

    var text = window.getSelection().toString();
    if (text.length == 0) return;

    //todo: validate long or datetime


    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        
    // Get cursor position
    const posX = event.clientX + 30;
    const posY = event.clientY - 30 + scrollTop;

    document.body.insertAdjacentHTML('beforeend', '<div id="ticks-convert-snippet" style="position: absolute; top: '
    +posY+'px; left: '+posX+'px;"><div>'
    +'<div style="background:#ffffff; color:#000000; padding: 3px;">Convert</div></div></div>');

    //alert(text);
}