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

			it("should set the last error to UNKNOWN_COMMAND", () => {
				const instance = ed.run();
				instance.next();

				const iteration = instance.next("notacommand");

				assert.equal(ed.lastError, ed.errors.UNKNOWN_COMMAND);
			});
		});

		describe("h", () => {
			it("should print the last error", () => {
				const instance = ed.run();
				const error = "SOME ERROR";

				instance.next();
				ed.lastError = error;
				const iteration = instance.next("h");

				assert.equal(iteration.value, error + "\n");
			});

			it("should not print anything if there has not been an error", () => {
				const instance = ed.run();
				instance.next();

				const iteration = instance.next("h");

				assert.equal(iteration.value, "");
			});
		});

		describe("H", () => {
			it("should cause errors to print automatically", () => {
				const instance = ed.run();
				instance.next();

				instance.next("H");
				const iteration = instance.next(")");

				assert.equal(iteration.value, `?\n${ed.errors.UNKNOWN_COMMAND}\n`);
			});

			it("should toggle verbose errors", () => {
				const instance = ed.run();
				instance.next();

				instance.next("H");
				instance.next(")");
				instance.next("H");
				const iteration = instance.next(")");

				assert.equal(iteration.value, "?\n");
			});

			it("should print the last error on enable", () => {
				const instance = ed.run();
				instance.next();

				instance.next(")");
				const iteration = instance.next("H");

				assert.equal(
					iteration.value,
					`${ed.errors.UNKNOWN_COMMAND}\n`
				);
			});

			it("should not print the last error on disable", () => {
				const instance = ed.run();
				instance.next();

				instance.next(")");
				instance.next("H");
				const iteration = instance.next("H");

				assert.equal(iteration.value, "");
			});

			it("should not print error when the last command succeeded", () => {
				const instance = ed.run();
				instance.next();

				instance.next(")");
				instance.next("H");
				const iteration = instance.next("P");

				assert.equal(iteration.value, ed.prompt);
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

			it("should quit with success if there was no error", () => {
				const instance = ed.run();
				instance.next();

				const iteration = instance.next("q");

				assert.ok(iteration.value);
			});

			it("should quit with failure if there was an error", () => {
				const instance = ed.run();
				instance.next();
				ed.lastError = "SOME ERROR";

				const iteration = instance.next("q");

				assert.ok(!iteration.value);
			});
		});

		describe("Q", () => {
			it("should quit", () => {
				const instance = ed.run();
				instance.next();

				const iteration = instance.next("Q");

				assert.ok(iteration.done, "The generator should be done.");
			});

			it("should quit with success if there was no error", () => {
				const instance = ed.run();
				instance.next();

				const iteration = instance.next("Q");

				assert.ok(iteration.value);
			});

			it("should quit with failure if there was an error", () => {
				const instance = ed.run();
				instance.next();
				ed.lastError = "SOME ERROR";
				const iteration = instance.next("Q");

				assert.ok(!iteration.value);
			});
		});
	});
});
