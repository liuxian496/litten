
import React, { useState } from 'react';

import { Button } from '../components/button/button';
import { Mode, Color, Red, Green, Orange } from '../global/enum';
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
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
    onFocus: {
      action: '焦点'
    },
    onBlur: {
      action: '失去焦点'
    }
  },

};

export default meta;
type Story = StoryObj<typeof Button>;

const DeleteIcon = () => {
  return (
    <svg className='litten-svg' width="16px" height="16px" viewBox="0 0 1024 1024">
      <path
        d="M292.571429 1024a146.285714 146.285714 0 0 1-146.285715-146.285714V219.428571H54.857143a54.857143 54.857143 0 0 1 0-109.714285H438.857143V73.142857a73.142857 73.142857 0 1 1 146.285714 0v36.571429h384a54.857143 54.857143 0 1 1 0 109.714285H877.714286v658.285715a146.285714 146.285714 0 0 1-146.285715 146.285714H292.571429z m-36.571429-150.381714c0 19.968 12.946286 36.571429 29.988571 40.009143L292.571429 914.285714h160.914285V219.428571H256v654.189715zM768 219.428571H570.514286v694.857143H731.428571c17.92 0 32.914286-14.409143 35.986286-33.353143l0.585143-7.314285V219.428571z"
      />
    </svg>
  )
}

const BroadcastIcon = () => {
  return (
    <svg className='litten-svg' width="16px" height="16px" viewBox="0 0 1024 1024" version="1.1"
    >
      < path
        d="M361.472 97.8944l523.5712 327.2704a102.4 102.4 0 0 1 0 173.6704L361.472 926.1056A102.4 102.4 0 0 1 204.8 839.2704V184.7296a102.4 102.4 0 0 1 156.672-86.8352z"
      />
    </svg >
  )
}

export const DefaultTest: Story = {
  args: { mode: Mode.primary, },
  render: (args) => {
    return (
      <>
        <Button
          {...args}
        >
          {'Submit'}
        </Button >
        <button style={{ marginLeft: "16px" }}>end</button>
      </>
    );
  }
};

export const ModeTest: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => {
    return (
      <>
        <Button>Text</Button>
        <Button mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
        <Button mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
        <button style={{ marginLeft: "16px" }}>End</button>
      </>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Primary button is focused', async () => {
      await userEvent.click(canvas.getByText('Primary'));

      await expect(
        canvas.getByTestId("litten-ripple__focus")
      ).toBeInTheDocument();
    });

    await step('Outlined button is focused', async () => {
      await userEvent.click(canvas.getByText('Outlined'));

      await expect(
        canvas.getByTestId("litten-ripple__focus")
      ).toBeInTheDocument();
    });

    await step('End button is focused', async () => {
      await userEvent.click(canvas.getByText('End'));

      await expect(
        canvas.queryByTestId("litten-ripple__focus")
      ).not.toBeInTheDocument();
    });

  }
}

const TestDisabled = () => {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleClick() {
    if (disabled === true) {
      setDisabled(false)
    } else {
      setDisabled(true);
    }
  }

  function handleLoadingClick() {
    if (loading === true) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }


  return (
    <>
      <Button disabled={disabled} loading={loading}>Text</Button>
      <Button mode={Mode.primary} disabled={disabled} loading={loading} style={{ marginLeft: "16px" }} >Primary</Button>
      <Button mode={Mode.outlined} disabled={disabled} loading={loading} style={{ marginLeft: "16px" }}>Outlined</Button>
      <button data-testid="change-disabled" onClick={handleClick} style={{ marginLeft: "16px" }}>disable: {disabled.toString()}</button>
      <button data-testid="change-loading" onClick={handleLoadingClick} style={{ marginLeft: "16px" }}>loading: {loading.toString()}</button>
    </>
  )
}

