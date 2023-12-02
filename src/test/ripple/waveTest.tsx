import React, { useState } from 'react';

import { fireEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { RippleStory } from '../../stories/ripple.stories';

import { Blue, WaveMode } from '../../global/enum';
import { Wave } from '../../components/ripple/wave';

const Test = () => {
    const [isPressed, setIsPressed] = useState(false);
    const [state, setState] = useState('');

    function handleWaveAnimationEnd(index: number) {
        setState(index + 'Animation end')
    }

    function handleMouseDown() {
        setIsPressed(true);
    }

    function handleMouseUp() {
        setIsPressed(false);
        setState('MouseUp')
    }

    return (
        <>
            <div data-testid="parent" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} style={{ position: 'relative', width: '300px', height: '300px', border: '1px solid #ababab' }}>
                <Wave
                    index={0}
                    prefixCls='litten-ripple'
                    isPressed={isPressed}
                    containerSpanWidth={76}
                    containerSpanHeight={37}
                    mouseClientX={19}
                    mouseClientY={39}
                    parentOffsetLeft={16}
                    parentOffsetTop={16}
                    color={{
                        focusColor: Blue.focus,
                        waveColor: Blue.deepLight
                    }}
                    waveMode={WaveMode.normal}
                    onWaveAnimationEnd={handleWaveAnimationEnd}
                />
                <Wave
                    index={1}
                    prefixCls='litten-ripple'
                    isPressed={isPressed}
                    containerSpanWidth={84}
                    containerSpanHeight={37}
                    mouseClientX={238}
                    mouseClientY={21}
                    parentOffsetLeft={192}
                    parentOffsetTop={16}
                    waveMode={WaveMode.normal}
                    color={{
                        focusColor: Blue.focus,
                        waveColor: Blue.deepLight
                    }}
                />
                <p>State:{state}</p>
            </div>
        </>
    )
}

export const WaveTest: RippleStory = {
    render: () => <Test />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await fireEvent.mouseDown(canvas.getByTestId('parent'));

        await fireEvent.animationStart(canvas.queryAllByTestId('litten-ripple__wave')[0]);
        await fireEvent.animationEnd(canvas.queryAllByTestId('litten-ripple__wave')[0]);

        await expect(
            await canvas.findByText('State:0Animation end')
        ).toBeInTheDocument();


        await fireEvent.mouseUp(canvas.getByTestId('parent'));

        await expect(
            canvas.getByText('State:MouseUp')
        ).toBeInTheDocument();
    }
};