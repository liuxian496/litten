import React from "react";

import { SliderStory } from "../../stories/slider.stories";

import { Size } from "../../global/enum";

import { StackPanel } from "../../components/stackPanel/stackPanel";
import { Slider } from "../../components/slider/slider";

export const VolumeDownFillIcon = () => {
    return (
        <svg
            className="litten-svg"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 16 16"
            style={{ fontSize: "2em", marginRight: "10px" }}
        >
            <path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4zm3.025 4a4.486 4.486 0 0 1-1.318 3.182L10 10.475A3.489 3.489 0 0 0 11.025 8 3.49 3.49 0 0 0 10 5.525l.707-.707A4.486 4.486 0 0 1 12.025 8z" />
        </svg>
    );
};

export const VolumeUpFillIcon = () => {
    return (
        <svg
            className="litten-svg"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{ fontSize: "2em", marginLeft: "10px" }}
        >
            <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
            <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
        </svg>
    );
};

export const DefaultTest: SliderStory = {
    args: {
        disabled: false,
        loading: false,
        min: 0,
        max: 100,
        size: Size.medium,
    },
    render: (args) => {
        return (
            <div>
                <StackPanel alignItems="center">
                    <VolumeDownFillIcon />
                    <StackPanel style={{ width: 200 }}>
                        <Slider {...args} />
                    </StackPanel>
                    <VolumeUpFillIcon />
                </StackPanel>
            </div>
        );
    },
};
