import {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react'
import {ISocketRes} from './types';

function useWebSocket(defaultSocket: WebSocket | null) {

  const [message, setMessage] = useState<ISocketRes | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    try {
      if (defaultSocket) {
        defaultSocket.onmessage = ((e) => {
          console.log(JSON.parse(e.data))
          setMessage(JSON.parse(e.data))
        });
      }
    } catch (e) {
      console.log(e);
      setError(e);
    }
  }, [defaultSocket])

  const subscribe = useCallback((block: string) => {
    if (defaultSocket) {
      defaultSocket.send(JSON.stringify({"command": "subscribe", "block": block}));
      console.log(`[subscribe] sent to block: ${block}`)
    } else {
      console.log('websocket is null')
    }
  }, [defaultSocket]);

  const unsubscribe = useCallback((block: string) => {
    if (defaultSocket) {
      defaultSocket.send(JSON.stringify({"command": "subscribe", "block": block}));
      console.log(`[unsubscribe] sent to block: ${block}`)
    } else {
      console.log('websocket is null')
    }
  }, [defaultSocket]);

  const setFocus = useCallback((block: string, field: string) => {
    if (defaultSocket) {
      console.log(`[focus] sent to block: ${block}, field: ${field}`)
      defaultSocket.send(JSON.stringify({"command": "focus", "block": block, "field": field}));
    } else {
      console.log('websocket is null')
    }
  }, [defaultSocket]);

  const setBlur = useCallback((block: string, field: string) => {
    if (defaultSocket) {
      console.log(`[blur] sent to block: ${block}, field: ${field}`)
      defaultSocket.send(JSON.stringify({"command": "blur", "block": block, "field": field}));
    } else {
      console.log('websocket is null')
    }
  }, [defaultSocket]);

  return {message, error, subscribe, unsubscribe, setFocus, setBlur}
}

export default useWebSocket;