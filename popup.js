function fillItems() {
  var hiddenItems = chrome.extension.getBackgroundPage().curHidden;
  console.log("Hidden items are: ")
  console.log(hiddenItems);
  $.each(hiddenItems, function(idx, val) {
    $('#hidden').append(val);
  })
}

window.onload = fillItems();

$("#hidden").on('click', function(evt) {
  fillItems();
})