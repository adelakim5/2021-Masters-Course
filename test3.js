const { FORMERR } = require("dns");

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const promptMsg = "CUBE> ";
const quit = "Q";
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
const shuffle = "S";
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
let performedOrdersCnt = 0;
let startTime = "";
rl.setPrompt(printSide(cube.u, "") + printCenter(cube.l, cube.f, cube.r, cube.b, "") + printSide(cube.d, "") + promptMsg);
rl.prompt();
rl.on("line", (line) => {
  if (startTime === "") startTime = new Date();
  line = parse(line);
  try {
    for (let i = 0; i < line.length; i++) {
      const letter = line[i] === "2" ? line[i - 1] : line[i];
      if (letter === quit) doQuit();
      performedOrdersCnt++;
      if (letter === shuffle) doShuffle();
      else excute(letter);
      console.log(recover(letter) + "\n" + printSide(cube.u, "") + printCenter(cube.l, cube.f, cube.r, cube.b, "") + printSide(cube.d, ""));
      if (performedOrdersCnt > 0 && isAllDone()) {
        console.log(`\n모두 다 맞추셨습니다! 축하합니다~`);
        doQuit();
      }
    }
  } catch (e) {
    console.log("잘못된 입력입니다. 다시 입력해주세요.");
  }
  rl.setPrompt(promptMsg);
  rl.prompt();
});

function excute(letter) {
  if (letter === rightOrder.up || letter === countOrder.down) [cube.f, cube.r, cube.b, cube.l] = turnToLeftDirection(cube.f, cube.r, cube.b, cube.l, letter);
  else if (letter === rightOrder.down || letter === countOrder.up) [cube.f, cube.r, cube.b, cube.l] = turnToRightDirection(cube.f, cube.r, cube.b, cube.l, letter);
  else if (letter === rightOrder.left || letter === countOrder.right) [cube.f, cube.u, cube.b, cube.d] = turnToDownDirection(cube.f, cube.u, cube.b, cube.d, letter);
  else if (letter === rightOrder.right || letter === countOrder.left) [cube.f, cube.d, cube.b, cube.u] = turnToUpDirection(cube.f, cube.d, cube.b, cube.u, letter);
  else if (letter === rightOrder.front || letter === countOrder.back) [cube.u, cube.r, cube.d, cube.l] = turnToClockwise(cube.u, cube.r, cube.d, cube.l, letter);
  else if (letter === rightOrder.back || letter === countOrder.front) [cube.u, cube.r, cube.d, cube.l] = turnToCounterClockwise(cube.u, cube.r, cube.d, cube.l, letter);
  else throw new Error("non-existed letter");
}
rl.on("close", () => {
  process.exit();
});

function doShuffle() {
  const command = [..."FURBLDfrubld"];
  const randomInterval = parseInt(Math.random() * 1000 + 500);
  for (let i = 0; i < randomInterval; i++) {
    excute(command[parseInt(Math.random() * command.length)]);
  }
}

function doQuit() {
  const endTime = new Date();
  const duringTime = calculateDuringTime(endTime);
  console.log(`\n경과시간: ${duringTime}\n조작개수: ${performedOrdersCnt}\n이용해주셔서 감사합니다.`);
  rl.close();
}

function calculateDuringTime(endTime) {
  let [hour, minutes, seconds] = [endTime.getHours(), endTime.getMinutes(), endTime.getSeconds()];
  const [startHour, startMinute, startSeconds] = [startTime.getHours(), startTime.getMinutes(), startTime.getSeconds()];
  if (seconds < startSeconds) {
    minutes--;
    if (minutes < startMinute) {
      hour--;
      minutes += 60;
    }
    seconds += 60;
  }
  minutes -= startMinute;
  seconds -= startSeconds;
  hour -= startHour;
  return [hour, minutes, seconds].join(":");
}

function isAllDone() {
  const cubeParts = [cube.f, cube.r, cube.b, cube.l, cube.u, cube.d];
  for (let currPart of cubeParts) {
    const color = currPart[0][0];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (color !== currPart[i][j]) return false;
      }
    }
  }
  return true;
}

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
  const counterCol = letter === rightOrder.left ? 2 : 0;
  for (let i = 0; i < 3; i++) {
    const temp = front[i][col];
    front[i][col] = up[i][col];
    up[i][col] = back[2 - i][counterCol];
    back[2 - i][counterCol] = down[i][col];
    down[i][col] = temp;
  }
  return [front, up, back, down];
}

function turnToUpDirection(front, down, back, up, letter) {
  const col = letter === countOrder.left ? 0 : 2;
  const counterCol = letter === countOrder.left ? 2 : 0;
  for (let i = 0; i < 3; i++) {
    const temp = up[i][col];
    up[i][col] = front[i][col];
    front[i][col] = down[i][col];
    down[i][col] = back[2 - i][counterCol];
    back[2 - i][counterCol] = temp;
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
    left[2 - i][row] = down[col][2 - i];
    down[col][2 - i] = temp;
  }
  return [up, right, down, left];
}

function turnToCounterClockwise(up, right, down, left, letter) {
  const row = letter === countOrder.front ? 2 : 0;
  const col = letter === countOrder.front ? 0 : 2;
  for (let i = 0; i < 3; i++) {
    const temp = right[i][col];
    right[i][col] = down[col][2 - i];
    down[col][2 - i] = left[2 - i][row];
    left[2 - i][row] = up[row][i];
    up[row][i] = temp;
  }
  return [up, right, down, left];
}

function parse(line) {
  return line.toUpperCase().replace(/F'/g, "f").replace(/R'/g, "r").replace(/U'/g, "u").replace(/B'/g, "b").replace(/L'/g, "l").replace(/D'/g, "d");
}

function recover(letter) {
  const codeNum = letter.charCodeAt(0);
  if (codeNum >= 97 && codeNum <= 122) return letter.toUpperCase() + "'";
  return letter;
}

function printSide(arr, str) {
  const space = "               ";
  for (let i = 0; i < 3; i++) {
    str += space + arr[i].join(" ") + "\n";
  }
  return str + "\n";
}

function printCenter(left, front, right, back, str) {
  const space = "     ";
  for (let i = 0; i < 3; i++) {
    str += left[i].join(" ") + space + front[i].join(" ") + space + right[i].join(" ") + space + back[i].join(" ") + "\n";
  }
  return str + "\n";
}
