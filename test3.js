const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const promptMsg = "CUBE> ";
const order = {
  front: "F",
  right: "R",
  up: "U",
  back: "B",
  left: "L",
  down: "D",
  counterFront: "f",
  counterRight: "r'",
  counterUp: "u'",
  counterBack: "b'",
  counterLeft: "l'",
  counterDonw: "d'",
};
const cube = {
  f: [
    ["O", "O", "O"],
    ["O", "O", "O"],
    ["O", "O", "O"],
  ],
  r: [
    ["G", "G", "G"],
    ["G", "G", "G"],
    ["G", "G", "G"],
  ],
  u: [
    ["B", "B", "B"],
    ["B", "B", "B"],
    ["B", "B", "B"],
  ],
  b: [
    ["Y", "Y", "Y"],
    ["Y", "Y", "Y"],
    ["Y", "Y", "Y"],
  ],
  l: [
    ["W", "W", "W"],
    ["W", "W", "W"],
    ["W", "W", "W"],
  ],
  d: [
    ["R", "R", "R"],
    ["R", "R", "R"],
    ["R", "R", "R"],
  ],
};
rl.setPrompt(printSide(cube.u, "") + printCenter(cube.l, cube.f, cube.r, cube.b, "") + printSide(cube.d, "") + promptMsg);
rl.prompt();
rl.on("line", (line) => {});
rl.on("close", () => {
  process.exit();
});

function parse(letters) {
  return letters.replace(/F'/g, "f").replace(/R'/g, "r").replace(/U'/g, "u").replace(/B'/g, "b").replace(/L'/g, "l").replace(/D'/g, "d");
}

function printSide(arr, res) {
  const space = "               ";
  for (let i = 0; i < 3; i++) {
    res += space + arr[i].join(" ") + "\n";
  }
  return res + "\n";
}

function printCenter(arr1, arr2, arr3, arr4, res) {
  const space = "     ";
  for (let i = 0; i < 3; i++) {
    res += arr1[i].join(" ") + space + arr2[i].join(" ") + space + arr3[i].join(" ") + space + arr4[i].join(" ") + "\n";
  }
  return res + "\n";
}
