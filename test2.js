const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const init = `R R W\nG C W\nG B B\n`;
const promptMsg = "\nCUBE> ";
let arr = init.split("\n").map((e) => e.split(" "));
const order = {
  toLeftOfUp: "U",
  toRightOfUp: "u",
  toUpOfRight: "R",
  toDownOfRight: "r",
  toDownOfLeft: "L",
  toUpOfLeft: "l",
  toRightOfBottom: "B",
  toLeftOfBottom: "b",
  quit: "Q",
};
rl.setPrompt(init + promptMsg);
rl.prompt();
rl.on("line", (line) => {
  main(parse(line));
});
rl.on("close", () => {
  process.exit();
});

function main(line) {
  if (line === "Q") doQuit();
  for (let i = 0; i < line.length; i++) {
    const temp = modifyCube(line[i], arr);
    const letter = recover(line[i]);
    if (temp === -1) doQuit();
    if (temp === undefined) {
      console.log(`"${letter}" 명령어를 찾을 수 없습니다.`);
      continue;
    }
    arr = temp;
    console.log("\n" + letter + "\n" + print(arr));
  }
  rl.setPrompt(promptMsg);
  rl.prompt();
}

function parse(line) {
  return line.toUpperCase().replace(/U'/g, "u").replace(/R'/g, "r").replace(/L'/g, "l").replace(/B'/g, "b");
}

function recover(letter) {
  const codeNumber = letter.charCodeAt(0);
  if (codeNumber >= 97 && codeNumber <= 122) return letter.toUpperCase() + "'";
  return letter;
}

function doQuit() {
  console.log("\nBye~");
  rl.close();
}

function modifyCube(letter, arr) {
  switch (letter) {
    case order.toLeftOfUp:
      arr = toLeft(arr, order.toLeftOfUp);
      break;
    case order.toLeftOfBottom:
      arr = toLeft(arr, order.toLeftOfBottom);
      break;
    case order.toRightOfUp:
      arr = toRight(arr, order.toRightOfUp);
      break;
    case order.toRightOfBottom:
      arr = toRight(arr, order.toRightOfBottom);
      break;
    case order.toUpOfLeft:
      arr = toUp(arr, order.toUpOfLeft);
      break;
    case order.toUpOfRight:
      arr = toUp(arr, order.toUpOfRight);
      break;
    case order.toDownOfLeft:
      arr = toDown(arr, order.toDownOfLeft);
      break;
    case order.toDownOfRight:
      arr = toDown(arr, order.toDownOfRight);
      break;
    case order.quit:
      return -1;
    default:
      return undefined;
  }
  return arr;
}

function toLeft(arr, flag) {
  const row = flag === order.toLeftOfUp ? 0 : 2;
  const temp = arr[row][1];
  arr[row][1] = arr[row][2];
  arr[row][2] = arr[row][0];
  arr[row][0] = temp;
  return arr;
}

function toRight(arr, flag) {
  const row = flag === order.toRightOfUp ? 0 : 2;
  const temp = arr[row][2];
  arr[row][2] = arr[row][1];
  arr[row][1] = arr[row][0];
  arr[row][0] = temp;
  return arr;
}

function toUp(arr, flag) {
  const col = flag === order.toUpOfLeft ? 0 : 2;
  const temp = arr[0][col];
  arr[0][col] = arr[1][col];
  arr[1][col] = arr[2][col];
  arr[2][col] = temp;
  return arr;
}

function toDown(arr, flag) {
  const col = flag === order.toDownOfLeft ? 0 : 2;
  const temp = arr[2][col];
  arr[2][col] = arr[1][col];
  arr[1][col] = arr[0][col];
  arr[0][col] = temp;
  return arr;
}

function print(arr) {
  let res = "";
  for (let i = 0; i < arr.length; i++) {
    res += arr[i].join(" ") + "\n";
  }
  return res.trim();
}
