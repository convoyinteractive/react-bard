import React from "react";
import TestRenderer from "react-test-renderer";
import Bard, { Utility, Tag } from "../../src";

describe("Utility", () => {
    test("it renders the tag component", () => {
        const result = TestRenderer.create(
            <Utility type="paragraph">Yes we can!</Utility>
        );

        expect(result.toTree().rendered.type).toBe(Tag);
    });

    test("it nests bard camponents", () => {
        const result = TestRenderer.create(
            <Utility type="paragraph"></Utility>
        );

        expect(result.toTree().rendered.props.children.type).toBe(Bard);
    });
});
