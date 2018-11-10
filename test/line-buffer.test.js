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

	describe("link", () => {
		it("should link two lines", () => {
			const line1 = new LineBuffer.Line("line1");
			const line2 = new LineBuffer.Line("line2");

			LineBuffer.link(line1, line2);

			assert.equal(line1.next, line2);
			assert.equal(line2.previous, line1);
		});

		it("should link with null on the right", () => {
			const line = new LineBuffer.Line("line");
			line.previous = {};

			LineBuffer.link(line, null);

			assert.equal(line.next, null);
		});

		it("should link with null on the left", () => {
			const line = new LineBuffer.Line("line");
			line.next = {};

			LineBuffer.link(null, line);

			assert.equal(line.previous, null);
		});

		it("should do nothing on two nulls", () => {
			LineBuffer.link(null, null);
		});
	});

	describe("linkAll", () => {
		it("should create a doubly linked list of lines", () => {
			const lines = [
				new LineBuffer.Line("a"),
				new LineBuffer.Line("b"),
				new LineBuffer.Line("c"),
			];

			LineBuffer.linkAll(lines);

			[
				[lines[0].previous, null],
				[lines[0].next, lines[1]],
				[lines[1].previous, lines[0]],
				[lines[1].next, lines[2]],
				[lines[2].previous, lines[1]],
				[lines[2].next, null],
			].forEach((args) => void assert.equal(...args));
		});

		it("should return the buffer", () => {
			const buffer = [
				new LineBuffer.Line("line1"),
				new LineBuffer.Line("line2")
			];

			assert.equal(LineBuffer.linkAll(buffer), buffer);
		});
	});

	describe("toLines", () => {
		it("should return an empty array for no content", () => {
			assert.deepEqual(LineBuffer.toLines(), []);
		});

		it("should return a linked Line array representing the contents", () => {
			const contents = "line1\nline2";
			const expected = [
				new LineBuffer.Line("line1"),
				new LineBuffer.Line("line2"),
			];
			expected[0].next = expected[1];
			expected[1].previous = expected[0];

			const lines = LineBuffer.toLines(contents);

			assert.deepEqual(lines, expected);
			assert.equal(lines[0].next, lines[1]);
			assert.equal(lines[1].previous, lines[0]);
		});

		it("should not link Lines if explicitly instructed", () => {
			const expected = [
				new LineBuffer.Line("line1"),
				new LineBuffer.Line("line2"),
			];

			assert.deepEqual(LineBuffer.toLines("line1\nline2", false), expected);
		});
	});

	describe("insertContents", () => {
		it("should insert Lines at the start index", () => {
			const expected = LineBuffer.linkAll([
				new LineBuffer.Line("line 1"),
				new LineBuffer.Line("inserted"),
				new LineBuffer.Line("contents"),
				new LineBuffer.Line("line 2"),
			]);
			const buffer = new LineBuffer("line 1\nline 2");

			buffer.insertContents(1, "inserted\ncontents");

			assert.deepEqual(buffer.contents, expected);
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
