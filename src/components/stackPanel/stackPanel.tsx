import './stackPanel.less';
import type { StackPanelProps } from './stackPanel.types';

import classnames from 'classnames';

import { ControlType } from 'litten-hooks/dist/enum';
import { getPrefixNs } from '../../global/util';

function getVisualStates(props: StackPanelProps) {
  const {
    prefixCls: customizePrefixCls,
    className,
    direction,
    justifyContent,
    alignItems,
  } = props;

  const prefixCls = getPrefixNs('stackPanel', customizePrefixCls);

  const visualStates = classnames(
    className,
    prefixCls,
    `${prefixCls}--${direction}`,
    `${prefixCls}--jc-${justifyContent}`,
    `${prefixCls}--ai-${alignItems}`
  );

  return visualStates;
}

export const StackPanel = ({
  direction = 'row',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  ...props
}: StackPanelProps) => {
  const { children, ...others } = props;
  return (
    <div
      {...others}
      className={getVisualStates({
        direction,
        justifyContent,
        alignItems,
        ...props,
      })}
    >
      {children}
    </div>
  );
};

StackPanel.displayName = ControlType.StackPanel;
