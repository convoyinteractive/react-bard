import React from "react";
import TestRenderer from "react-test-renderer";
import { Markup, Text } from "../../src";

describe("Text", () => {
    test("it renders the text", () => {
        const result = TestRenderer.create(<Text text="Yes we can!" />);

        expect(result.toTree().rendered).toBe("Yes we can!");
    });

    test("it renders the markup component", () => {
        const result = TestRenderer.create(
            <Text marks={[{ type: "bold" }]} text="Yes we can!" />
        );

        expect(result.toTree().rendered.type).toBe(Markup);
    });
});
