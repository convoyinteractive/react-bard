import React from 'react';
import * as ReactDOM from 'react-dom';
import { HardBreak } from '../src/index';

describe('HardBreak component test', () => {
    let container: HTMLDivElement
    
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<HardBreak />, container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    test('Expect HardBreak to return a self closing hr tag', () => {
        expect(HardBreak()).toStrictEqual(<br/>)
    })
})
