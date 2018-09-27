const Ed = require("../src/ed");
const assert = require("assert").strict;

describe("Ed", () => {
  let ed;

  beforeEach(() => {
    ed = new Ed();
  });

  it("should exit on non-string input, signalling EOF", () => {
    const instance = ed.run();

    instance.next();
    const iteration = instance.next();

    assert.ok(iteration.done, "The generator should be done.");
  });

  describe("command", () => {
    describe("unknown", () => {
      it("should return '?' and wait for more input", () => {
        const instance = ed.run();
        instance.next();

        const iteration = instance.next("notacommand");

        assert.equal(iteration.value, "?\n");
        assert.ok(!iteration.done);
      });
    });

    describe("Q", () => {
      it("should quit", () => {
        const instance = ed.run();
        instance.next();

        const iteration = instance.next("Q");

        assert.ok(iteration.done, "The generator should be done.");
      });
    });
  });
});
