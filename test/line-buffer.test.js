const LineBuffer = require("../src/line-buffer");
const assert = require("assert").strict;

describe("LineBuffer", () => {
	describe("constructor", () => {
		it("should store initial contents as a linked Line array", () => {
			const initialContents = "line1\nline2";
			const expected = [
				new LineBuffer.Line("line1"),
				new LineBuffer.Line("line2"),
			];
			expected[0].next = expected[1];
			expected[1].previous = expected[0];

			const lineBuffer = new LineBuffer(initialContents);

			assert.deepEqual(lineBuffer.contents, expected);
			assert.equal(lineBuffer.contents[0].next, lineBuffer.contents[1]);
			assert.equal(lineBuffer.contents[1].previous, lineBuffer.contents[0]);

		});
	});

	describe("relinkLines", () => {
		it("should create a doubly linked list of lines", () => {
			const lines = [
				new LineBuffer.Line("a"),
				new LineBuffer.Line("b"),
				new LineBuffer.Line("c"),
			];

			LineBuffer.prototype.relinkLines(lines);

			[
				[lines[0].previous, null],
				[lines[0].next, lines[1]],
				[lines[1].previous, lines[0]],
				[lines[1].next, lines[2]],
				[lines[2].previous, lines[1]],
				[lines[2].next, null],
			].forEach((args) => void assert.equal(...args));
		});
	});

	describe("toString", () => {
		it("should return the string representation of the buffer", () => {
			const contents = "a\nb";
			const buffer = new LineBuffer(contents);

			assert.equal(buffer.toString(), contents);
		});
	});
});

describe("Line", () => {
	describe("constructor", () => {
		it("should set expected properties", () => {
			const contents = "contents";
			const previous = {a: "b"};
			const next = {c: "d"};
			const marks = ["a", "z"];

			const line = new LineBuffer.Line(contents, previous, next, marks);

			assert.equal(line.contents, contents);
			assert.equal(line.previous, previous);
			assert.equal(line.next, next);
			assert(marks.every((m) => line.marks.has(m)));
		});

		it("should provide defaults", () => {
			const line = new LineBuffer.Line();

			assert.equal(line.contents, undefined);
			assert.equal(line.previous, null);
			assert.equal(line.next, null);
			assert.equal(line.marks.size, 0);
		});
	});

	describe("toString", () => {
		it("should return the contents", () => {
			const contents = "contents";
			const line = new LineBuffer.Line(contents);

			assert.equal(line.toString(), contents);
		});
	});
});
