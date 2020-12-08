const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const promptMsg = "CUBE> ";
const rightOrder = {
  front: "F",
  right: "R",
  up: "U",
  back: "B",
  left: "L",
  down: "D",
};
const countOrder = {
  front: "f",
  right: "r",
  up: "u'",
  back: "b",
  left: "l",
  down: "d",
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
rl.on("line", (line) => {
  line = parse(line);
  for (let i = 0; i < line.length; i++) {
    const letter = line[i] === "2" ? line[i - 1] : line[i];
    if (letter === rightOrder.up || letter === countOrder.down) {
      console.log(letter);
      [cube.f, cube.r, cube.b, cube.l] = turnToRightDirection(cube.f, cube.r, cube.b, cube.l, letter);
    }
    console.log(letter + "\n" + printSide(cube.u, "") + printCenter(cube.l, cube.f, cube.r, cube.b, "") + printSide(cube.d, ""));
  }
});
rl.on("close", () => {
  process.exit();
});

function turnToRightDirection(front, right, back, left, letter) {
  const row = letter === rightOrder.up ? 0 : 2;
  const total = [...front[row], ...right[row], ...back[row], ...left[row]];
  const temp = total[0];
  for (let i = 1; i < total.length; i++) {
    total[i - 1] = total[i];
  }
  total[total.length - 1] = temp;
  front[row] = total.slice(0, 3);
  right[row] = total.slice(3, 6);
  back[row] = total.slice(6, 9);
  left[row] = total.slice(9, total.length);
  return [front, right, back, left];
}

function parse(line) {
  return line.replace(/F'/g, "f").replace(/R'/g, "r").replace(/U'/g, "u").replace(/B'/g, "b").replace(/L'/g, "l").replace(/D'/g, "d");
}

function printSide(arr, str) {
  const space = "               ";
  for (let i = 0; i < 3; i++) {
    str += space + arr[i].join(" ") + "\n";
  }
  return str + "\n";
}

function printCenter(arr1, arr2, arr3, arr4, str) {
  const space = "     ";
  for (let i = 0; i < 3; i++) {
    str += arr1[i].join(" ") + space + arr2[i].join(" ") + space + arr3[i].join(" ") + space + arr4[i].join(" ") + "\n";
  }
  return str + "\n";
}
