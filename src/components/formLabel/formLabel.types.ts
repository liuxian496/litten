import { CSSProperties } from "react";
import { Placement } from "litten-hooks/dist/enum";
import { LayoutControlProps } from "litten-hooks/dist/control/layoutControl/layoutControl.types";

export interface FormLabelProps extends LayoutControlProps {
    disabled?: boolean;
    htmlFor?: string;
    label: string;
    labelPlacement?: Placement;
    labelStyle?: CSSProperties;
    loading?: boolean;
}
