import React from 'react';
import * as ReactDOM from 'react-dom';
import { HorizontalRule } from '../src/index';

describe('HardBreak component test', () => {
    let container: HTMLDivElement
    
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<HorizontalRule />, container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    test('Expect HorizontalRule to return a self closing hr tag', () => {
        expect(HorizontalRule()).toStrictEqual(<hr/>)
    })
})
