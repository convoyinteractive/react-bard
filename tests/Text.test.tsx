import React from 'react';
import * as ReactDOM from 'react-dom';
import { Text } from '../src/index';

describe('Text component test', () => {
    let container: HTMLDivElement

    const testProps = {
        "marks": [
            {
                "type": "bold"
            }
        ],
        "text": "No, the word is very near."
    };

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Text />, container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    test('Expect Text component with mark type "bold" to return strong tag ', () => {
        expect(Text(testProps)).toStrictEqual(<strong>No, the word is very near.</strong>)
    })
})
