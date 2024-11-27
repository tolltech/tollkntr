AddEventListener('replace_text_id', function (payload) {
    replaceSelectedText(document.activeElement, payload);
});

function replaceSelectedText(elem, text) {
    var start = elem.selectionStart;
    var end = elem.selectionEnd;
    elem.value = elem.value.slice(0, start) + text + elem.value.substr(end);
    elem.selectionStart = start;
    elem.selectionEnd = elem.selectionStart + text.length;
    elem.dispatchEvent(new Event('input'));
    ["input", "click", "change", "blur"].forEach((event) => {
        const changeEvent = new Event(event, { bubbles: true, cancelable: true });
        elem.dispatchEvent(changeEvent);
    });
}