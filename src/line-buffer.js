class LineBuffer {
	constructor(contents) {
		this.contents = contents
			.split("\n")
			.map((line) => new LineBuffer.Line(line));

		this.relinkLines(this.contents);
	}

	relinkLines(buffer) {
		buffer.forEach((line, i) => {
			line.previous = buffer[i - 1];
			line.next = buffer[i + 1];
		});
		buffer[0].previous = buffer[buffer.length - 1].next = null;
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
