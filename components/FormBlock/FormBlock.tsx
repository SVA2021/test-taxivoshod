import {IBlock, IBlockData, IBlockStatus, } from '@/types';
import useWebSocket from '@/useWebSocket';
import {getBlockButtonName, } from '@/utils';
import {Ubuntu} from '@next/font/google';
import cn from 'classnames';
import {FC, useEffect, useState} from 'react';
import {FormInput} from '../FormInput/FormInput';
import s from './FormBlock.module.scss';

const ubuntu = Ubuntu({subsets: ['cyrillic'], weight: ['400']});

interface FormBlockProps {
  block: string
  webSocket: WebSocket | null
}

export const FormBlock: FC<FormBlockProps> = ({block, webSocket}) => {

  const {message, error, subscribe, unsubscribe, setFocus, setBlur} = useWebSocket(webSocket);

  const [formData, setFormData] = useState<IBlockData | undefined>();
  const [formStatus, setFormStatus] = useState<IBlockStatus | undefined>();
  const formFields = (!formData) ? [] : Object.keys(formData);

  useEffect(() => {
    subscribe(block);
    return () => {
      /*!!! uncomment before production */
      // unsubscribe(block);
    }
  }, [])

  useEffect(() => {
    if (message?.data) setFormData(message.data);
    if (message?.status) setFormStatus(message.status);
    if (message?.focus && formStatus) {
      setFormStatus((v) => message.focus !== undefined ? ({...v, [message?.focus]: true}) : v);
    }
    if (message?.blur && formStatus) {
      setFormStatus((v) => message.blur !== undefined ? ({...v, [message?.blur]: false}) : v);
    }
  }, [message])

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