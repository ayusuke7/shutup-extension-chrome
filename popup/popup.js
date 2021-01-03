const button = document.getElementById("btnSave");

document.body.onload = function () {
  chrome.storage.sync.get(["data"], function (result) {
    if (result && result.data) {
      textArea.value = result.data;
    }
  });
};

button.addEventListener("click", function () {
  const textArea = document.getElementById("textArea");
  const value = textArea.value;

  if (value) {
    chrome.storage.sync.set({ data: value }, function () {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
  }

  window.close();
});
