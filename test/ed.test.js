const Ed = require("../src/ed");
const assert = require("assert").strict;

describe("Ed", () => {
  let ed;

  beforeEach(() => {
    ed = new Ed();
  });

  it("should exit on non-string input, signalling EOF", () => {
    const instance = ed.run();

    const iteration = instance.next();

    assert.ok(iteration.done, "The generator should be done.");
  });
});
