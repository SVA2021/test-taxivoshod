import {useCallback, useEffect, useState} from 'react';
import {ISocketState} from './types';

function useWebSocket(defaultSocket: WebSocket | null) {

  const [wsState, setWsState] = useState<ISocketState>({});
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    try {
      if (defaultSocket) {
        defaultSocket.onmessage = ((e) => {
          const messageData = JSON.parse(e.data);
          console.log(messageData);
          if (messageData.data && messageData.status) {
            setWsState((state) => ({...state, [messageData.block]: {data: messageData.data, status: messageData.status}}))
          }
          if (messageData.focus) {
            setWsState((state) => ({
              ...state,
              [messageData.block]: {
                data: state[messageData.block].data,
                status: {...state[messageData.block].status, [messageData.focus]: true}
              }
            }))
          }
          if (messageData.blur) {
            setWsState((state) => ({
              ...state,
              [messageData.block]: {
                data: state[messageData.block].data,
                status: {...state[messageData.block].status, [messageData.blur]: false}
              }
            }))
          }
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

  return {wsState, error, subscribe, unsubscribe, setFocus, setBlur}
}

export default useWebSocket;