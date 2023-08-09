import { Meta, StoryObj } from '@storybook/react';
import { Default } from './defaultTest';

import { IconButton } from '../../components/iconButton/iconButton';

export default {
  title: 'Example/IconButton',
  component: IconButton,
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
    },
    onClick: {
      action: '点击'
    },
  },

} as Meta<typeof IconButton>;

export type IconStoryStory = StoryObj<typeof IconButton>;

export { Default }