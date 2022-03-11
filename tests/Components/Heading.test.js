import React from "react";
import TestRenderer from "react-test-renderer";
import Bard, { Heading } from "../../src";

describe("Heading", () => {
    test("it renders the correct html tag", () => {
        const result = TestRenderer.create(<Heading attrs={{ level: 1 }} />);

        expect(result.toTree().rendered.type).toBe("h1");
    });

    test("it nests bard camponents", () => {
        const result = TestRenderer.create(<Heading attrs={{ level: 1 }} />);

        expect(result.toTree().rendered.props.children.type).toBe(Bard);
    });
});
