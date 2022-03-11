import React from "react";
import TestRenderer from "react-test-renderer";
import { HardBreak } from "../../src";

describe("HardBreak", () => {
    test("it renders a <br/>", () => {
        const result = TestRenderer.create(<HardBreak />);

        expect(result.toTree().rendered.type).toBe("br");
    });
});
