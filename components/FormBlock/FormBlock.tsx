import {IBlockData, IBlockStatus, ISocketData} from '@/types';
import {getBlockButtonName} from '@/utils';
import {Ubuntu} from '@next/font/google';
import cn from 'classnames';
import {FC, useEffect, useMemo, useRef} from 'react';
import {FormInput} from '../FormInput/FormInput';
import s from './FormBlock.module.scss';

const ubuntu = Ubuntu({subsets: ['cyrillic'], weight: ['400']});

interface FormBlockProps {
  block: string
  wsState: ISocketData | undefined
  subscribe: (block: string) => void
  unsubscribe: (block: string) => void
  setFocus: (block: string, field: string) => void
  setBlur: (block: string, field: string) => void
}

export const FormBlock: FC<FormBlockProps> = ({block, wsState, setBlur, setFocus, subscribe, unsubscribe}) => {

  const firstEffectRan = useRef(false);

  const formData = useMemo<IBlockData | undefined>(() => wsState?.data, [wsState]);
  const formStatus = useMemo<IBlockStatus | undefined>(() => wsState?.status, [wsState]);
  const formFields = (!formData) ? [] : Object.keys(formData);

  useEffect(() => {
    subscribe(block);
    return () => {
      if (firstEffectRan.current) unsubscribe(block);
      firstEffectRan.current = true;
    }
  }, [])

  return (
    <div className={cn(ubuntu.className, s.block)}>
      <h2 className={s.block__title}>{getBlockButtonName(block)}</h2>
      <div className={s.block__divider}></div>
      <div className={s.block__form}>
        {
          formFields.map((field) =>
            <FormInput
              key={field}
              fieldName={field}
              fieldValue={formData ? formData[field] : ''}
              isReadOnly={formStatus ? formStatus[field] : false}
              focusHandler={() => setFocus(block, field)}
              blurHandler={() => setBlur(block, field)}
            />
          )
        }
      </div>
    </div>
  );
};