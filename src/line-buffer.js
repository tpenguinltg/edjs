class LineBuffer {
	constructor(contents) {
		this.contents = contents
			.split("\n")
			.map((line) => new LineBuffer.Line(line));

		this.relinkLines(this.contents);
	}

	static link(before, after) {
		if (before) before.next = after;
		if (after) after.previous = before;
	}

	relinkLines(buffer) {
		buffer.reduce((previous, current) => {
			LineBuffer.link(previous, current);
			return current;
		});
	}

	toString() {
		return this.contents
			.map((line) => line.toString())
			.join("\n");
	}
}

LineBuffer.Line = class {
	constructor(contents, previous = null, next = null, marks) {
		this.contents = contents;
		this.previous = previous;
		this.next = next;
		this.marks = new Set(marks);
	}

	toString() {
		return this.contents.toString();
	}
};

if (typeof module !== "undefined")
	module.exports = LineBuffer;
