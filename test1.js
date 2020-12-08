const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const promptMsg = "> ";
rl.setPrompt("단어 하나, 정수 숫자 하나(-100 <= N <100), L 또는 R을 입력하세요. \n ex) apple 3 R \n ※L, R은 소문자도 가능 \n" + promptMsg);
rl.prompt();
rl.on("line", (line) => {
  let [word, num, direct] = line.split(" ");
  num = +num;
  direct = direct.toUpperCase();
  if (num < 0) {
    direct = direct === "L" ? "R" : "L";
    num *= -1;
  }
  if (num % word.length) word = move(direct, num, word.split(""));
  console.log(word);
  rl.setPrompt(promptMsg);
  rl.prompt();
});
rl.on("close", () => {
  process.exit();
});

function move(direct, num, wordArr) {
  for (let i = 0; i < num; i++) {
    let temp = "";
    switch (direct) {
      case "L":
        temp = wordArr.shift();
        wordArr.push(temp);
        break;
      case "R":
        temp = wordArr.pop();
        wordArr.unshift(temp);
        break;
    }
  }
  return wordArr.join("");
}
