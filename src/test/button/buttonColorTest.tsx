import React from 'react';

import { ButtonStory } from "../../stories/button.stories";

import { Color, Green, Mode, Orange, Red } from '../../global/enum';
import { Button } from '../../components/button/button';

export const ColorTest: ButtonStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => {
        return (
            <>
                <div style={{ color: Red.dark }}>Danger</div>
                <Button color={Color.danger}>Text</Button>
                <Button color={Color.danger} disabled style={{ marginLeft: "16px" }}>Text</Button>
                <Button color={Color.danger} mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
                <Button color={Color.danger} disabled mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
                <Button color={Color.danger} mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
                <Button color={Color.danger} disabled mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
                <div style={{ color: Green.dark }}>Success</div>
                <Button color={Color.success}>Text</Button>
                <Button color={Color.success} disabled style={{ marginLeft: "16px" }}>Text</Button>
                <Button color={Color.success} mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
                <Button color={Color.success} disabled mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
                <Button color={Color.success} mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
                <Button color={Color.success} disabled mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
                <div style={{ color: Orange.dark }}>Warning</div>
                <Button color={Color.warning}>Text</Button>
                <Button color={Color.warning} disabled style={{ marginLeft: "16px" }}>Text</Button>
                <Button color={Color.warning} mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
                <Button color={Color.warning} disabled mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
                <Button color={Color.warning} mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
                <Button color={Color.warning} disabled mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
            </>
        )
    }
}