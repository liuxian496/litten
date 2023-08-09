import React, { useState } from 'react';
import { fireEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../components/button/button';
import { getPrefixNs } from '../../components/control/control';
import { handleMouseStopPropagation, printArrayItem, usePrevious } from '../../global/util';
import { Mode } from '../../global/enum';
import { GetPrefixNsTest } from './getPrefixNsTest';
import { PrintArrayItemTest } from './printArrayItemTest';
import { StopPropagationTest } from './stopPropagationTest';
import { UsePreviousTest } from './usePreviousTest';


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