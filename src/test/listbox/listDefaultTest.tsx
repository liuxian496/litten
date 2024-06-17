import React from "react";

import { ListboxStory } from "../../stories/listbox.stories";

import { Listbox } from "../../components/listbox/listbox";
import { ListItem } from "../../components/listItem/listItem";

const Test = () => {
    return (
        <>
            <Listbox>
                <ListItem value="a" label="a" />
                <ListItem value="b" label="b" />
                <ListItem value="c" label="c" />
                <ListItem value="d" label="d" />
                <ListItem value="e" label="e" />
                <ListItem value="f" label="f" />
                <ListItem value="g" label="g" />
                <ListItem value="h" label="h" />
                <ListItem value="i" label="i" />
            </Listbox>
        </>
    );
};

export const DefaultTest: ListboxStory = {
    render: () => <Test />,
};
