import { expect } from 'storybook/test';

import {
  getListItem,
  getNextMultiSelectedValue,
} from '../../components/listbox/listboxBase';
import { ListGroup } from '../../components/listGroup/listGroup';
import { ListItem } from '../../components/listItem/listItem';
import { ListboxStory } from '../../stories/listbox.stories';

export const GetListItemTest: ListboxStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <div>listbox base branch test</div>,
  play: async ({ step }) => {
    await step('Cover ListItem and ListGroup recursion branch.', async () => {
      const list: Array<{ value: string; label: string; disabled?: boolean }> =
        [];

      getListItem(list, [
        undefined,
        null,
        <ListItem value="single" label="single" />,
        <ListGroup>
          <ListItem value="nested" label="nested" />
        </ListGroup>,
        <button>not a list item</button>,
      ]);

      await expect(list.length).toBe(2);
      await expect(list[0].value).toBe('single');
      await expect(list[1].value).toBe('nested');
    });

    await step(
      'Cover non-array guard branch in multi selected helper.',
      async () => {
        const result = getNextMultiSelectedValue(undefined, 'a');
        await expect(result).toBeUndefined();
      }
    );
  },
};
