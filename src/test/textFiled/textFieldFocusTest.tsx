import { useState } from 'react';

import { expect, userEvent, waitFor, within } from 'storybook/test';

import { TextFiledStory } from '../../stories/textField.stories';

import { Button } from '../../components/button/button';
import { TextField } from '../../components/textField/textField';
import { Mode } from '../../global/enum';

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
      <TextField
        data-testid="submitField"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Button mode={Mode.primary} style={{ marginLeft: '15px' }}>
        Submit
      </Button>
      <p>{msg}</p>
    </>
  );
};

export const FocusTest: TextFiledStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <TestFocus />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('TextField is focused', async () => {
      await userEvent.click(canvas.getByTestId('submitField'));

      await waitFor(() =>
        expect(canvas.getByText('TextField is focused')).toBeInTheDocument()
      );
    });

    await step('TextField is blur', async () => {
      await userEvent.click(canvas.getByText('Submit'));

      await waitFor(() =>
        expect(canvas.getByText('TextField is blur')).toBeInTheDocument()
      );
    });
  },
};
