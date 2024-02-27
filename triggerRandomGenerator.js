var randomTextQueue = [];
var randomTextQueueInd = 0;

$(document).on('keydown', function (e) {
    var tag = e.target.tagName.toLowerCase();
    if (tag != 'input' && tag != 'textarea')
        return;

    if (!e.ctrlKey || !e.altKey || !e.shiftKey)
        return;

    if (e.which != 39 && e.which != 37)//right & left
        return;

    if (e.which == 37 && randomTextQueueInd > 0) {//left
        randomTextQueueInd--;
    }
    if (e.which == 39) {//right
        randomTextQueueInd++;
    }

    if (randomTextQueue.length <= 0 || randomTextQueueInd >= randomTextQueue.length) {       
        getKntr('randomtext/dummy', function(data){
            var msg = data;
            randomTextQueue.push(msg);
            randomTextQueueInd = randomTextQueue.length - 1;

            replaceSelectedText(document.activeElement, randomTextQueue[randomTextQueueInd]);
        });
    }
    else {
        replaceSelectedText(document.activeElement, randomTextQueue[randomTextQueueInd]);
    }

    const event = new Event('input', { bubbles: true });
    document.activeElement.dispatchEvent(event);
});