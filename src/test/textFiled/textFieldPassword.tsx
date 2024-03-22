import React, { useState } from "react";

// import { userEvent, waitFor, within } from "@storybook/test";

import { TextFiledStory } from "../../stories/textField.stories";

import { TextFieldType } from "../../global/enum";
import { LittenTextChangeEvent } from "../../components/control/littenEvent.types";
import { FormLabel } from "../../components/formLabel/formLabel";
import { TextField } from "../../components/textField/textField";
import { TextFieldValue } from "../../components/textField/textField.types";

const Test = () => {
    const [password, setPassword] = useState<TextFieldValue>();

    function handlePasswordChange(event: LittenTextChangeEvent) {
        const { value } = event;
        setPassword(value);
    }

    return (
        <>
            <FormLabel label="Password:">
                <TextField
                    type={TextFieldType.password}
                    onChange={handlePasswordChange}
                    placeholder="Please input password"
                />
            </FormLabel>
            <div>{`Password: ${password}`}</div>
        </>
    );
};

export const PasswordTest: TextFiledStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
};
