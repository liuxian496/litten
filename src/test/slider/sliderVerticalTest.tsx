import { useState } from 'react';

import { Orientation } from 'litten-hooks';
import { LittenNumberChangeEvent } from 'litten-hooks/dist/control/event/littenEvent.types';

import { expect, fireEvent, userEvent, within } from 'storybook/test';
import { SliderStory } from '../../stories/slider.stories';

import { Slider } from '../../components/slider/slider';
import { StackPanel } from '../../components/stackPanel/stackPanel';

const Test = () => {
  const [value, setValue] = useState(50);

  function handleSliderChange(event: LittenNumberChangeEvent) {
    setValue(event.value || 0);
  }

  return (
    <div>
      <StackPanel style={{ height: 200 }}>
        <Slider
          data-testid="volumeSlider"
          orientation={Orientation.vertical}
          onChange={handleSliderChange}
        />
      </StackPanel>
      <div style={{ marginTop: 20 }}>volume is {value}</div>
    </div>
  );
};

export const VerticalTest: SliderStory = {
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const volumeSlider = canvas.getByTestId('volumeSlider');

    await step('"volume" slider default value is 50.', async () => {
      await expect(volumeSlider).toHaveValue('50');

      await expect(await canvas.getByText('volume is 50')).toBeInTheDocument();
    });

    await step(
      'Change "volume" Slider to 66, then "volume is 66".',
      async () => {
        await fireEvent.change(volumeSlider, {
          target: {
            value: 66,
          },
        });
        await expect(volumeSlider).toHaveValue('66');

        await expect(
          await canvas.findByText('volume is 66')
        ).toBeInTheDocument();
      }
    );

    await step(
      'Click slider track with pointer to trigger position measuring path.',
      async () => {
        await userEvent.pointer({
          target: volumeSlider,
          keys: '[MouseLeft]',
          coords: {
            clientX: 26,
            clientY: 149,
          },
        });

        await expect(volumeSlider).not.toHaveValue('66');
      }
    );

    await step(
      'Click slider near the bottom to cover clamp path.',
      async () => {
        await userEvent.pointer({
          target: volumeSlider,
          keys: '[MouseLeft]',
          coords: {
            clientX: 26,
            clientY: 300,
          },
        });

        await expect(volumeSlider).toHaveValue('0');
      }
    );
  },
};