export const DisabledTest: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <TestDisabled />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Disable button', async () => {
      await expect(
        canvas.getByText('Text')
      ).toBeDisabled;

      await expect(
        canvas.getByText('Primary')
      ).toBeDisabled;

      await expect(
        canvas.getByText('Outlined')
      ).toBeDisabled;
    });

    await step('Enable button', async () => {
      await userEvent.click(canvas.getByTestId('change-disabled'));

      await expect(
        canvas.getByText('Text')
      ).toBeEnabled;
  
      await expect(
        canvas.getByText('Primary')
      ).toBeEnabled;
  
      await expect(
        canvas.getByText('Outlined')
      ).toBeEnabled;
    });

    await step('Disable button with loading', async () => {
      await userEvent.click(canvas.getByTestId('change-loading'));

      await expect(
        canvas.getByText('Text')
      ).toBeDisabled;
  
      await expect(
        canvas.getByText('Primary')
      ).toBeDisabled;
  
      await expect(
        canvas.getByText('Outlined')
      ).toBeDisabled;
    });

    await step('Enable button with loading', async () => {
      await userEvent.click(canvas.getByTestId('change-loading'));

      await expect(
        canvas.getByText('Text')
      ).toBeEnabled;
  
      await expect(
        canvas.getByText('Primary')
      ).toBeEnabled;
  
      await expect(
        canvas.getByText('Outlined')
      ).toBeEnabled;
    });
  }
}

const TestClick = () => {
  const [count, setCount] = useState(0);

  function handleClick(e: any) {
    setCount(count + 1);
  }

  return (
    <>
      <Button data-index={0} mode={Mode.primary} onClick={handleClick}>Add</Button>
      <div><span>Count: </span><span>{count}</span></div>
    </>
  )
}

export const ClickTest: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <TestClick />,
  play: async ({ canvasElement, step  }) => {
    const canvas = within(canvasElement);

    await step('Click Add button ,Count is 1',async ()=>{
      await userEvent.click(canvas.getByRole('button'));

      await expect(
        canvas.getByText("1")
      ).toBeInTheDocument();
    });
  }
}

const TestFocus = () => {
  const [msg, setMsg] = useState('');

  function handleFocus() {
    setMsg('Start Button is focused');
  }

  function handleBlur() {
    setMsg('Start Button is blur');
  }

  return (
    <>
      <Button mode={Mode.primary} onFocus={handleFocus} onBlur={handleBlur}>Start</Button>
      <Button mode={Mode.primary} style={{ marginLeft: "15px" }}>End</Button>
      <p>
        {msg}
      </p>
    </>
  )
}

export const ColorTest: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => {
    return (
      <>
        <div style={{ color: Red.dark }}>Danger</div>
        <Button color={Color.danger}>Text</Button>
        <Button color={Color.danger} disabled style={{ marginLeft: "16px" }}>Text</Button>
        <Button color={Color.danger} mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
        <Button color={Color.danger} disabled mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
        <Button color={Color.danger} mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
        <Button color={Color.danger} disabled mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
        <div style={{ color: Green.dark }}>Success</div>
        <Button color={Color.success}>Text</Button>
        <Button color={Color.success} disabled style={{ marginLeft: "16px" }}>Text</Button>
        <Button color={Color.success} mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
        <Button color={Color.success} disabled mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
        <Button color={Color.success} mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
        <Button color={Color.success} disabled mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
        <div style={{ color: Orange.dark }}>Warning</div>
        <Button color={Color.warning}>Text</Button>
        <Button color={Color.warning} disabled style={{ marginLeft: "16px" }}>Text</Button>
        <Button color={Color.warning} mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
        <Button color={Color.warning} disabled mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
        <Button color={Color.warning} mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
        <Button color={Color.warning} disabled mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
      </>
    )
  }
}

export const IconTest: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => {
    return (
      <>
        <Button mode={Mode.outlined} startIcon={<DeleteIcon />}>Delete</Button>
        <Button mode={Mode.outlined} disabled startIcon={<DeleteIcon />} style={{ marginLeft: "16px" }}>Delete</Button>
        <Button mode={Mode.primary} endIcon={<BroadcastIcon />} style={{ marginLeft: "16px" }}>Add</Button>
        <Button mode={Mode.primary} disabled endIcon={<BroadcastIcon />} style={{ marginLeft: "16px" }}>Add</Button>
      </>
    )
  }
}
