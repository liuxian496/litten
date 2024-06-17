import { Meta, StoryObj } from "@storybook/react";

import { Listbox } from "../components/listbox/listbox";

import { DefaultTest } from "../test/listbox/listDefaultTest";
import { MultiTest } from "../test/listbox/listMultiTest";
import { MultiValueNotArrayTest } from "../test/listbox/listMultiValueNotArrayTest";
import { ListboxKeyboardTest } from "../test/listbox/listboxKeyboardTest";
import { UndefinedTest } from "../test/listbox/listboxValueUndefinedTest";
import { SelectAllTest } from "../test/listbox/listboxSelectAllTest";
import { ControlledTest } from "../test/listbox/listboxControledlTest";
import { ListboxWithFormTest } from "../test/listbox/listboxWithFormTest";

const meta: Meta<typeof Listbox> = {
    title: "Example/Listbox",
    component: Listbox,
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        prefixCls: {
            control: false,
        },
        style: {
            control: false,
        },
    },
    parameters: {
        controls: {
            expanded: true,
            sort: "requiredFirst",
        },
    },
};

export default meta;
export type ListboxStory = StoryObj<typeof Listbox>;

export const Default = DefaultTest;
export const Controlled = ControlledTest;
export const Keyboard = ListboxKeyboardTest;
export const MultiSelection = MultiTest;
export const MultiValueNotArray = {
    name: "Value is not array with multi mode",
    ...MultiValueNotArrayTest,
};

export const SelectAll = SelectAllTest;

export const Undefined = {
    name: "Without value and defaultValue",
    ...UndefinedTest,
};

export const ListboxWithForm = {
    name: "With Form",
    ...ListboxWithFormTest,  
}
