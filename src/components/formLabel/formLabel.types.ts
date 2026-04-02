import type { LayoutControlProps } from 'litten-hooks/dist/control/layoutControl/layoutControl.types';
import { Placement } from 'litten-hooks/dist/enum';
import { type CSSProperties } from 'react';

export interface FormLabelProps extends LayoutControlProps {
  disabled?: boolean;
  htmlFor?: string;
  label: string;
  labelPlacement?: Placement;
  labelStyle?: CSSProperties;
  loading?: boolean;
}
