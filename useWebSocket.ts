import {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react'
import {ISocketRes} from './types';

function useWebSocket(defaultSocket: WebSocket | null) {

  const [message, setMessage] = useState<ISocketRes | null>(null);

  useEffect(() => {
    if (defaultSocket && defaultSocket.onmessage) {
      defaultSocket.onmessage = ((e) => setMessage(JSON.parse(e.data)));
    }
  }, [defaultSocket])

  const subscribe = useCallback((name: string) => {
    if (defaultSocket) {
      defaultSocket.send(JSON.stringify({"command": "subscribe", "block": name}));
    } else {
      console.log('websocket is null')
    }
  }, [defaultSocket]);

  const unsubscribe = useCallback((name: string) => {
    if (defaultSocket) {
      defaultSocket.send(JSON.stringify({"command": "subscribe", "block": name}));
    } else {
      console.log('websocket is null')
    }
  }, [defaultSocket]);

  // {"command": "focus", "block": "block1", "field": "lname"}
  // const message = defaultSocket !== null ? defaultSocket.onmessage((e: MessageEvent) => JSON.parse(e.data)) : null;
  //     // socket.send(JSON.stringify({"command": "subscribe", "block": block.block}));
  // const [value, setValue] = useState(!!defaultValue)


  // const toggle = useCallback(() => setValue(x => !x), [])

  // return [value, toggle, setValue]
  return {message, subscribe, unsubscribe, }
}

export default useWebSocket;