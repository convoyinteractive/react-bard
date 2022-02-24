Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Tag = function (_a) {
    var type = _a.type, children = _a.children;
    var availableTags = {
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
    if (!Object.keys(availableTags).includes(type)) {
        throw new Error("react-bard: Type \"".concat(type, "\" not supported"));
    }
    var HtmlTag = availableTags[type];
    return (React__namespace.createElement(HtmlTag, null, children));
};
var HardBreak = function () {
    return (React__namespace.createElement("br", null));
};
var Heading = function (_a) {
    var attrs = _a.attrs, _b = _a.content, content = _b === void 0 ? [] : _b, sets = _a.sets;
    var Tag = "h".concat(attrs.level);
    return (React__namespace.createElement(Tag, null,
        React__namespace.createElement(Bard, { data: content, sets: sets })));
};
var HorizontalRule = function () {
    return (React__namespace.createElement("hr", null));
};
var Markup = function (_a) {
    var type = _a.type, attrs = _a.attrs, children = _a.children;
    return (React__namespace.createElement(Tag, __assign({ type: type }, attrs), children));
};
var Set = function (_a) {
    var attrs = _a.attrs, sets = _a.sets;
    var values = attrs.values;
    var Component = sets[values.type];
    return (React__namespace.createElement(Component, __assign({}, values)));
};
var Text = function (_a) {
    var _b = _a.marks, marks = _b === void 0 ? [] : _b, text = _a.text;
    var output = text;
    marks.forEach(function (_a) {
        var type = _a.type, attrs = _a.attrs;
        return output = (React__namespace.createElement(Markup, { type: type, attrs: attrs }, output));
    });
    return output;
};
var Utility = function (_a) {
    var _b = _a.content, content = _b === void 0 ? [] : _b, type = _a.type, sets = _a.sets;
    return (React__namespace.createElement(Tag, { type: type },
        React__namespace.createElement(Bard, { data: content, sets: sets })));
};
var Bard = function (_a) {
    var data = _a.data, sets = _a.sets;
    var components = {
        heading: Heading,
        horizontal_rule: HorizontalRule,
        hard_break: HardBreak,
        text: Text,
        set: Set,
    };
    return data.map(function (item) {
        var Component = components[item.type] || Utility;
        var key = Math.random().toString(36).substr(2, 8);
        return (React__namespace.createElement(Component, __assign({}, item, { sets: sets, key: key })));
    });
};

exports.HardBreak = HardBreak;
exports.Heading = Heading;
exports.HorizontalRule = HorizontalRule;
exports.Markup = Markup;
exports.Set = Set;
exports.Tag = Tag;
exports.Text = Text;
exports.Utility = Utility;
exports["default"] = Bard;
//# sourceMappingURL=index.js.map
