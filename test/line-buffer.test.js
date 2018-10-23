const LineBuffer = require("../src/line-buffer");
const assert = require("assert").strict;

describe("LineBuffer", () => {
	describe("toString", () => {
		it("should return the string representation of the buffer", () => {
			const contents = "a\nb";
			const buffer = new LineBuffer(contents);

			assert.equal(buffer.toString(), contents);
		});
	});
});

describe("Line", () => {
	it("should contain expected properties", () => {
		const contents = "contents";
		const previous = {a: "b"};
		const next = {c: "d"};
		const mark = "z";

		const line = new LineBuffer.Line(contents, previous, next, mark);

		assert.equal(line.contents, contents);
		assert.equal(line.previous, previous);
		assert.equal(line.next, next);
		assert.equal(line.mark, mark);
	});
});
