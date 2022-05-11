import React from "react";
import TestRenderer from "react-test-renderer";
import { Image } from "../../src";

describe("Image", () => {
    test("it renders a <img/>", () => {
        const result = TestRenderer.create(<Image attrs={{src: 'image.jpg'}} />);

        expect(result.toTree().rendered.type).toBe("img");
        expect(result.toTree().rendered.props.src).toBe(
            "image.jpg"
        );
    });
});
