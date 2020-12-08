const { dir } = require("console");

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
      [cube.f, cube.r, cube.b, cube.l] = turnToLeftDirection(cube.f, cube.r, cube.b, cube.l, letter);
    }
    if (letter === rightOrder.down || letter === countOrder.up) {
      [cube.f, cube.r, cube.b, cube.l] = turnToRightDirection(cube.f, cube.r, cube.b, cube.l, letter);
    }
    if (letter === rightOrder.left || letter === countOrder.right) {
      [cube.f, cube.u, cube.b, cube.d] = turnToDownDirection(cube.f, cube.u, cube.b, cube.d, letter);
    }
    if (letter === rightOrder.right || letter === countOrder.left) {
      [cube.f, cube.d, cube.b, cube.u] = turnToUpDirection(cube.f, cube.d, cube.b, cube.u, letter);
    }
    if (letter === rightOrder.front || letter === countOrder.back) {
      [cube.u, cube.r, cube.d, cube.l] = turnToClockwise(cube.u, cube.r, cube.d, cube.l, letter);
    }
    if (letter === rightOrder.back || letter === countOrder.front) {
      [cube.u, cube.r, cube.d, cube.l] = turnToCounterClockwise(cube.u, cube.r, cube.d, cube.l, letter);
    }
    console.log(letter + "\n" + printSide(cube.u, "") + printCenter(cube.l, cube.f, cube.r, cube.b, "") + printSide(cube.d, ""));
  }
  rl.setPrompt(promptMsg);
  rl.prompt();
});
rl.on("close", () => {
  process.exit();
});

function turnToLeftDirection(front, right, back, left, letter) {
  const row = letter === rightOrder.up ? 0 : 2;
  const temp = left[row];
  left[row] = front[row];
  front[row] = right[row];
  right[row] = back[row];
  back[row] = temp;
  return [front, right, back, left];
}

function turnToRightDirection(front, right, back, left, letter) {
  const row = letter === countOrder.up ? 0 : 2;
  const temp = right[row];
  right[row] = front[row];
  front[row] = left[row];
  left[row] = back[row];
  back[row] = temp;
  return [front, right, back, left];
}

function turnToDownDirection(front, up, back, down, letter) {
  const col = letter === rightOrder.left ? 0 : 2;
  for (let i = 0; i < 3; i++) {
    const temp = front[i][col];
    front[i][col] = up[i][col];
    up[i][col] = back[i][col];
    back[i][col] = down[i][col];
    down[i][col] = temp;
  }
  return [front, up, back, down];
}

function turnToUpDirection(front, down, back, up, letter) {
  const col = letter === countOrder.left ? 0 : 2;
  for (let i = 0; i < 3; i++) {
    const temp = up[i][col];
    up[i][col] = front[i][col];
    front[i][col] = down[i][col];
    down[i][col] = back[i][col];
    back[i][col] = temp;
  }
  return [front, down, back, up];
}

function turnToClockwise(up, right, down, left, letter) {
  const row = letter === rightOrder.front ? 2 : 0;
  const col = letter === rightOrder.front ? 0 : 2;
  for (let i = 0; i < 3; i++) {
    const temp = right[i][col];
    right[i][col] = up[row][i];
    up[row][i] = left[2 - i][row];
    left[2 - i][row] = down[row][2 - i];
    down[row][2 - i] = temp;
  }
  return [up, right, down, left];
}

function turnToCounterClockwise(up, right, down, left, letter) {
  const row = letter === countOrder.front ? 2 : 0;
  const col = letter === countOrder.front ? 0 : 2;
  for (let i = 0; i < 3; i++) {
    const temp = right[i][col];
    right[i][col] = down[row][2 - i];
    down[row][2 - i] = left[2 - i][row];
    left[2 - i][row] = up[row][i];
    up[row][i] = temp;
  }
  return [up, right, down, left];
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
