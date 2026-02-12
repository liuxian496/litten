import React, { useRef } from "react";

import { expect, userEvent, waitFor, within } from "@storybook/test";

import { LittenListChangeEvent } from "litten-hooks/dist/control/event/littenEvent.types";
import { SelectedValue } from "litten-hooks/dist/control/userControl/userControl.types";
import { Button } from "../../components/button/button";
import { Listbox } from "../../components/listbox/listbox";
import { ListBoxRef } from "../../components/listbox/listbox.types";
import { ListItem } from "../../components/listItem/listItem";
import { ListboxStory } from "../../stories/listbox.stories";

const Test = () => {
  const ref = useRef<ListBoxRef>(null);
  const [value, setValue] = React.useState<SelectedValue>();

  function handleListBoxChange(e: LittenListChangeEvent) {
    console.log("listbox value changed: ", e.value);
  }

  function handleGetValueButtonClick() {
    setValue(ref.current?.value);
  }

  return (
    <div>
      <Button onClick={handleGetValueButtonClick}>Get Value</Button>
      <div>{`Current value is: ${value}`}</div>
      <Listbox ref={ref} defaultValue={"a"} onChange={handleListBoxChange}>
        <ListItem value="a" label="a" />
        <ListItem value="b" label="b" />
        <ListItem value="c" label="c" />
        <ListItem value="d" label="d" />
        <ListItem value="e" label="e" />
        <ListItem value="f" label="f" />
        <ListItem value="g" label="g" />
        <ListItem value="h" label="h" />
        <ListItem value="i" label="i" />
      </Listbox>
    </div>
  );
};

export const UnControlledTest: ListboxStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Default value is a. Then item a is selected.", async () => {
      const aItem = await canvas.findByText("a");

      await waitFor(() =>
        expect(aItem).toHaveAttribute("aria-selected", "true"),
      );
    });

    await step("Click item c. Then item c is selected.", async () => {
      const cItem = await canvas.findByText("c");

      await userEvent.click(cItem);

      await waitFor(() =>
        expect(cItem).toHaveAttribute("aria-selected", "true"),
      );
    });

    await step(
      'Click "Get Value" button. Then "Current value is: c" is in the document.',
      async () => {
        const getValueButton = await canvas.findByRole("button", {
          name: "Get Value",
        });

        await userEvent.click(getValueButton);

        const valueText = await canvas.findByText("Current value is: c");

        await expect(valueText).toBeInTheDocument();
      },
    );
  },
};
