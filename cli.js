#!/usr/bin/env node
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Ed = require("./src/ed");
const ed = new Ed();
const instance = ed.run();
instance.next();

readline.on("line", (line) => {
  const iteration = instance.next(line);
  if (iteration.done) {
    process.exit(!iteration.value);
  } else {
    process.stdout.write(iteration.value);
  }
});
