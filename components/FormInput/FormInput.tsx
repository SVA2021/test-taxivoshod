import React, {FC, useRef} from 'react';
import s from './FormInput.module.scss';
import {Ubuntu} from '@next/font/google';
import cn from 'classnames';
import {getFormInputText} from '@/utils';

const ubuntu = Ubuntu({subsets: ['cyrillic'], weight: ['400']});

interface FormInputProps {
  fieldName: string
  fieldValue: string
  isReadOnly: boolean
  focusHandler: () => void
  blurHandler: () => void
}

export const FormInput: FC<FormInputProps> = ({fieldName, fieldValue, isReadOnly, focusHandler, blurHandler}) => {

  const ref = useRef<HTMLInputElement | undefined>();

  return (
    <div className={s.form}>
      <label className={s.form__label} >
        {getFormInputText(fieldName).label}
        {isReadOnly && <span className={s.form__label__block}>поле заблокировано</span>}
      </label>
      <input type="text" ref={() => ref}
        className={cn(ubuntu.className, s.form__input)}
        placeholder={getFormInputText(fieldName).placeholder}
        readOnly={isReadOnly}
        defaultValue={fieldValue}
        onFocus={() => focusHandler()}
        onBlur={() => blurHandler()}
      />
    </div>
  );
};