class Ed {
  constructor({prompt} = {}) {
    this.promptString = prompt || "*";
    this.showPrompt = !!prompt;
  }

  get prompt() {
    return (this.showPrompt)? this.promptString : "";
  }

  *run() {
    let input;
    let output = "";

    while (typeof (input = yield (output + this.prompt)) == "string") {
      output = "";
      switch (input) {
        case "P":
          this.showPrompt = !this.showPrompt;
          break;
        case "q":
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
