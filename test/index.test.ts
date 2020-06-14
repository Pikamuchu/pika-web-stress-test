import { expect, test } from "@oclif/test";

import cmd = require("../src");

describe("Test pika-web-stress-test script", () => {
  test
    .stdout()
    .do(() => cmd.run(["https://pikamachu.github.io"]))
    .it("runs stress on https://pikamachu.github.io", ctx => {
      expect(ctx.stdout).to.contain("Opening url https://pikamachu.github.io");
    });
});
