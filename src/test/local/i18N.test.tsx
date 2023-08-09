
import React from 'react';

import { LocalStory } from '../../stories/i18N.stories';

import enUS from '../../global/enUS';
import zhCN from '../../global/zhCN';

export const I18N: LocalStory = {
    render: () => {
        return (
            <>
                <p>
                    <span>关闭：{zhCN.close}--{enUS.close}</span>
                </p>
            </>
        );
    }
}