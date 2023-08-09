
import { Meta, StoryObj } from '@storybook/react';

import { Form } from '../components/form/form';

import { Default } from '../test/form/default.test';
import { DuplicateValuePathTest } from '../test/form/duplicateValuePath.test';
import { MultiFormTest } from '../test/form/multiForm.test';
import { UseFormTest } from '../test/form/useForm.test';

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