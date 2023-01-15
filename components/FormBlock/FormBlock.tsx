import {IBlock, ISocketRes} from '@/types';
import {getBlockButtonName, getFormInputText} from '@/utils';
import {Ubuntu} from '@next/font/google';
import cn from 'classnames';
import {FC, useEffect, useState} from 'react';
import s from './FormBlock.module.scss';

const ubuntu = Ubuntu({subsets: ['cyrillic'], weight: ['400']});

interface FormBlockProps {
  block: IBlock
  webSocket: WebSocket | null
}

export const FormBlock: FC<FormBlockProps> = ({block, webSocket}) => {

  // const socket = new WebSocket('wss://taxivoshod.ru:8999');

  const [state, setState] = useState<ISocketRes | null>(null);
  const formsData = !state ? [] : Object.keys(state.data);

  useEffect(() => {
    console.log('useffect started');
    // console.log(state);

    // if (socket) {

    //   socket.onopen = () => {
    //     console.log('socket open');
    //     // socket.send(JSON.stringify({"command": "subscribe", "block": block.block}));
    //   }

    //   socket.onmessage = (e) => setState(JSON.parse(e.data));
    // }

    // socket.onclose = () => console.log('socket close')

    // return () => {
    //   if (socket.OPEN) console.log('socket will close')
    // }

  }, [])

  useEffect(() => console.log(state), [state])

  return (
    <div className={cn(ubuntu.className, s.block)}>
      <h2 className={s.block__title}>{getBlockButtonName(block.block)}</h2>
      <div className={s.block__divider}></div>
      <div className={s.block__form}>

        {
          formsData.map((item) =>
            <div className={s.form} key={item}>
              <label className={s.form__label} >{getFormInputText(item).label}</label>
              <input type="text"
                className={cn(ubuntu.className, s.form__input)}
                placeholder={getFormInputText(item).placeholder}
                disabled={state?.status[item]}
                value={state?.data[item]}
              />
            </div>
          )
        }

      </div>
    </div>
  );
};