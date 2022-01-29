Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

var makeTag = function (type) {
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
    if (Object.keys(availableTags).includes(type)) {
        return availableTags[type];
    }
    console.error("react-bard: Type \"".concat(type, "\" not supported"));
    return null;
};
var makeKey = function () { return Math.random().toString(36).substr(2, 8); };
var Bard = function (_a) {
    var data = _a.data, sets = _a.sets;
    var components = {
        heading: Heading,
        horizontal_rule: HorizontalRule,
        text: Text,
        set: Set,
    };
    return data.map(function (item) {
        var Component = components[item.type] || Utility;
        var key = makeKey();
        return (React__default["default"].createElement(Component, __assign({}, item, { sets: sets, key: key })));
    });
};
var Text = function (_a) {
    var _b = _a.marks, marks = _b === void 0 ? [] : _b, text = _a.text;
    var output = text;
    var Markup = function (_a) {
        var type = _a.type, attrs = _a.attrs, children = _a.children;
        var Tag = makeTag(type);
        return Tag ? (React__default["default"].createElement(Tag, __assign({}, attrs), children)) : null;
    };
    marks.forEach(function (_a) {
        var type = _a.type, attrs = _a.attrs;
        return output = (React__default["default"].createElement(Markup, { type: type, attrs: attrs }, output));
    });
    return output;
};
var Utility = function (_a) {
    var _b = _a.content, content = _b === void 0 ? [] : _b, type = _a.type;
    var Tag = makeTag(type);
    return Tag ? (React__default["default"].createElement(Tag, null,
        React__default["default"].createElement(Bard, { data: content }))) : null;
};
var Set = function (_a) {
    var attrs = _a.attrs, sets = _a.sets;
    var values = attrs.values;
    var Component = sets[values.type];
    return React__default["default"].createElement(Component, __assign({}, values));
};
var Heading = function (_a) {
    var attrs = _a.attrs, content = _a.content;
    var Tag = "h" + attrs.level;
    return (React__default["default"].createElement(Tag, null,
        React__default["default"].createElement(Bard, { data: content })));
};
var HorizontalRule = function () { return (React__default["default"].createElement("hr", null)); };

exports["default"] = Bard;
//# sourceMappingURL=index.js.map
