import { Meta, StoryObj } from '@storybook/react-vite';

import { I18N as I18NTest } from '../test/local/i18N.test';
import { Localization as LocalizationTest } from '../test/local/localization.test';

export default {
  title: 'Example/Local',
} as Meta;

export type LocalStory = StoryObj;

export const I18N: LocalStory = {
  name: 'I18N',
  ...I18NTest,
};

export const Localization: LocalStory = {
  name: 'Localization',
  ...LocalizationTest,
};
