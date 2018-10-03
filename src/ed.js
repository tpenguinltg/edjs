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
				case "h":
					output = this.error + "\n";
					break;
				case "P":
					this.showPrompt = !this.showPrompt;
					break;
				case "q":
				case "Q":
					return !this.error;
				default:
					output = "?\n";
					this.error = this.errors.UNKNOWN_COMMAND;
			}
		}
	}
}

Ed.prototype.errors = {
	UNKNOWN_COMMAND: "unknown command",
};

if (typeof module !== "undefined")
	module.exports = Ed;
