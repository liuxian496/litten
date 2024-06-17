import { ControlType } from "litten-hooks";
import { ReactNode } from "react";

export const ListGroup = (props: { children: ReactNode }) => {
    const { children } = props;
    return children;
};

ListGroup.displayName = ControlType.ListGroup;
