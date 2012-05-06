var curHidden = []
var selectedId = null;

chrome.extension.onRequest.addListener(
  function(req, sender, sendResponse) {
    console.log(req);
    if(req.type === 'add') {
      addAddress(req.url);
      sendResponse({status: 204})
    } 
    else if(req.type == 'remove') {
      removeAddress(req.url);
      sendResponse({status: 204})
    }
    else if(req.type === 'list') {
      sendResponse({status: 200, res: getHidden()})
    }
    else if(req.type === 'hidden') {
      curHidden = req.res;
    }
});

function getHidden() {
  console.log(localStorage["addressesToHide"])
  var storage = localStorage["addressesToHide"];
  if(storage == undefined) {
    localStorage['addressesToHide'] = JSON.stringify([])
  }
  return JSON.parse(localStorage['addressesToHide']);
}

function addAddress(url) {
  var cur = getHidden();
  cur.push(url)
  localStorage["addressesToHide"] = JSON.stringify(cur);
}

function removeAddress(url) {
  var cur = getHidden();
  cur.remove(url)
  localStorage["addressesToHide"] = JSON.stringify(cur);
}

function updateAddress(tabId) {
  chrome.tabs.sendRequest(tabId, {}, function(res) {
    console.log(res)
    if(res) {
      chrome.pageAction.show(tabId);
    }
  });
}


chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    updateAddress(tabId);
  }
});

// Ensure the current selected tab is set up.
chrome.tabs.getSelected(null, function(tab) {
  updateAddress(tab.id);
});
