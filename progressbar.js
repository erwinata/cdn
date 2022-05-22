const HOUR_INTERVAL = 4;

function randomSeed(a) {
  var hash = 0;
  for (var i = 0; i < a.length; i++) {
    var char = a.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }

  var t = (hash += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const updateProgress = () => {
  const progressList = document.querySelectorAll("#progressApp");

  for (let i = 0; i < progressList.length; i++) {
    const seed = progressList[i].getAttribute("seed");

    const iso = new Date().toISOString().split("T");
    const date = iso[0];
    const hour = Math.floor(
      (Number(iso[1].substring(0, 2)) + 7) / HOUR_INTERVAL
    );

    const finalSeed = seed + "-" + date + "-" + hour;

    const random = Math.round(randomSeed(finalSeed) * 87) + 2;
    let color = "#43aa8b";
    if (random <= 30) color = "#f94144";
    else if (random <= 70) color = "#f9c74f";

    progressList[i].querySelector(".progress").style =
      "width: " + random + "%; background: " + color;
    progressList[i].querySelector(".progressText").innerHTML =
      random + "%";
  }
};

setTimeout(() => {
  updateProgress();
}, 1);

setInterval(() => {
  updateProgress();
}, HOUR_INTERVAL * 3600 * 1000);
