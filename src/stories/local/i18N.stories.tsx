
import { Meta, StoryObj } from '@storybook/react';

import { Localization } from './localizationTest';
import { I18N } from './i18NTest';


export default {
  title: 'Example/Local',
} as Meta<typeof Object>;

export type LocalStory = StoryObj<typeof Object>;

export {
  I18N,
  Localization,
};
