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
  up: "u",
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
      [cube.f, cube.r, cube.b, cube.l] = turnToDirection(cube.f, cube.r, cube.b, cube.l, letter, "left");
    }
    if (letter === rightOrder.down || letter === countOrder.up) {
      [cube.f, cube.r, cube.b, cube.l] = turnToDirection(cube.f, cube.r, cube.b, cube.l, letter, "right");
    }
    console.log(letter + "\n" + printSide(cube.u, "") + printCenter(cube.l, cube.f, cube.r, cube.b, "") + printSide(cube.d, ""));
  }
});
rl.on("close", () => {
  process.exit();
});

function turnToDirection(front, right, back, left, letter, direction) {
  const row = letter === rightOrder.up || letter === countOrder.up ? 0 : 2;
  if (direction === "left") {
    const temp = left[row];
    left[row] = front[row];
    front[row] = right[row];
    right[row] = back[row];
    back[row] = temp;
  }
  if (direction === "right") {
    const temp = right[row];
    right[row] = front[row];
    front[row] = left[row];
    left[row] = back[row];
    back[row] = temp;
  }
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
