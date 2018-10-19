class Ed {
	constructor({prompt} = {}) {
		this.promptString = prompt || "*";
		this.showPrompt = !!prompt;
		this.lastError = "";
	}

	get prompt() {
		return (this.showPrompt)? this.promptString : "";
	}

	*run() {
		let input, output, error;
		let verbose = false;

		while (typeof (input = yield (output + this.prompt)) == "string") {
			output = "";
			error = "";

			switch (input) {
				case "H":
					verbose = !verbose;
					if (!verbose) break;
				case "h":
					if (this.lastError)
						output = this.lastError + "\n";
					break;
				case "P":
					this.showPrompt = !this.showPrompt;
					break;
				case "q":
				case "Q":
					return !this.lastError;
				default:
					output = "?\n";
					error = this.errors.UNKNOWN_COMMAND;
			}

			if (error) this.lastError = error;
			if (verbose && error)
				output += this.lastError + "\n";
		}
	}
}

Ed.prototype.errors = {
	UNKNOWN_COMMAND: "unknown command",
};

if (typeof module !== "undefined")
	module.exports = Ed;
