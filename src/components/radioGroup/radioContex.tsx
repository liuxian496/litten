import { createContext, Dispatch } from 'react';
import {
  RadioGroupActionProps,
  RadioGroupProviderProps,
  RadioGroupState,
} from './radio.types';

export const RadioGroupContext = createContext<RadioGroupState | null>(null);
export const RadioGroupDispatchContext =
  createContext<Dispatch<RadioGroupActionProps> | null>(null);

export function RadioGroupProvider({
  children,
  state,
  dispatch,
}: RadioGroupProviderProps) {
  return (
    <RadioGroupContext.Provider value={state}>
      <RadioGroupDispatchContext.Provider value={dispatch}>
        {children}
      </RadioGroupDispatchContext.Provider>
    </RadioGroupContext.Provider>
  );
}
