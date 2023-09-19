const bcrypt = require("bcrypt");
const prompt = require("prompt-sync")();

async function hashmap(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function main() {
  const userInput = prompt("password: ");
  console.log(await hashmap(userInput));
}

main();
