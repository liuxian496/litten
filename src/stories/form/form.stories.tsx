
import { Meta, StoryObj } from '@storybook/react';

import { Form } from '../../components/form/form';

import { Default } from './defaultTest';
import { DuplicateValuePathTest } from './duplicateValuePathTest';
import { MultiFormTest } from './multiFormTest';
import { UseFormTest } from './useFormTest';

export default {
    title: 'Example/Form',
    component: Form,
    argTypes: {
        rippleColor: {
            control: false,
        },
        prefixCls: {
            control: false,
        },
        tabindex: {
            table: {
                disable: true,
            },
        },
        //在示例文档中移除children属性的显示
        children: {
            table: {
                disable: true,
            },
        }
    },

} as Meta<typeof Form>;

export type FormStory = StoryObj<typeof Form>;

export {
    Default,
    DuplicateValuePathTest,
    MultiFormTest,
    UseFormTest
};