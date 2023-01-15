import {IBlock} from '@/types';
import React, {FC} from 'react';
import s from './BlockButton.module.scss';
import {Ubuntu} from '@next/font/google';
import cn from 'classnames';
import {getBlockButtonName} from '@/utils';

interface BlockButtonProps {
  block: IBlock
  clickHandler: () => void
}

const ubuntu = Ubuntu({subsets: ['cyrillic'], weight: ['500']});

export const BlockButton: FC<BlockButtonProps> = ({block, clickHandler}) => {
  return (
    <button
      className={cn(s.button, ubuntu.className, block.isOpen ? s.button__active : '')}
      onClick={() => clickHandler()}
    >
      {getBlockButtonName(block.name)}
    </button>
  );
};