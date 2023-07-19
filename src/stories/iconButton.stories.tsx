import React, { useState } from 'react';

import { IconButton } from '../components/iconButton/iconButton';

import { Color, Size } from '../global/enum';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { fireEvent } from '../global/testLib';
import { expect } from '@storybook/jest';

export default {
  title: 'Example/IconButton',
  component: IconButton,
  argTypes: {
    rippleColor: {
      control: false,
    },
    prefixCls: {
      control: false,
    },
    tabindex: {
      table: {
        disable: true,
      },
    },
    //在示例文档中移除children属性的显示
    children: {
      table: {
        disable: true,
      },
    },
    onClick: {
      action: '点击'
    },
  },

} as Meta<typeof IconButton>;

type Story = StoryObj<typeof IconButton>;

const DeleteIcon = () => {
  return (
    <svg className='litten-svg' viewBox="0 0 1024 1024" focusable="false">
      <path
        d="M292.571429 1024a146.285714 146.285714 0 0 1-146.285715-146.285714V219.428571H54.857143a54.857143 54.857143 0 0 1 0-109.714285H438.857143V73.142857a73.142857 73.142857 0 1 1 146.285714 0v36.571429h384a54.857143 54.857143 0 1 1 0 109.714285H877.714286v658.285715a146.285714 146.285714 0 0 1-146.285715 146.285714H292.571429z m-36.571429-150.381714c0 19.968 12.946286 36.571429 29.988571 40.009143L292.571429 914.285714h160.914285V219.428571H256v654.189715zM768 219.428571H570.514286v694.857143H731.428571c17.92 0 32.914286-14.409143 35.986286-33.353143l0.585143-7.314285V219.428571z"
      />
    </svg>
  )
}

export const DefaultTest: Story = {
  render: () => {
    return (
      <>
        <div>
          <IconButton data-testid="deleteIcon" size={Size.small} aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" size={Size.large} >
            <DeleteIcon />
          </IconButton>
        </div>
        <div>
          <IconButton aria-label="delete" size={Size.small} color={Color.danger}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" color={Color.danger}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" size={Size.large} color={Color.danger}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div>
          <IconButton aria-label="delete" size={Size.small} color={Color.success}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" color={Color.success}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" size={Size.large} color={Color.success}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div>
          <IconButton aria-label="delete" size={Size.small} color={Color.warning}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" color={Color.warning}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" size={Size.large} color={Color.warning}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div>
          <IconButton aria-label="delete" size={Size.small} color={Color.success} disabled>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" color={Color.warning} disabled>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" size={Size.large} color={Color.danger} disabled>
            <DeleteIcon />
          </IconButton>
        </div>
        <div>
          <IconButton aria-label="delete" size={Size.small} color={Color.success} loading>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" color={Color.warning} loading>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" size={Size.large} color={Color.danger} loading>
            <DeleteIcon />
          </IconButton>
        </div>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fireEvent.focus(canvas.getByTestId('deleteIcon'));
    await expect(
      canvas.queryByTestId("litten-ripple__focus")
    ).toBeInTheDocument();

    await fireEvent.blur(canvas.getByTestId('deleteIcon'));
    await expect(
      canvas.queryByTestId("litten-ripple__focus")
    ).not.toBeInTheDocument();
  }
};

const TestFocus = () => {
  const [msg, setMsg] = useState('');

  function handleFocus() {
    setMsg('Delete Button is focused');
  }

  function handleBlur() {
    setMsg('Delete Button is blur');
  }

  return (
    <>
      <IconButton data-testid="deleteIcon" onFocus={handleFocus} onBlur={handleBlur}>
        <DeleteIcon />
      </IconButton>
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

    await fireEvent.focus(canvas.getByTestId('deleteIcon'));

    await expect(
      canvas.getByText("Delete Button is focused")
    ).toBeInTheDocument();

    await fireEvent.blur(canvas.getByTestId('deleteIcon'));

    await expect(
      canvas.getByText("Delete Button is blur")
    ).toBeInTheDocument();
  }
}