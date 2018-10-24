class LineBuffer {
	constructor(contents) {
		this.contents = contents;
	}

	toString() {
		return this.contents;
	}
}

LineBuffer.Line = class {
	constructor(contents, previous, next, mark) {
		this.contents = contents;
		this.previous = previous;
		this.next = next;
		this.mark = mark;
	}

	toString() {
		return this.contents.toString();
	}
};

if (typeof module !== "undefined")
	module.exports = LineBuffer;
