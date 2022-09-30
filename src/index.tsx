import * as React from "react";

export interface HasAttributes {
    attrs?: Object;
}

export interface AllowsExtends {
    extend?: {
        [key: string]: Function;
    };
}

export interface HasChildren {
    children: React.ReactNode;
}

export interface HasContent {
    content?: Array<HasType>;
}

export interface HasSets {
    sets: {
        [key: string]: Function;
    };
}

export interface HasType {
    type: string;
}

type ImageAttributes = { attrs: { src: string; alt?: string; } };

type HeadingAttributes = { attrs: { level: 1 | 2 | 3 | 4 | 5 | 6 } };

type SetAttributes = { attrs: { values: HasType } };

export const Tag = ({ type, ...props }: HasType & HasChildren) => {
    const availableTags = {
        blockquote: "blockquote",
        bullet_list: "ul",
        code_block: "code",
        list_item: "li",
        ordered_list: "ol",
        paragraph: "p",
        link: "a",
        superscript: "sup",
        subscript: "sub",
        code: "code",
        underline: "u",
        strike: "strike",
        italic: "em",
        bold: "strong",
        table: "table",
        table_row: "tr",
        table_header: "th",
        table_cell: "td",
    };
    if (!Object.keys(availableTags).includes(type)) {
        throw new Error(`react-bard: Type "${type}" not supported`);
    }
    const HtmlTag = availableTags[type] as keyof JSX.IntrinsicElements;
    return <HtmlTag {...props}/>;
};

export const HardBreak = () => {
    return <br />;
};

export const Heading = ({
    attrs,
    content = [],
    sets,
    extend,
}: HasContent & HasSets & AllowsExtends & HeadingAttributes) => {
    const Tag = `h${attrs.level}` as keyof JSX.IntrinsicElements;

    return (
        <Tag>
            <Bard data={content} sets={sets} extend={extend} />
        </Tag>
    );
};

export const HorizontalRule = () => {
    return <hr />;
};

export const Markup = ({
    type,
    attrs,
    children,
}: HasType & HasAttributes & HasChildren) => {
    return (
        <Tag type={type} {...attrs}>
            {children}
        </Tag>
    );
};

export const Set = ({
    attrs,
    sets,
}: SetAttributes & HasSets & AllowsExtends) => {
    const { values } = attrs;
    const Component = sets[values.type];
    return <Component {...values} />;
};

export const Text = ({
    marks = [],
    text,
}: {
    marks: Array<HasType & HasAttributes>;
    text: React.ReactNode;
}) => {
    let output = text;

    marks.forEach(
        ({ type, attrs }) =>
            (output = (
                <Markup type={type} attrs={attrs}>
                    {output}
                </Markup>
            ))
    );

    return output;
};

export const Utility = ({
    content = [],
    type,
    sets,
    extend,
}: HasType & HasContent & HasSets & AllowsExtends) => {
    return (
        <Tag type={type}>
            <Bard data={content} sets={sets} extend={extend} />
        </Tag>
    );
};


export const Image = ({ attrs }: ImageAttributes) => {
    return <img {...attrs} />
}

const Bard = ({
    data,
    sets,
    extend = {},
}: { data: Array<HasType> } & HasSets & AllowsExtends) => {
    const components = {
        heading: Heading,
        image: Image,
        horizontal_rule: HorizontalRule,
        hard_break: HardBreak,
        text: Text,
        set: Set,
    };

    return (
        <React.Fragment>
            {data.map((item) => {
                const Component = extend[item.type] || components[item.type] || Utility;
                const key = Math.random().toString(36).substr(2, 8);

                return <Component {...item} sets={sets} key={key} />;
            })}
        </React.Fragment>
    );
};

export default Bard;
