import React from "react";

export const makeTag = (type) => {
    const availableTags = {
        blockquote: 'blockquote',
        bullet_list: 'ul',
        code_block: 'code',
        list_item: 'li',
        ordered_list: 'ol',
        paragraph: 'p',
        link: 'a',
        superscript: 'sup',
        subscript: 'sub',
        code: 'code',
        underline: 'u',
        strike: 'strike',
        italic: 'em',
        bold: 'strong',
        table: 'table',
        table_row: 'tr',
        table_header: 'th',
        table_cell: 'td',
    };
    if(Object.keys(availableTags).includes(type)) {
        return availableTags[type];
    }
    throw new Error(`react-bard: Type "${type}" not supported`);
};

export const makeKey = () => Math.random().toString(36).substr(2, 8);

const Bard = ({ data, sets }) => {
    const components = {
        heading: Heading,
        horizontal_rule: HorizontalRule,
        hard_break: HardBreak,
        text: Text,
        set: Set,
    }
    
    return data.map((item) => {
        const Component = components[item.type] || Utility;
        const key = makeKey();

        return (<Component {...item} sets={ sets } key={key} />);
    });
};

export const Markup = ({ type, attrs, children }) => {
    const Tag = makeTag(type);
    return Tag ? (<Tag {...attrs} >{children}</Tag>) : null;
}

export const Text = ({ marks = [], text }) => {
    let output = text;

    marks.forEach(({ type, attrs }) => output = (
        <Markup type={type} attrs={attrs}>{output}</Markup>
    ));

    return output;
}

export const Utility = ({ content = [], type }) => {
    const Tag = makeTag(type);

    return Tag ? (<Tag><Bard data={content} /></Tag>) : null;
};

export const Set = ({ attrs, sets }) => {
    const { values } = attrs; 
    const Component = sets[values.type];
    return <Component {...values} />;
};

export const Heading = ({ attrs, content = [] }) => {
    const Tag = "h" + attrs.level;

    return (<Tag><Bard data={content} /></Tag>);
};

export const HorizontalRule = () => (<hr />);

export const HardBreak = () => (<br />);

export default Bard;
