var NewGuidId = "NewGuidId";
var NewIpInn = "NewIpInn";
var NewUlInn = "NewUlInn";
var NewHeadKpp = "NewHeadKpp";
var NewRandomWord = "NewRandomWord";
var ReplaceTextEventId = "replace_text_id";
var NewRandomWordEventId = "random_word_id";

var testMode = testMode || false;
var notCreateMenu = notCreateMenu || false;


function SendMessageToExtension(eventType, payload, callback) {
    if (!testMode) {
        chrome.runtime.sendMessage({ type: eventType, payload: payload }, callback);
    }
}

function SendMessageToCurrentActiveTab(eventType, payload, callback) {
    if (!testMode) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: eventType, payload: payload }, callback);
        });
    }
}

function AddEventListener(eventType, action) {
    if (!testMode) {
        chrome.runtime.onMessage.addListener(
            function (request, sender, sendResponse) {
                if (!request.type || request.type != eventType) {
                    return;
                }

                action(request.payload);
            });
    }
}

if (!testMode && !notCreateMenu) {

    chrome.runtime.onInstalled.addListener(async () => {
        chrome.contextMenus.create({
            id: 'toll_parent',
            title: 'TollKntr',
            type: 'normal',
            contexts: ['editable']
        });

        chrome.contextMenus.create({
            id: NewGuidId,
            title: 'new guid',
            type: 'normal',
            contexts: ['editable'],
            parentId: "toll_parent"
        });

        chrome.contextMenus.create({
            id: NewIpInn,
            title: 'new ip inn',
            type: 'normal',
            contexts: ['editable'],
            parentId: "toll_parent"
        });

        chrome.contextMenus.create({
            id: NewUlInn,
            title: 'new ul inn',
            type: 'normal',
            contexts: ['editable'],
            parentId: "toll_parent"
        });

        chrome.contextMenus.create({
            id: NewHeadKpp,
            title: 'new kpp',
            type: 'normal',
            contexts: ['editable'],
            parentId: "toll_parent"
        });

        chrome.contextMenus.create({
            id: NewRandomWord,
            title: 'new random word',
            type: 'normal',
            contexts: ['editable'],
            parentId: "toll_parent"
        });
    });
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomIntWithMin(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

function getDigitString(length) {
    var result = "";
    for (var i = 0; i < length; i++) {
        result += getRandomInt(9);
    }

    return result;
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function getULInn() {
    var randomString = pad(getRandomIntWithMin(1, 100), 2) + getDigitString(7);
    var mult = [2, 4, 10, 3, 5, 9, 4, 6, 8];

    var acc = [];
    for (var i = 0; i < mult.length; i++) {
        acc.push(parseInt(randomString.substring(i, i + 1)) * mult[i]);
    }
    var sum = acc.reduce((a, b) => a + b, 0);

    return randomString + ((sum - Math.floor(sum / 11) * 11 != 10 ? sum - Math.floor(sum / 11) * 11 : 0));
}

function getIPInn() {
    var inn = pad(getRandomIntWithMin(1, 100), 2) + getDigitString(8);
    var multipliers1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
    var multipliers2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6];
    var checkSum1 = 0, checkSum2 = 0;
    for (var i = 0; i < multipliers1.length; i++) {
        checkSum1 += parseInt(inn[i]) * multipliers1[i];
        checkSum2 += parseInt(inn[i]) * multipliers2[i];
    }

    checkSum1 = (checkSum1 % 11) % 10;
    checkSum2 += checkSum1 * 8;
    checkSum2 = (checkSum2 % 11) % 10;
    return inn + checkSum1 + checkSum2;
}

function getHeadKpp() {
    while (true) {
        var kpp = getDigitString(4);
        if (kpp.substring(0, 2) == '00') {
            continue;
        }

        return kpp + "01" + getDigitString(3);
    }
}

function dateTimeToTicks(dateTime) {
    var dateLocal = new Date(Date.parse(dateTime));
    var ticks = ((new Date(Date.UTC(
        dateLocal.getFullYear(),
        dateLocal.getMonth(),
        dateLocal.getDate(),
        dateLocal.getHours(),
        dateLocal.getMinutes(),
        dateLocal.getSeconds(),
        dateLocal.getMilliseconds()
    )).getTime() * 10000) + 621355968000000000);
    return ticks;
}

function ticksToDateTime(ticks) {
    if (ticks < 621355968000000000) {
        throw new Error("Can't convert " + ticks + " because it is less then 621355968000000000!");
    }
    return new Date((ticks - 621355968000000000) / 10000).toISOString();
}

if (!testMode && !notCreateMenu) {
    chrome.contextMenus.onClicked.addListener((item, tab) => {
        switch (item.menuItemId) {
            case NewGuidId: SendMessageToCurrentActiveTab(ReplaceTextEventId, uuidv4()); break;
            case NewIpInn: SendMessageToCurrentActiveTab(ReplaceTextEventId, getIPInn()); break;
            case NewUlInn: SendMessageToCurrentActiveTab(ReplaceTextEventId, getULInn()); break;
            case NewHeadKpp: SendMessageToCurrentActiveTab(ReplaceTextEventId, getHeadKpp()); break;
            case NewRandomWord: SendMessageToCurrentActiveTab(NewRandomWordEventId); break;
        }
    });
}

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
            console.log('POST failed.\r\n'
                + JSON.stringify(responseData) + '\r\n'
                + JSON.stringify(textStatus) + '\r\n'
                + JSON.stringify(errorThrown) + '\r\n'
            );
        }
    });
}