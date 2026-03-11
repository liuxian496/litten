import { Orientation } from 'litten-hooks';
import { expect } from 'storybook/test';

import { getThumbDisplacement } from '../../components/slider/sliderBase';
import { SliderStory } from '../../stories/slider.stories';

export const BaseBranchTest: SliderStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <div>slider base branch test</div>,
  play: async ({ step }) => {
    await step('Cover horizontal orientation and bounds.', async () => {
      const negative = getThumbDisplacement(
        { left: -3, top: 10, targetWidth: 100, targetHeight: 50 } as any,
        Orientation.horizontal
      );
      const overflow = getThumbDisplacement(
        { left: 150, top: 10, targetWidth: 100, targetHeight: 50 } as any,
        Orientation.horizontal
      );

      await expect(negative).toBe(0);
      await expect(overflow).toBe(100);
    });

    await step('Cover vertical orientation and bounds.', async () => {
      const normal = getThumbDisplacement(
        { left: 10, top: 30, targetWidth: 120, targetHeight: 80 } as any,
        Orientation.vertical
      );
      const overflow = getThumbDisplacement(
        { left: 10, top: 120, targetWidth: 120, targetHeight: 80 } as any,
        Orientation.vertical
      );

      await expect(normal).toBe(30);
      await expect(overflow).toBe(80);
    });
  },
};
