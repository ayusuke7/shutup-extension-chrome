const blacklist = [];
let interval = null;

document.body.onload = function () {
  chrome.storage.sync.get(["data"], function (result) {
    if (result && result.data && result.data.length > 0) {
      const data = result.data
        .replaceAll(" ", "")
        .split(",")
        .filter((f) => f);

      blacklist.push(...data);

      interval = setInterval(removeDiv, 2000);
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

      if (post.style.display !== "none") {
        post.querySelectorAll("span").forEach((s) => {
          const tmp = s.innerText.split(" ");
          words.push(...tmp);
        });

        const includes = words.filter((e) =>
          blacklist.includes(e.toLowerCase())
        );

        if (includes.length > 0) {
          console.log("div removida por =>", includes);
          post.style.display = "none";
        }
      }
    }
  }
}
