class Ed {
  *run() {
    let input;
    let output = "";

    while (typeof (input = yield output) == "string") {
      switch (input) {
        case "Q":
          return 0;
        default:
          output = "?\n";
      }
    }
  }
}

if (typeof module !== "undefined")
  module.exports = Ed;
