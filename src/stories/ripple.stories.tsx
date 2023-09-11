import { Meta, StoryObj } from "@storybook/react";

import { Ripple } from "../components/ripple/ripple";

import { DefaultTest } from "../test/ripple/rippleDefaultTest";
import { WaveTest } from "../test/ripple/waveTest";
import { WaveCenterTest } from "../test/ripple/waveCenter";

export default {
    title: "Example/Ripple",
    component: Ripple,
    argTypes: {
        prefixCls: {
            control: false,
        },
        color: {
            control: false,
        },
    },
} as Meta<typeof Ripple>;

export type RippleStory = StoryObj<typeof Ripple>;

export const Default = DefaultTest;

export const WaveNormal = WaveTest;

export const WaveCenter = WaveCenterTest;
