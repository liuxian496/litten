import React, { useState } from "react";

import { fireEvent, within, expect } from "@storybook/test";

import { UtilStory } from "../../stories/util.stories";

import { Mode } from "../../global/enum";
import { handleMouseStopPropagation } from "../../global/util";
import { Button } from "../../components/button/button";

const Test = () => {
    const [text, setText] = useState("");

    function handleDivClick() {
        setText("div clicked");
    }

    function handleStopClick(e: React.MouseEvent) {
        handleMouseStopPropagation(e);
    }

    return (
        <>
            <div onClick={handleDivClick}>
                <Button onClick={handleStopClick} mode={Mode.primary}>
                    Stop Propagation
                </Button>
                <Button>Normal</Button>
            </div>
            <div>{text}</div>
        </>
    );
};

export const StopPropagationTest: UtilStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await fireEvent.click(canvas.getByText("Stop Propagation"));

        await expect(canvas.queryByText("div clicked")).not.toBeInTheDocument();

        await fireEvent.click(canvas.getByText("Normal"));

        await expect(canvas.getByText("div clicked")).toBeInTheDocument();
    },
};
