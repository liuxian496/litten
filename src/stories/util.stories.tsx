import { Meta, StoryObj } from '@storybook/react';

import { GetPrefixNsTest } from '../test/util/getPrefixNs.test';
import { PrintArrayItemTest } from '../test/util/printArrayItem.test';
import { StopPropagationTest } from '../test/util/stopPropagation.test';
import { UsePreviousTest } from '../test/util/usePrevious.test';


export default {
    title: 'Example/Util',
} as Meta;

export type UtilStory = StoryObj;

export {
    GetPrefixNsTest,
    PrintArrayItemTest,
    StopPropagationTest,
    UsePreviousTest,
}