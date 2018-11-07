import { expect } from "chai";
import "mocha";

describe("Hello function", () => {
  it("should return hello world", () => {
    expect("Hello world!").to.equal("Hello world!");
  });
});
