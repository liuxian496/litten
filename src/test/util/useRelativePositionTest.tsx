import React, { useEffect, useRef } from "react";

import { UtilStory } from "../../stories/util.stories";

import { useRelativePosition } from "../../components/control/control";
import { fireEvent, userEvent, within } from "@storybook/testing-library";
import { Button } from "../../components/button/button";
import { StackPanel } from "../../components/stackPanel/stackPanel";

const Test = () => {
    const divRef = useRef<HTMLDivElement>(null);

    const [rect, startMeasure] = useRelativePosition(divRef);

    function handleDivMouseDown() {
        startMeasure();
    }

    return (
        <>
            <StackPanel justifyContent="center">
                <div
                    data-testid="container"
                    ref={divRef}
                    style={{
                        width: 300,
                        height: 300,
                        boxSizing: "border-box",
                        border: "1px solid orange",
                    }}
                    onMouseDown={handleDivMouseDown}
                ></div>
            </StackPanel>
            <div>{`left: ${rect.left}`}</div>
            <div>{`right: ${rect.right}`}</div>
            <div>{`top: ${rect.top}`}</div>
            <div>{`bottom: ${rect.bottom}`}</div>
            <div>{`targetWidth: ${rect.targetWidth}`}</div>
            <div>{`targetHeight: ${rect.targetHeight}`}</div>
        </>
    );
};

export const UseRelativePositionTest: UtilStory = {
    render: () => <Test />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const container = canvas.getByTestId("container");

        await fireEvent.mouseDown(container);
        await fireEvent.mouseMove(document);
        await fireEvent.mouseUp(document);
    },
};
