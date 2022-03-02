import React from "react";
import TestRenderer from "react-test-renderer";
import { Set } from "../../src";
import MySet from "../stubs/MySet";

describe("Set", () => {
  test("it renders the set", () => {
    const attrs = {
      values: { type: "my-set" },
    };

    const sets = {
      "my-set": MySet,
    };

    const result = TestRenderer.create(
      <Set attrs={attrs} sets={sets} />
    ).toTree().rendered;

    expect(result.type).toBe(MySet);
    expect(result.props.type).toBe("my-set");
  });
});
