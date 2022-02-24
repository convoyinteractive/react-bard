import React from "react";
import TestRenderer from "react-test-renderer";
import {
  Bard,
  HardBreak,
  Heading,
  HorizontalRule,
  Markup,
  Set,
  Text,
  Utility,
} from "../src/index";
import MySet from "./stubs/MySet";

describe("Bard", () => {
  test("HardBreak renders <br/>", () => {
    const test = TestRenderer.create(<HardBreak />);

    expect(test.toTree().rendered.type).toBe("br");
  });

  test("HorizontalRule renders <hr/>", () => {
    const test = TestRenderer.create(<HorizontalRule />);

    expect(test.toTree().rendered.type).toBe("hr");
  });

  test("Text renders given text", () => {
    const markup = TestRenderer.create(
      <Text marks={[{ type: "bold" }]} text="testing Text" />
    );
    expect(markup.toTree().rendered.type).toBe(Markup);

    const text = TestRenderer.create(<Text text="testing Text" />);
    expect(text.toTree().rendered).toBe("testing Text");
  });

  test("Markup renders html", () => {
    const test = TestRenderer.create(
      <Markup attrs={{ title: "test" }} type="bold">
        1 Kind Politik
      </Markup>
    );

    expect(test.toTree().rendered.type).toBe("strong");
    expect(test.toTree().rendered.props.title).toBe("test");

    try {
      Markup({
        type: "hulk",
        children: "1KindPolitik",
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  test("Utility renders nested component", () => {
    const test = TestRenderer.create(<Utility type="paragraph"></Utility>);
    const rendered = test.toTree().rendered;

    expect(rendered.type).toBe("p");
    expect(rendered.props.children.type).toBe(Bard);
  });

  test("Heading returns a heading with level", () => {
    const test = TestRenderer.create(<Heading attrs={{ level: 1 }} />);

    expect(test.toTree().rendered.type).toBe("h1");
  });

  test("Bard returns an array of components", () => {
    const test = TestRenderer.create(
      <Bard
        data={[
          { type: "text", text: "test" },
          { type: "hard_break" },
          { type: "set", attrs: { values: { type: "my-set" } } },
        ]}
        sets={{ "my-set": MySet }}
      />
    );

    const rendered = test.toTree().rendered;

    expect(rendered[0].type).toBe(Text);
    expect(rendered[1].type).toBe(HardBreak);
    expect(rendered[2].rendered.type).toBe(MySet);
    expect(rendered[2].type).toBe(Set);
    expect(rendered.length).toBe(3);
  });

  test("Set renders a set", () => {
    const attrs = {
      values: { type: "my-set" },
    };
    const sets = {
      "my-set": MySet,
    };

    const test = TestRenderer.create(<Set attrs={attrs} sets={sets} />);

    expect(test.toTree().rendered.type).toBe(MySet);
    expect(test.toTree().rendered.props.type).toBe("my-set");
  });
});
