var hiddenOnPage = []
var listToHide = [];

if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    console.log(req);
    sendResponse(findAndHide());
  });
}

$('.iconArea').each(function() {
  // console.log(this);
  $(this).append('<a style="float: right;" class="opsHideBtn" alt="Hide Item">X</a>');
})

$('.iconArea').on('click', '.opsHideBtn', function(evt) {
  evt.preventDefault();
  saveAndHideItem(this)
  return false;
})

var hideItemSect = function(item) {
  var hide = $(item).parents('.rsrWSSect')
  console.log(hide)
  if(hide.get(0) != undefined) {
    hiddenOnPage.push(hide.get(0));
    hide.hide();
  }
}

var saveAndHideItem = function(item) {
  var x = $(item).siblings('a')
  hideItemSect(x)
  chrome.extension.sendRequest({type: 'add', url: x.attr('href')}, function(resp) {
    console.log(resp.status);
  });
}

var findAndHide = function() {
  chrome.extension.sendRequest({type: 'list'}, function(resp) {
    console.log(resp);
    $.each(resp.res, function(idx, val) {
      hideItemSect($('a[href="'+val+'"]').first())
    })
  })
  console.log(hiddenOnPage)
  return {type: 'hidden', res:hiddenOnPage}
}
