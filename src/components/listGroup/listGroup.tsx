import { ControlType } from 'litten-hooks';
import type { ReactNode } from 'react';

export const ListGroup = (props: { children: ReactNode }) => {
  const { children } = props;
  return children;
};

ListGroup.displayName = ControlType.ListGroup;
