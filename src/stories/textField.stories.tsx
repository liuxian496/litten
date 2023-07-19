import React, { ChangeEvent, useState } from 'react';
import { within } from '@storybook/testing-library';
import { fireEvent } from '../global/testLib';
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
  const [previousValue, setPreviousValue] = useState('');
  const [targetValue, setTargetValue] = useState<string | undefined>('');


  function handleChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
    const { e, previousValue, value } = event;

    setTargetValue(e?.target.value);
    setValue(value);
    setPreviousValue(previousValue);
  }

  function handleTestClick() {
    setValue('100');
  }

  return (
    <>
      <div>
        <TextField value={value} onChange={handleChange} />
        <TextField disabled value='123123' style={{ marginLeft: '10px', marginRight: '10px' }} />
        <Button mode={Mode.primary} onClick={handleTestClick}>Set value to 100</Button>
      </div>
      <div>{`value is: ${value}`}</div>
      <div>{`previousValue is: ${previousValue}`}</div>
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
      <TextField data-testid="submit" onFocus={handleFocus} onBlur={handleBlur} />
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fireEvent.focus(canvas.getByTestId('submit'));

    await expect(
      canvas.getByText("TextField is focused")
    ).toBeInTheDocument();

    await fireEvent.blur(canvas.getByTestId('submit'));

    await expect(
      canvas.getByText("TextField is blur")
    ).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('text'), 'Tom');

    await expect(
      canvas.getByText("Value:Tom")
    ).toBeInTheDocument();

    await userEvent.type(canvas.getByTestId('text'), '&Jerry');

    await expect(
      canvas.getByText("Value:Tom&Jerry")
    ).toBeInTheDocument();
  }
}