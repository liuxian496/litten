import { expect, userEvent, within } from 'storybook/test';

import { CheckboxStory } from '../../stories/checkbox.stories';

import { Checkbox } from '../../components/checkbox/checkbox';
import { FormLabel } from '../../components/formLabel/formLabel';
import { StackPanel } from '../../components/stackPanel/stackPanel';

const Test = () => {
  return (
    <StackPanel direction="column" alignItems="flex-start">
      <FormLabel data-testid="switch" label="switch">
        <Checkbox data-testid="checkbox" value="switch" defaultChecked={true} />
      </FormLabel>
    </StackPanel>
  );
};

export const UnControlledTest: CheckboxStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByTestId('checkbox') as HTMLInputElement;

    await step('Switch Checkbox is default checked.', async () => {
      await expect(checkbox).toBeChecked();
    });

    await step(
      'Click the Switch Checkbox. Then it should not be checked.',
      async () => {
        await userEvent.click(canvas.getByTestId('checkbox'));
        await expect(checkbox).not.toBeChecked();
      }
    );
  },
};
