import React, { ChangeEvent, useState } from 'react';
import { waitFor, within } from '@storybook/testing-library';
import { userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { Meta, StoryObj } from '@storybook/react';

import { TextField } from '../components/textField/textField';
import { Button } from '../components/button/button';
import { Mode } from '../global/enum';
import { LittenEvent } from '../components/control/control.types';

export default {
  title: 'Example/TextField',
  component: TextField,
  argTypes: {
    prefixCls: {
      control: false,
    },
    color: {
      control: false,
    }
  },

} as Meta<typeof TextField>;

type Story = StoryObj<typeof TextField>;

const TestDefault = () => {
  const [value, setValue] = useState('');
  const [targetValue, setTargetValue] = useState<string | undefined>('');

  function handleChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
    const { e, value } = event;

    setTargetValue(e?.target.value);
    setValue(value);
  }

  function handleTestClick() {
    setValue('100');
  }


  return (
    <>
      <div>
        <TextField value={value} defaultValue="nihao" onChange={handleChange} />
        <TextField disabled defaultValue='2233' style={{ marginLeft: '10px', marginRight: '10px' }} />
        <Button mode={Mode.primary} onClick={handleTestClick}>Set value to 100</Button>
      </div>
      <div>{`value is: ${value}`}</div>
      <div>{`e.target.value is: ${targetValue}`}</div>
    </>
  );
}

export const DefaultTest: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {},
  render: () => <TestDefault />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  }
};

const TestFocus = () => {
  const [msg, setMsg] = useState('');

  function handleFocus() {
    setMsg('TextField is focused');
  }

  function handleBlur() {
    setMsg('TextField is blur');
  }

  return (
    <>
      <TextField data-testid="submitField" onFocus={handleFocus} onBlur={handleBlur} />
      <Button mode={Mode.primary} style={{ marginLeft: "15px" }}>Submit</Button>
      <p>
        {msg}
      </p>
    </>
  )
}

export const FocusTest: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <TestFocus />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('TextField is focused', async () => {
      await userEvent.click(canvas.getByTestId('submitField'));

      await waitFor(() => expect(
        canvas.getByText("TextField is focused")
      ).toBeInTheDocument());
    });

    await step('TextField is blur', async () => {
      await userEvent.click(canvas.getByText('Submit'));

      await waitFor(() => expect(
        canvas.getByText("TextField is blur")
      ).toBeInTheDocument());
    });
  }
}

const TestValue = () => {
  const [msg, setMsg] = useState<string | undefined>('');

  function handleChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
    const { e } = event;
    setMsg(e?.target.value);
  }

  return (
    <>
      <TextField data-testid="text" onChange={handleChange} />
      <Button mode={Mode.primary} style={{ marginLeft: "15px" }}>Submit</Button>
      <p>
        Value:{msg}
      </p>
    </>
  )
}

export const ValueTest: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <TestValue />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('"Value:Tom" to be in the document', async () => {
      await userEvent.type(canvas.getByTestId('text'), 'Tom');

      await expect(
        canvas.getByText("Value:Tom")
      ).toBeInTheDocument();
    });


    await step('"Value:Tom&Jerry" to be in the document', async () => {
      await userEvent.type(canvas.getByTestId('text'), '&Jerry');

      await expect(
        canvas.getByText("Value:Tom&Jerry")
      ).toBeInTheDocument();
    });
  }
}