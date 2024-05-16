import React, { ChangeEvent, useEffect, useState } from "react";

import { userEvent, within, expect } from "@storybook/test";

import { LocalStory } from "../../stories/i18N.stories";

import { Lexicon } from "../../global/local.types";
import { Red, I18N } from "../../global/enum";
import { getI18NConfig, setI18N, getI18N, getLocal } from "../../global/local";
import { Blue } from "../../global/enum";

const TestLocalization = () => {
    const [currentI18N, setCurrentI18N] = useState(I18N.enUs);
    const [config, setConfig] = useState<Lexicon>(getI18NConfig());

    function handleI18NSelectChange(e: ChangeEvent<HTMLSelectElement>) {
        const current = e.target.value as I18N;
        setI18N(current);
        setCurrentI18N(current);
    }

    useEffect(() => {
        setConfig(getI18NConfig());
    }, [currentI18N]);

    useEffect(() => {
        return () => {
            setI18N(I18N.enUs);
        };
    }, []);

    return (
        <>
            <select
                data-testid="I18nSelect"
                onChange={handleI18NSelectChange}
                defaultValue={I18N.enUs}
            >
                <option value={I18N.zhCn}>简体中文</option>
                <option value={I18N.enUs}>English</option>
                <option value="jap">日本語</option>
            </select>
            <div>
                <span style={{ color: Blue.main }}>I18N: </span>
                <span>{getI18N()}</span>
            </div>
            <span style={{ color: Red.main }}>Msg: </span>
            <div>
                <span>close: </span>
                <span>{config.close}</span>
            </div>
        </>
    );
};

export const Localization: LocalStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <TestLocalization />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const I18nSelect = canvas.getByTestId("I18nSelect");

        await step('Local "饮食"->"午餐" is {}', async () => {
            await expect(getLocal("饮食", "午餐")).toStrictEqual({});
        });

        await step(
            'Default I18N is english, "close" means "close"',
            async () => {
                await expect(canvas.getByText("close")).toBeInTheDocument();
            }
        );

        await step('Change I18N to Jap, "close" means ""', async () => {
            await userEvent.selectOptions(I18nSelect, "jap");

            await expect(canvas.getByText("close:")).toBeInTheDocument();
        });

        await step(
            'Change I18N to 简体中文, "close" means "关闭"',
            async () => {
                await userEvent.selectOptions(I18nSelect, I18N.zhCn);

                await expect(canvas.getByText("关闭")).toBeInTheDocument();
            }
        );
    },
};
