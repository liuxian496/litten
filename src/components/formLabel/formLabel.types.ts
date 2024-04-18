import { CSSProperties } from "react";
import { Placement } from "../../global/enum";
import { LayoutControlProps } from "../control/layoutControl.types";


export interface FormLabelProps extends LayoutControlProps {
    disabled?: boolean;
    htmlFor?: string;
    label: string;
    labelPlacement?: Placement;
    labelStyle?: CSSProperties;
    loading?: boolean;
}
