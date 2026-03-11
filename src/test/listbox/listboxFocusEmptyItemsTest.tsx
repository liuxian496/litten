import { expect, userEvent, within } from 'storybook/test';

import { Listbox } from '../../components/listbox/listbox';
import { ListboxStory } from '../../stories/listbox.stories';

const Test = () => {
  return (
    <div>
      <button type="button">Before</button>
      <Listbox data-testid="empty-listbox" />
      <button type="button">After</button>
    </div>
  );
};

export const FocusEmptyItemsTest: ListboxStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const beforeButton = canvas.getByText('Before');

    await step('Click before button and focus empty listbox', async () => {
      await userEvent.click(beforeButton);
      await userEvent.tab();

      const listbox = await canvas.findByRole('listbox');
      await expect(listbox).toHaveFocus();
      await expect(listbox).toBeInTheDocument();
    });
  },
};
