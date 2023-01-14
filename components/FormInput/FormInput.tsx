import {IBlock} from '@/types';
import {getBlockButtonName, getFormInputText} from '@/utils';
import {Ubuntu} from '@next/font/google';
import cn from 'classnames';
import {FC} from 'react';
import s from './FormInput.module.scss';

const ubuntu = Ubuntu({subsets: ['cyrillic'], weight: ['400']});

interface FormInputProps {
  block: IBlock
}

export const FormInput: FC<FormInputProps> = ({block}) => {


  return (
    <div className={s.block}>
      <h2 className={s.block__title}>{getBlockButtonName(block.block)}</h2>
      <div className={s.block__divider}></div>
      <div className={s.block__form}>

        <div className={s.form}>
          <label className={s.form__label} >{getFormInputText('').label}</label>
          <input type="text"
            className={cn(ubuntu.className, s.form__input)}
            placeholder={getFormInputText('').placeholder}
          />
        </div>

      </div>
    </div>
  );
};