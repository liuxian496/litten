
import React, { useEffect, useState } from 'react';

import { within } from '@storybook/testing-library';
import { fireEvent } from '../global/testLib';
import { expect } from '@storybook/jest';

import { Button } from '../components/button/button';
import { Mode, Red, I18N, LocalType } from '../global/enum';
import { getI18NConfig, setI18N, getI18N, getLocal } from '../global/local';
import { Meta, StoryObj } from '@storybook/react';
import { Blue } from '../global/enum';
import enUS from '../global/enUS';
import zhCN from '../global/zhCN';

export default {
  title: 'Example/Local',
} as Meta<typeof I18N>;

type Story = StoryObj<typeof I18N>;


const ChangeI18N = () => {
  const [currentI18N, setCurrentI18N] = useState(getI18N());
  const [config, setConfig] = useState<any>(getI18NConfig());

  function handClick() {
    if (getI18N() === I18N.zhCn) {
      setI18N(I18N.enUs);
      setCurrentI18N(I18N.enUs);
    } else {
      setI18N(I18N.zhCn);
      setCurrentI18N(I18N.zhCn);
    }
  }

  useEffect(() => {
    setConfig(getI18NConfig());
  }, [currentI18N])

  return (
    <>
      <Button data-testid="change-btu" mode={Mode.outlined} onClick={handClick}>Change I18N</Button>
      <div>
        <span style={{ color: Blue.main }}>I18N: </span><span>{currentI18N}</span>
      </div>
      <span style={{ color: Red.main }}>Msg: </span>
      <div>
        <span>close: </span><span>{config.close}</span>
      </div>
    </>
  )
}

export const LocalizationTest: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <ChangeI18N />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      getLocal('饮食', '午餐')
    ).toStrictEqual({});

    await expect(
      getLocal(LocalType.i18n, '赛博坦')
    ).toStrictEqual({});

    await setI18N('赛博坦');

    await expect(
      getI18NConfig()
    ).toStrictEqual({});

    await setI18N(I18N.enUs);

    await expect(
      canvas.getByText('close')
    ).toBeInTheDocument;

    await fireEvent.click(canvas.getByTestId('change-btu'));

    await expect(
      canvas.getByText('关闭')
    ).toBeInTheDocument;
  }
};

export const I18NTest: Story = {
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

// const TestLocal = () => {
//   const config: any = getLocal('赛博坦', '国派');

//   return (
//     <>
//       <span>赛博坦: </span><span>{config.toString()}</span>
//     </>
//   )
// }

// export const LocalTest = {
//   parameters: {
//     controls: { hideNoControlsWarning: true },
//   },
//   render: () => <TestLocal />
// }