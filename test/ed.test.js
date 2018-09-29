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

  describe("defaults", () => {
    it("should set '*' as the prompt", () => {
      assert.equal(ed.promptString, "*");
    });

    it("should hide the prompt", () => {
      assert.ok(!ed.showPrompt);
    });
  });

  describe("options", () => {
    describe("prompt", () => {
      it("should set prompt string", () => {
        const prompt = ":";

        ed = new Ed({prompt});

        assert.equal(ed.promptString, prompt);
      });

      it("should enable prompt", () => {
        const prompt = ":";

        ed = new Ed({prompt});

        assert.ok(ed.showPrompt);
      });

      it("should set default and disable if not specified", () => {
        assert.equal(ed.promptString, "*");
        assert.ok(!ed.showPrompt);
      });
    });
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

    describe("P", () => {
      it("should show prompt if prompt is disabled", () => {
        const instance = ed.run();
        instance.next();

        const iteration = instance.next("P");

        assert.equal(iteration.value, ed.promptString);
      });

      it("should hide prompt if prompt is enabled", () => {
        ed.showPrompt = true;
        const instance = ed.run();
        instance.next();

        const iteration = instance.next("P");

        assert.equal(iteration.value, "");
      });
    });

    describe("q", () => {
      it("should quit", () => {
        const instance = ed.run();
        instance.next();

        const iteration = instance.next("q");

        assert.ok(iteration.done, "The generator should be done.");
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
