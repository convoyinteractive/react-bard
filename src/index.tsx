import React from "react";

const makeTag = (type) => {
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
    console.error(`react-bard: Type "${type}" not supported`);
    return null;
};

const makeKey = () => Math.random().toString(36).substr(2, 8);

const Bard = ({ data, sets }) => {
    const components = {
        heading: Heading,
        horizontal_rule: HorizontalRule,
        text: Text,
        set: Set,
    }

    
    return data.map((item) => {
        const Component = components[item.type] || Utility;
        const key = makeKey();

        return (<Component {...item} sets={ sets } key={key} />);
    });
};

const Text = ({ marks = [], text }) => {
    let output = text;

    const Markup = ({ type, attrs, children }) => {
        const Tag = makeTag(type);
        return Tag ? (<Tag {...attrs} >{children}</Tag>) : null;
    }

    marks.forEach(({ type, attrs }) => output = (
        <Markup type={type} attrs={attrs}>{output}</Markup>
    ));

    return output;
}

const Utility = ({ content = [], type }) => {
    const Tag = makeTag(type);

    return Tag ? (<Tag><Bard data={content} /></Tag>) : null;
};

const Set = ({ attrs, sets }) => {
    const { values } = attrs; 
    const Component = sets[values.type];
    return <Component {...values} />;
};

const Heading = ({ attrs, content }) => {
    const Tag = "h" + attrs.level;

    return (<Tag><Bard data={content} /></Tag>);
};

const HorizontalRule = () => (<hr />);

export default Bard;
