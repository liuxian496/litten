import { useState } from "react";

import { expect, userEvent, waitFor, within } from "@storybook/test";

import { LittenCheckedChangeEvent } from "litten-hooks/dist/control/event/littenEvent.types";
import { Placement } from "litten-hooks/dist/enum";
import { Button } from "../../components/button/button";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Radio } from "../../components/radio/radio";
import { RadioGroup } from "../../components/radioGroup/radioGroup";

import { StackPanel } from "../../components/stackPanel/stackPanel";
import { RadioStory } from "../../stories/radio.stories";

const Test = () => {
  const [value, setValue] = useState<string | undefined>("banana");

  function handleRadioGroupChange(e: LittenCheckedChangeEvent) {
    setValue(e.value);
  }

  function handleCheckAppleBtuClick() {
    setValue("apple");
  }

  function handleCheckBananaBtuClick() {
    setValue("banana");
  }

  function handleCheckPeachBtuClick() {
    setValue("peach");
  }

  return (
    <>
      <FormLabel label="Fruit: " labelPlacement={Placement.top}>
        <RadioGroup
          defaultValue="banana"
          name="fruit"
          value={value}
          onChange={handleRadioGroupChange}
        >
          <StackPanel direction="column" alignItems="flex-start">
            <FormLabel label="Apple" labelPlacement={Placement.right}>
              <Radio data-testid="apple" value="apple" name="fruit" />
            </FormLabel>
            <FormLabel label="Banana" labelPlacement={Placement.right}>
              <Radio data-testid="banana" value="banana" name="fruit" />
            </FormLabel>
            <FormLabel label="Peach" labelPlacement={Placement.right}>
              <Radio data-testid="peach" value="peach" name="fruit" />
            </FormLabel>
          </StackPanel>
        </RadioGroup>
      </FormLabel>
      <StackPanel>
        <Button data-testid="appleBtu" onClick={handleCheckAppleBtuClick}>
          Check Apple
        </Button>
        <Button data-testid="bananaBtu" onClick={handleCheckBananaBtuClick}>
          Check Banana
        </Button>
        <Button data-testid="peachBtu" onClick={handleCheckPeachBtuClick}>
          Check Peach
        </Button>
      </StackPanel>
      <div>{`"Fruit" radioGroup value is ${value}`}</div>
    </>
  );
};

export const RadioGroupTest: RadioStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const appleRadio = canvas.getByTestId("apple");
    const bananaRadio = canvas.getByTestId("banana");
    const peachRadio = canvas.getByTestId("peach");

    const appleBtu = canvas.getByTestId("appleBtu");
    const peachBtu = canvas.getByTestId("peachBtu");

    await step(
      ' Set "Fruit" radioGroup defaultValue is "banana", then "Banana" radio is checked, other radios are unchecked',
      async () => {
        await expect(
          await canvas.findByText('"Fruit" radioGroup value is banana'),
        ).toBeInTheDocument();

        await expect(appleRadio).not.toBeChecked();

        await waitFor(() => expect(bananaRadio).toBeChecked());

        await expect(peachRadio).not.toBeChecked();
      },
    );

    await step(
      'Click "Check Apple" button", then "Apple" radio is checked, other radios are unchecked',
      async () => {
        await userEvent.click(appleBtu);

        await expect(
          await canvas.findByText('"Fruit" radioGroup value is apple'),
        ).toBeInTheDocument();

        await waitFor(() => expect(appleRadio).toBeChecked());

        await expect(bananaRadio).not.toBeChecked();

        await expect(peachRadio).not.toBeChecked();
      },
    );

    await step(
      'Click "Check Peach" button", then "Peach" radio is checked, other radios are unchecked',
      async () => {
        await userEvent.click(peachBtu);

        await expect(
          await canvas.findByText('"Fruit" radioGroup value is peach'),
        ).toBeInTheDocument();

        await waitFor(() => expect(appleRadio).not.toBeChecked());

        await expect(bananaRadio).not.toBeChecked();

        await expect(peachRadio).toBeChecked();
      },
    );

    await step(
      'Click "Apple" radio, then "Fruit" radioGroup value is "apple"',
      async () => {
        await userEvent.click(appleRadio);

        await expect(
          await canvas.findByText('"Fruit" radioGroup value is apple'),
        ).toBeInTheDocument();

        await waitFor(() => expect(appleRadio).toBeChecked());

        await expect(bananaRadio).not.toBeChecked();

        await expect(peachRadio).not.toBeChecked();
      },
    );
  },
};
