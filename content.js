const blacklist = [];

document.body.onload = function () {
  chrome.storage.sync.get(["data"], function (result) {
    if (result && result.data && result.data.length > 0) {
      const data = result.data
        .replaceAll(" ", "")
        .split(",")
        .filter((f) => f);

      blacklist.push(...data);

      setInterval(removeDiv, 2000);
    }
  });
};

function removeDiv() {
  const timeline = document.querySelector("section > .css-1dbjc4n");

  if (timeline) {
    const posts = timeline.firstChild.children;

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const words = [];

      post.querySelectorAll("span").forEach((s) => {
        const tmp = s.innerText.split(" ");
        words.push(...tmp);
      });

      if (words.some((e) => blacklist.includes(e.toLowerCase()))) {
        console.log("div removida");
        post.style = "display: none;";
      }
    }
  }
}
