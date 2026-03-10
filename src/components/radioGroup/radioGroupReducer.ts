import {
  RadioGroupAction,
  RadioGroupActionProps,
  RadioGroupState,
} from "./radio.types";

export function RadioGroupReducer(
  state: RadioGroupState,
  action: RadioGroupActionProps,
): RadioGroupState {
  const { type } = action;
  switch (type) {
    case RadioGroupAction.setValue: {
      return {
        ...state,
        value: action.value,
      };
    }
    default: {
      console.warn(`Unhandled action type: ${type}`);
      return state;
    }
  }
}
