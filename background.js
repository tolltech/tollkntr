function SendMessageToExtension(eventType, payload, callback) {
    chrome.runtime.sendMessage({ type: eventType, payload: payload }, callback);
}

function SendMessageToCurrentActiveTab(eventType, payload, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: eventType, payload: payload }, callback);
    });
}

chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: 'toll_newguid',
        title: 'new guid',
        type: 'normal',
        contexts: ['editable']
      });
  });

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  chrome.contextMenus.onClicked.addListener((item, tab) => {
    SendMessageToCurrentActiveTab(item.menuItemId, uuidv4());
  });