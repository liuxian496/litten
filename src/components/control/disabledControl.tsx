import { useEffect, useState } from "react";
import { DisabledControlProps } from "./control.types";

export function useDisabled(props: DisabledControlProps) {
    const { disabled, loading } = props;

    const [value, setValue] = useState<boolean | undefined>(false);

    useEffect(() => {
        setValue(disabled || loading);
    }, [disabled, loading]);

    return value;
}
