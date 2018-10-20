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
