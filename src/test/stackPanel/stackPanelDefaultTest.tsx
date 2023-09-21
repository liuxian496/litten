import React from "react";

import { StackPanelStory } from "../../stories/stackPanel.stories";

import { StackPanel } from "../../components/stackPanel/stackPanel";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Checkbox } from "../../components/checkbox/checkbox";
import { Placement } from "../../global/enum";

export const DefaultTest: StackPanelStory = {
    args: {},
    render: (args) => {
        const { direction } = args;
        return (
            <>
                <div>{`${direction}:`}</div>
                <StackPanel {...args}>
                    <FormLabel
                        label="红烧鸡翅"
                        labelPlacement={Placement.right}
                    >
                        <Checkbox defaultChecked={true} />
                    </FormLabel>
                    <FormLabel
                        label="糖醋排骨"
                        labelPlacement={Placement.right}
                    >
                        <Checkbox defaultChecked={true} />
                    </FormLabel>
                    <FormLabel
                        label="干煸四季豆"
                        labelPlacement={Placement.right}
                    >
                        <Checkbox defaultChecked={true} />
                    </FormLabel>
                    <FormLabel
                        label="西红柿鸡蛋汤"
                        labelPlacement={Placement.right}
                    >
                        <Checkbox defaultChecked={true} />
                    </FormLabel>
                </StackPanel>
            </>
        );
    },
};
