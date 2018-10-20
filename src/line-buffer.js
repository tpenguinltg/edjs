class LineBuffer {
	constructor(contents) {
		this.contents = contents;
	}

	toString() {
		return this.contents;
	}
}

if (typeof module !== "undefined")
	module.exports = LineBuffer;
