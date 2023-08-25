import { Meta, StoryObj } from '@storybook/react';

import { GetPrefixNsTest } from '../test/util/getPrefixNsTest';
import { PrintArrayItemTest } from '../test/util/printArrayItemTest';
import { StopPropagationTest } from '../test/util/stopPropagationTest';
import { UsePreviousTest } from '../test/util/usePreviousTest';


export default {
    title: 'Example/Util',
} as Meta;

export type UtilStory = StoryObj;

export const GetPrefixNs = {
    name: 'getPrefixNs',
    ...GetPrefixNsTest
};

export const PrintArrayItem = {
    name: 'printArrayItem',
    ...PrintArrayItemTest
};

export const StopPropagation = {
    name: 'stopPropagation',
    ...StopPropagationTest
};

export const UsePrevious = {
    name: 'usePrevious',
    ...UsePreviousTest
};
