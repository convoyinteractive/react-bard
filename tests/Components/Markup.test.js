import React from "react";
import TestRenderer from "react-test-renderer";
import { Markup, Tag } from "../../src";

describe("Markup", () => {
  test("it renders the tag component", () => {
    const result = TestRenderer.create(
      <Markup type="bold">Yes we can!</Markup>
    );

    expect(result.toTree().rendered.type).toBe(Tag);
  });

  test("it renders the attributes", () => {
    const result = TestRenderer.create(
      <Markup attrs={{ href: "http://example.test" }} type="link">
        Yes we can!
      </Markup>
    );

    expect(result.toTree().rendered.props.href).toBe("http://example.test");
  });

  test("it throws an error for unknown types", () => {
    try {
      Markup({ type: "any" });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
