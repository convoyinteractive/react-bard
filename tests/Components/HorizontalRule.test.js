import React from "react";
import TestRenderer from "react-test-renderer";
import { HorizontalRule } from "../../src";

describe("HorizontalRule", () => {
  test("it renders a <hr/>", () => {
    const result = TestRenderer.create(<HorizontalRule />);

    expect(result.toTree().rendered.type).toBe("hr");
  });
});
