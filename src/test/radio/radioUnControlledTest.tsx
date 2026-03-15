import { useRef, useState } from 'react';

import { expect, userEvent, within } from 'storybook/test';

import { RadioStory } from '../../stories/radio.stories';

import { LittenCheckedChangeEvent } from 'litten-hooks/dist/control/event/littenEvent.types';
import { Placement } from 'litten-hooks/dist/enum';

import { Button } from '../../components/button/button';
import { FormLabel } from '../../components/formLabel/formLabel';
import { Radio } from '../../components/radio/radio';
import { StackPanel } from '../../components/stackPanel/stackPanel';

const Test = () => {
  const appleRef = useRef<HTMLInputElement>(null);
  const bananaRef = useRef<HTMLInputElement>(null);
  const peachRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string | undefined>('banana');

  function handleChange(e: LittenCheckedChangeEvent) {
    const { checked, value } = e;
    if (checked === true) {
      setValue(value);
    }
  }

  function handleClick() {
    setValue(
      `Checked by Ref: ${appleRef.current?.checked ? 'apple' : ''} ${
        bananaRef.current?.checked ? 'banana' : ''
      } ${peachRef.current?.checked ? 'peach' : ''}`
    );
  }

  return (
    <StackPanel direction="column" alignItems="flex-start">
      <FormLabel label="Apple" labelPlacement={Placement.right}>
        <Radio
          ref={appleRef}
          data-testid="apple"
          name="fruit"
          value="apple"
          onChange={handleChange}
        />
      </FormLabel>
      <FormLabel label="Banana" labelPlacement={Placement.right}>
        <Radio
          ref={bananaRef}
          data-testid="banana"
          name="fruit"
          value="banana"
          defaultChecked
          onChange={handleChange}
        />
      </FormLabel>
      <FormLabel label="Peach" labelPlacement={Placement.right}>
        <Radio
          ref={peachRef}
          data-testid="peach"
          name="fruit"
          value="peach"
          onChange={handleChange}
        />
      </FormLabel>
      <Button onClick={handleClick}>Get Checked By Ref</Button>
      <div>{`${value} is checked`}</div>
    </StackPanel>
  );
};

export const UnControlledTest: RadioStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const appleRadio = canvas.getByTestId('apple');
    const bananaRadio = canvas.getByTestId('banana');
    const peachRadio = canvas.getByTestId('peach');

    await step(
      'Banana is default checked, other radios are unchecked',
      async () => {
        await expect(appleRadio).not.toBeChecked();

        await expect(bananaRadio).toBeChecked();

        await expect(peachRadio).not.toBeChecked();

        await expect(
          await bananaRadio.parentElement?.parentElement
        ).toBeInTheDocument();

        const parent = bananaRadio.parentElement?.parentElement as HTMLElement;

        await expect(
          await canvas.findByTestId('radioCheckedIcon-fruit-banana')
        ).toBeInTheDocument();

        const checkedIcon = canvas.getByTestId('radioCheckedIcon-fruit-banana');

        await expect(parent).toContainElement(checkedIcon);

        await expect(
          await canvas.findByText('banana is checked')
        ).toBeInTheDocument();
      }
    );

    await step(
      'Click "peach" radio, except peach is checked, other radios are unchecked',
      async () => {
        await userEvent.click(peachRadio);

        await expect(appleRadio).not.toBeChecked();

        await expect(bananaRadio).not.toBeChecked();

        await expect(peachRadio).toBeChecked();

        await expect(
          await canvas.findByText('peach is checked')
        ).toBeInTheDocument();
      }
    );

    await step(
      'Click "apple" radio, except apple is checked, other radios are unchecked',
      async () => {
        await userEvent.click(appleRadio);

        await expect(appleRadio).toBeChecked();

        await expect(bananaRadio).not.toBeChecked();

        await expect(peachRadio).not.toBeChecked();

        await expect(
          await canvas.findByText('apple is checked')
        ).toBeInTheDocument();
      }
    );

    await step(
      'Click "Get Checked By Ref" button. Then "Checked by Ref: apple is checked" to be in the document.',
      async () => {
        const button = canvas.getByRole('button', {
          name: 'Get Checked By Ref',
        });
        await userEvent.click(button);

        await expect(
          await canvas.findByText('Checked by Ref: apple is checked')
        ).toBeInTheDocument();
      }
    );
  },
};
