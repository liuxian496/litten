import React from "react";

import { ButtonStory } from "../../stories/button.stories";

import { Mode, Size } from "../../global/enum";
import { Listbox } from "../../components/listbox/listbox";
import { ListGroup } from "../../components/listGroup/listGroup";
import { ListItem } from "../../components/listItem/listItem";

const Test = () => {
    return (
        <>
            <Listbox defaultValue="a" multiple>
                <ListGroup>
                    <ListItem value="a" label="a" />
                    <ListItem value="b" label="b" />
                    <ListItem value="c" label="c" disabled>
                        c
                    </ListItem>
                    <ListItem value="d" label="d" />
                    <ListItem value="e" label="e" />
                </ListGroup>
                <ListItem value="f" label="f" />
                <ListItem value="g" label="g" />
                <ListItem value="h" label="h" />
                <ListItem value="i" label="i" />
            </Listbox>
        </>
    );
};

export const MultiValueNotArrayTest: ButtonStory = {
    args: {
        mode: Mode.primary,
        size: Size.medium,
        disabled: false,
        loading: false,
    },
    render: () => <Test />,
};
