class Ed {
  *run() {
    let input;
    let output = "";

    while (typeof (input = yield output) == "string") {
      output = "?\n";
    }
  }
}

if (typeof module !== "undefined")
  module.exports = Ed;
