import React from "react";
import TestRenderer from "react-test-renderer";
import Bard, {
    HardBreak,
    Heading,
    HorizontalRule,
    Set,
    Text,
    Utility,
} from "../src/index";
import MyParagraph from "./stubs/MyParagraph";
import MySet from "./stubs/MySet";

describe("Bard", () => {
    test("it returns an array of components", () => {
        const data = [
            { type: "hard_break" },
            { type: "hard_break" },
            { type: "hard_break" },
        ];

        const results = TestRenderer.create(<Bard data={data} />);

        results
            .toTree()
            .rendered.forEach((result) => expect(result.type).toBe(HardBreak));

        expect(results.toTree().rendered.length).toBe(3);
    });

    test("it delegates the given sets", () => {
        const data = [{ type: "set", attrs: { values: { type: "my-set" } } }];

        const sets = { "my-set": MySet };

        const results = TestRenderer.create(
            <Bard data={data} sets={sets} />
        ).toTree().rendered;

        expect(results.type).toBe(Set);
        expect(results.rendered.type).toBe(MySet);
    });

    test("it renders components", () => {
        const data = [
            { type: "hard_break" },
            { type: "horizontal_rule" },
            { type: "paragraph" },
            { type: "heading", attrs: { level: 1 } },
            { type: "text", text: "Yes we can!" },
        ];

        const results = TestRenderer.create(<Bard data={data} />)
            .toTree()
            .rendered.map(({ type }) => type);

        expect(results).toStrictEqual([
            HardBreak,
            HorizontalRule,
            Utility,
            Heading,
            Text,
        ]);
    });

    test("it allows extensions and to overwrite components", () => {
        const data = [{ type: "paragraph" }];

        const overrides = { paragraph: MyParagraph };

        const results = TestRenderer.create(
            <Bard data={data} extend={overrides} />
        ).toTree().rendered;

        expect(results.type).toBe(MyParagraph);
    });
});
