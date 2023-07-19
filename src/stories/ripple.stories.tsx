import React, { useState } from 'react';
import { within } from '@storybook/testing-library';
import { fireEvent } from '../global/testLib';
import { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';

import { Ripple } from '../components/ripple/ripple';
import { Wave } from '../components/ripple/wave';

import { Blue } from '../global/enum';

export default {
    title: 'Example/Ripple',
    component: Ripple,
    argTypes: {
        prefixCls: {
            control: false,
        },
        color: {
            control: false,
        }
    },

} as Meta<typeof Ripple>;

type Story = StoryObj<typeof Ripple>;

const TestDefault = () => {
    const [focused, setFocused] = useState(false);

    function handleClick() {
        if (focused === true) {
            setFocused(false);
        } else {
            setFocused(true);
        }
    }

    return (
        <>
            <div style={{ position: 'relative', width: '100px', height: '100px', border: '1px solid #ababab' }}>
                <Ripple
                    focused={focused}
                    color={{
                        focusColor: Blue.primary,
                        waveColor: Blue.wave
                    }}
                />
            </div >
            <button onClick={handleClick}>Change Focused</button>
        </>
    );
}

export const DefaultTest: Story = {
    args: {
        focused: false,
        color: {
            focusColor: Blue.primary,
            waveColor: Blue.wave
        }
    },
    render: () => <TestDefault />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        //测试wave部件
        await fireEvent.mouseDown(canvas.getByTestId('litten-ripple'));

        await expect(
            canvas.getByTestId('litten-ripple__wave')
        ).toBeInTheDocument();

        await fireEvent.animationStart(canvas.getByTestId('litten-ripple__wave'));
        await fireEvent.animationEnd(canvas.getByTestId('litten-ripple__wave'));

        await fireEvent.mouseUp(canvas.getByTestId('litten-ripple'));

        await expect(
            canvas.queryByTestId('litten-ripple__wave')
        ).not.toBeInTheDocument();

        await fireEvent.mouseOver(canvas.getByTestId('litten-ripple'));
        await fireEvent.mouseOut(canvas.getByTestId('litten-ripple'));

        //测试focused部件
        await fireEvent.click(canvas.getByText('Change Focused'));

        await expect(
            canvas.getByTestId('litten-ripple__focus')
        ).toBeInTheDocument();

        await fireEvent.click(canvas.getByText('Change Focused'));

        await expect(
            canvas.queryByTestId('litten-ripple__focus')
        ).not.toBeInTheDocument();

    }
};

const TestWave = () => {
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
                        focusColor: Blue.primary,
                        waveColor: Blue.wave
                    }}
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
                    color={{
                        focusColor: Blue.primary,
                        waveColor: Blue.wave
                    }}
                />
                <p>State:{state}</p>
            </div>
        </>
    )
}

export const WaveTest: Story = {
    render: () => <TestWave />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await fireEvent.mouseDown(canvas.getByTestId('parent'));

        await fireEvent.animationStart(canvas.queryAllByTestId('litten-ripple__wave')[0]);
        await fireEvent.animationEnd(canvas.queryAllByTestId('litten-ripple__wave')[0]);

        await expect(
            canvas.getByText('State:0Animation end')
        ).toBeInTheDocument();

        await fireEvent.mouseUp(canvas.getByTestId('parent'));

        await expect(
            canvas.getByText('State:MouseUp')
        ).toBeInTheDocument();
    }
};