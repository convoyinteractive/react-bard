import React from "react";
import TestRenderer from "react-test-renderer";
import { HorizontalRule, HardBreak, Text, Markup } from "../dist/index";

describe('Bard', () => {
    test('HardBreak renders <br/>', () => {
        const test = TestRenderer.create(<HardBreak />);

        expect(test.toTree().rendered.type).toBe('br');
    })

    test('HorizontalRule renders <hr/>', () => {
        const test = TestRenderer.create(<HorizontalRule />);

        expect(test.toTree().rendered.type).toBe('hr');
    })

    test('Text renders given text', () => {
        const test = TestRenderer.create(<Text text='testing Text' />);

        expect(test.toTree().rendered).toBe('testing Text');
    })

    test('Text renders Markup component with type of "bold"', () => {
        const test = TestRenderer.create(<Text marks={[{ type: "bold" }]} text='testing Text' />);

        expect(test.toTree().rendered.type).toBe(Markup);
    })

    test('Markup of type "bold" renders strong tag', () => {
        const test = TestRenderer.create(<Markup type="bold">1 Kind Politik</Markup>);

        expect(test.toTree().rendered.type).toBe('strong');
    })

    test('Markup of unsupported type throws error', () => {
        try {
            Markup({
                type: "hulk",
                children: "1KindPolitik"
            });
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    })
})